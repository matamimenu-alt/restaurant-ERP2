import { Router } from 'express';
import { getBranches, getBranch, createBranch, updateBranch, deleteBranch } from '../controllers/branchController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getBranches);
router.get('/:id', getBranch);
router.post('/', createBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);
export default router;
