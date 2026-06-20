import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

async function calculateRecipeCost(recipeId: string) {
  const lines = await prisma.recipeLine.findMany({
    where: { recipeId },
    include: { item: { select: { lastPurchasePrice: true } } },
  });
  return lines.reduce((sum, l) => sum + Number(l.quantity) * Number(l.item.lastPurchasePrice), 0);
}

export const getRecipes = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const companyId = req.user!.companyId;
    const restaurantId = req.query.restaurantId as string | undefined;

    // Return shared recipes (isShared=true OR restaurantId=null) PLUS restaurant-specific ones
    const where = restaurantId
      ? {
          companyId,
          OR: [
            { restaurantId },
            { isShared: true },
            { restaurantId: null },
          ],
        }
      : { companyId };

    const [data, total] = await Promise.all([
      prisma.recipe.findMany({
        where, skip, take: limit, orderBy: [{ isShared: 'desc' }, { nameAr: 'asc' }],
        include: {
          lines: { include: { item: { select: { nameAr: true, nameEn: true, unit: true, lastPurchasePrice: true } } } },
          restaurant: { select: { nameAr: true, nameEn: true } },
        },
      }),
      prisma.recipe.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch recipes', 500); }
};

export const getRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: { lines: { include: { item: true } }, restaurant: true },
    });
    if (!recipe) return sendError(res, 'Recipe not found', 404);
    sendSuccess(res, recipe);
  } catch { sendError(res, 'Failed to fetch recipe', 500); }
};

export const createRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { lines, ...recipeData } = req.body;
    const recipe = await prisma.recipe.create({
      data: {
        ...recipeData, companyId: req.user!.companyId,
        lines: { create: lines || [] },
      },
      include: { lines: { include: { item: true } } },
    });

    // Calculate and update cost
    const foodCost = await calculateRecipeCost(recipe.id);
    const servings = Number(recipe.servings) || 1;
    const costPerPortion = foodCost / servings;
    const localPrice = Number(recipe.localPrice);
    const grossMargin = localPrice > 0 ? ((localPrice - costPerPortion) / localPrice) * 100 : 0;

    const updated = await prisma.recipe.update({
      where: { id: recipe.id },
      data: { foodCost, costPerPortion, grossMargin },
    });
    sendSuccess(res, { ...recipe, ...updated }, 'Recipe created', 201);
  } catch { sendError(res, 'Failed to create recipe', 500); }
};

export const updateRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.recipe.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Recipe not found', 404);

    const { lines, ...recipeData } = req.body;
    await prisma.recipeLine.deleteMany({ where: { recipeId: req.params.id } });

    const recipe = await prisma.recipe.update({
      where: { id: req.params.id },
      data: {
        ...recipeData,
        lines: lines ? { create: lines } : undefined,
      },
      include: { lines: { include: { item: true } } },
    });

    const foodCost = await calculateRecipeCost(recipe.id);
    const servings = Number(recipe.servings) || 1;
    const costPerPortion = foodCost / servings;
    const localPrice = Number(recipe.localPrice);
    const grossMargin = localPrice > 0 ? ((localPrice - costPerPortion) / localPrice) * 100 : 0;
    await prisma.recipe.update({ where: { id: recipe.id }, data: { foodCost, costPerPortion, grossMargin } });

    sendSuccess(res, { ...recipe, foodCost, costPerPortion, grossMargin });
  } catch { sendError(res, 'Failed to update recipe', 500); }
};

export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.recipe.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Recipe deactivated');
  } catch { sendError(res, 'Failed to delete recipe', 500); }
};

export const calculatePricing = async (req: AuthRequest, res: Response) => {
  try {
    const { foodCost, targetMargin, deliveryCommission } = req.body;
    const fc = Number(foodCost);
    const margin = Number(targetMargin) / 100;
    const commission = Number(deliveryCommission || 25) / 100;
    const vatRate = 0.15;

    const localPriceBeforeVat = fc / (1 - margin);
    const localPriceWithVat = localPriceBeforeVat * (1 + vatRate);
    const appPriceBeforeVat = fc / ((1 - margin) * (1 - commission));
    const appPriceWithVat = appPriceBeforeVat * (1 + vatRate);

    sendSuccess(res, {
      foodCost: fc,
      targetMargin: Number(targetMargin),
      localPriceBeforeVat: Math.round(localPriceBeforeVat * 100) / 100,
      localPriceWithVat: Math.round(localPriceWithVat * 100) / 100,
      deliveryCommission: Number(deliveryCommission || 25),
      appPriceBeforeVat: Math.round(appPriceBeforeVat * 100) / 100,
      appPriceWithVat: Math.round(appPriceWithVat * 100) / 100,
      foodCostPercent: Math.round((fc / localPriceBeforeVat) * 100 * 100) / 100,
    });
  } catch { sendError(res, 'Failed to calculate pricing', 500); }
};
