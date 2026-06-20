import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Running data migration...')
  const company = await prisma.company.findFirst()
  if (!company) { console.log('No company found - skipping'); return }
  const companyId = company.id

  // Restaurants
  await prisma.restaurant.upsert({ where: { id: "cmqm3x6ww0002u8l266r7mgae" }, update: {}, create: { id: "cmqm3x6ww0002u8l266r7mgae", companyId, nameAr: "مطعم أسد", nameEn: "Asad Restaurant" } })
  await prisma.restaurant.upsert({ where: { id: "cmqm43jdy00018z3lqyvfjs5b" }, update: {}, create: { id: "cmqm43jdy00018z3lqyvfjs5b", companyId, nameAr: "مطعم صباح الليل", nameEn: "Sabah Al-Lail Restaurant" } })
  await prisma.restaurant.upsert({ where: { id: "cmqm47s0t0001gtzflmlx5wf9" }, update: {}, create: { id: "cmqm47s0t0001gtzflmlx5wf9", companyId, nameAr: "شيكنز بار", nameEn: "Chickens Bar" } })
  await prisma.restaurant.upsert({ where: { id: "cmqm4c1l10001rv2wb69dqxth" }, update: {}, create: { id: "cmqm4c1l10001rv2wb69dqxth", companyId, nameAr: "مطعم أسد الحمراء", nameEn: "Asad Al-Hamra Restaurant" } })

  // Suppliers
  await prisma.supplier.upsert({ where: { id: "cmqm3x71i0033u8l2qndh0z6r" }, update: {}, create: { id: "cmqm3x71i0033u8l2qndh0z6r", companyId, nameAr: "محطة ادريس", nameEn: "محطة ادريس" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x722003nu8l2isvplp65" }, update: {}, create: { id: "cmqm3x722003nu8l2isvplp65", companyId, nameAr: "موردين متنوعين", nameEn: "موردين متنوعين" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x72e003xu8l2nijefayv" }, update: {}, create: { id: "cmqm3x72e003xu8l2nijefayv", companyId, nameAr: "داربردى", nameEn: "داربردى" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x74r0066u8l2y3fvw100" }, update: {}, create: { id: "cmqm3x74r0066u8l2y3fvw100", companyId, nameAr: "لوازم ومحلات 5 ريال", nameEn: "لوازم ومحلات 5 ريال" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x750006eu8l2ee9jmddf" }, update: {}, create: { id: "cmqm3x750006eu8l2ee9jmddf", companyId, nameAr: "المراعي", nameEn: "المراعي" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x75d006pu8l2ote4y7jo" }, update: {}, create: { id: "cmqm3x75d006pu8l2ote4y7jo", companyId, nameAr: "غصن للخضار", nameEn: "غصن للخضار" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x75o006zu8l2h0oabe1z" }, update: {}, create: { id: "cmqm3x75o006zu8l2h0oabe1z", companyId, nameAr: "انتاج", nameEn: "انتاج" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x76k007tu8l2ahspyra6" }, update: {}, create: { id: "cmqm3x76k007tu8l2ahspyra6", companyId, nameAr: "حلاتي", nameEn: "حلاتي" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x777008eu8l27khngb85" }, update: {}, create: { id: "cmqm3x777008eu8l27khngb85", companyId, nameAr: "جملة اكسبرس", nameEn: "جملة اكسبرس" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x78b009eu8l201vi9mad" }, update: {}, create: { id: "cmqm3x78b009eu8l201vi9mad", companyId, nameAr: "مزارعنا", nameEn: "مزارعنا" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x79o00afu8l2tvhcu3vi" }, update: {}, create: { id: "cmqm3x79o00afu8l2tvhcu3vi", companyId, nameAr: "يالي", nameEn: "يالي" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7a600awu8l2y2lnyem8" }, update: {}, create: { id: "cmqm3x7a600awu8l2y2lnyem8", companyId, nameAr: "عطار", nameEn: "عطار" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7ar00bju8l237e11rzt" }, update: {}, create: { id: "cmqm3x7ar00bju8l237e11rzt", companyId, nameAr: "الجميل", nameEn: "الجميل" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7b300bvu8l2njiuwnps" }, update: {}, create: { id: "cmqm3x7b300bvu8l2njiuwnps", companyId, nameAr: "بيبسي", nameEn: "بيبسي" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7ba00c2u8l2bcf77ntc" }, update: {}, create: { id: "cmqm3x7ba00c2u8l2bcf77ntc", companyId, nameAr: "ملحمة المروج", nameEn: "ملحمة المروج" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7ej00f0u8l2xc3s1dkc" }, update: {}, create: { id: "cmqm3x7ej00f0u8l2xc3s1dkc", companyId, nameAr: "شركة الشخص", nameEn: "شركة الشخص" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7ff00g2u8l24yfu9l09" }, update: {}, create: { id: "cmqm3x7ff00g2u8l24yfu9l09", companyId, nameAr: "البان القرية", nameEn: "البان القرية" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7hg00ipu8l26bfbwtl8" }, update: {}, create: { id: "cmqm3x7hg00ipu8l26bfbwtl8", companyId, nameAr: "العثيم", nameEn: "العثيم" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7hw00j5u8l2kc4np869" }, update: {}, create: { id: "cmqm3x7hw00j5u8l2kc4np869", companyId, nameAr: "لهب", nameEn: "لهب" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7j300kou8l24l31p1g8" }, update: {}, create: { id: "cmqm3x7j300kou8l24l31p1g8", companyId, nameAr: "جادة", nameEn: "جادة" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7na00pnu8l25z4jy8de" }, update: {}, create: { id: "cmqm3x7na00pnu8l25z4jy8de", companyId, nameAr: "القرية", nameEn: "القرية" } })
  await prisma.supplier.upsert({ where: { id: "cmqm3x7r200tyu8l22arw1rzb" }, update: {}, create: { id: "cmqm3x7r200tyu8l22arw1rzb", companyId, nameAr: "الحمراني", nameEn: "الحمراني" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jk900318z3lurdbxxe5" }, update: {}, create: { id: "cmqm43jk900318z3lurdbxxe5", companyId, nameAr: "افندينا", nameEn: "افندينا" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jkj00398z3lm1g4k62u" }, update: {}, create: { id: "cmqm43jkj00398z3lm1g4k62u", companyId, nameAr: "محطة محروقات", nameEn: "محطة محروقات" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jle00458z3lzik8e5od" }, update: {}, create: { id: "cmqm43jle00458z3lzik8e5od", companyId, nameAr: "رفاق الخليج", nameEn: "رفاق الخليج" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jlo004d8z3l2re349e7" }, update: {}, create: { id: "cmqm43jlo004d8z3l2re349e7", companyId, nameAr: "مخابز النسيم", nameEn: "مخابز النسيم" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jnq00698z3luuwraec4" }, update: {}, create: { id: "cmqm43jnq00698z3luuwraec4", companyId, nameAr: "ارصاد التعمير", nameEn: "ارصاد التعمير" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43joc006w8z3l9sezfou2" }, update: {}, create: { id: "cmqm43joc006w8z3l9sezfou2", companyId, nameAr: "عمار بدالرحمن", nameEn: "عمار بدالرحمن" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jot00798z3l6m6s1mm8" }, update: {}, create: { id: "cmqm43jot00798z3l6m6s1mm8", companyId, nameAr: "ستيك", nameEn: "ستيك" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jqv00968z3lt7u9bct4" }, update: {}, create: { id: "cmqm43jqv00968z3lt7u9bct4", companyId, nameAr: "شركة البيبسي ", nameEn: "شركة البيبسي " } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jrw00a48z3lybfhe531" }, update: {}, create: { id: "cmqm43jrw00a48z3lybfhe531", companyId, nameAr: "راية", nameEn: "راية" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jvn00dl8z3llxb4ware" }, update: {}, create: { id: "cmqm43jvn00dl8z3llxb4ware", companyId, nameAr: "كارفور", nameEn: "كارفور" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43jvy00dt8z3lks39x36p" }, update: {}, create: { id: "cmqm43jvy00dt8z3lks39x36p", companyId, nameAr: "خطوط الافكار", nameEn: "خطوط الافكار" } })
  await prisma.supplier.upsert({ where: { id: "cmqm43k0u00ip8z3ltygl5yfu" }, update: {}, create: { id: "cmqm43k0u00ip8z3ltygl5yfu", companyId, nameAr: "لوازم ", nameEn: "لوازم " } })
  await prisma.supplier.upsert({ where: { id: "cmqmuuht70005ysv10faozhn8" }, update: {}, create: { id: "cmqmuuht70005ysv10faozhn8", companyId, nameAr: "دار بردى", nameEn: "دار بردى" } })
  await prisma.supplier.upsert({ where: { id: "cmqmuuhum002aysv1co5zec71" }, update: {}, create: { id: "cmqmuuhum002aysv1co5zec71", companyId, nameAr: "باجة", nameEn: "باجة" } })
  await prisma.supplier.upsert({ where: { id: "cmqmuuhvm003zysv1s33k6drh" }, update: {}, create: { id: "cmqmuuhvm003zysv1s33k6drh", companyId, nameAr: "الاماسي", nameEn: "الاماسي" } })
  await prisma.supplier.upsert({ where: { id: "cmqmuuhwd005cysv1c72xpr4n" }, update: {}, create: { id: "cmqmuuhwd005cysv1c72xpr4n", companyId, nameAr: "افاندينا", nameEn: "افاندينا" } })
  await prisma.supplier.upsert({ where: { id: "cmqmuuhz500a2ysv1qu1z99rt" }, update: {}, create: { id: "cmqmuuhz500a2ysv1qu1z99rt", companyId, nameAr: "لوازم زمحلات صيانة", nameEn: "لوازم زمحلات صيانة" } })
  await prisma.supplier.upsert({ where: { id: "cmqmuui0a00bpysv1pws11u10" }, update: {}, create: { id: "cmqmuui0a00bpysv1pws11u10", companyId, nameAr: "", nameEn: "" } })

  // Inventory Categories
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x71m0035u8l27kxzvoz3" }, update: {}, create: { id: "cmqm3x71m0035u8l27kxzvoz3", companyId, nameAr: "Vehicle Fuel", nameEn: "Vehicle Fuel" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x725003pu8l2zyxert52" }, update: {}, create: { id: "cmqm3x725003pu8l2zyxert52", companyId, nameAr: "Maintenance Services", nameEn: "Maintenance Services" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x72h003zu8l2podirdgy" }, update: {}, create: { id: "cmqm3x72h003zu8l2podirdgy", companyId, nameAr: "Food Supplies & Oils", nameEn: "Food Supplies & Oils" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x72m0043u8l27w11tihj" }, update: {}, create: { id: "cmqm3x72m0043u8l27w11tihj", companyId, nameAr: "Food Products & Desserts", nameEn: "Food Products & Desserts" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x735004fu8l2o6z0u0cj" }, update: {}, create: { id: "cmqm3x735004fu8l2o6z0u0cj", companyId, nameAr: "Spices & Seasoning", nameEn: "Spices & Seasoning" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x73d004lu8l2uuwd9nvo" }, update: {}, create: { id: "cmqm3x73d004lu8l2uuwd9nvo", companyId, nameAr: "Packaging & Paper", nameEn: "Packaging & Paper" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x73r004vu8l2awobpqrf" }, update: {}, create: { id: "cmqm3x73r004vu8l2awobpqrf", companyId, nameAr: "Poultry & Meat", nameEn: "Poultry & Meat" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x75g006ru8l20i8ckgtb" }, update: {}, create: { id: "cmqm3x75g006ru8l20i8ckgtb", companyId, nameAr: "Vegetables & Fruits", nameEn: "Vegetables & Fruits" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x75x0075u8l2dcl0y4ej" }, update: {}, create: { id: "cmqm3x75x0075u8l2dcl0y4ej", companyId, nameAr: "Milk & Dairy", nameEn: "Milk & Dairy" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x76y0086u8l2h1ai5xg0" }, update: {}, create: { id: "cmqm3x76y0086u8l2h1ai5xg0", companyId, nameAr: "Internet", nameEn: "Internet" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x77a008gu8l2q99adh5l" }, update: {}, create: { id: "cmqm3x77a008gu8l2q99adh5l", companyId, nameAr: "Mineral Water", nameEn: "Mineral Water" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x77f008ku8l27rl9rh8c" }, update: {}, create: { id: "cmqm3x77f008ku8l27rl9rh8c", companyId, nameAr: "Soft Drinks", nameEn: "Soft Drinks" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x7bm00ceu8l2pm9gn5ab" }, update: {}, create: { id: "cmqm3x7bm00ceu8l2pm9gn5ab", companyId, nameAr: "Cleaning Supplies", nameEn: "Cleaning Supplies" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x7bw00cmu8l25njwgock" }, update: {}, create: { id: "cmqm3x7bw00cmu8l25njwgock", companyId, nameAr: "Kitchen Supplies", nameEn: "Kitchen Supplies" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x7dc00dmu8l2boatvnw6" }, update: {}, create: { id: "cmqm3x7dc00dmu8l2boatvnw6", companyId, nameAr: "Cashier Supplies", nameEn: "Cashier Supplies" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x7g300gru8l2m3j2pqyl" }, update: {}, create: { id: "cmqm3x7g300gru8l2m3j2pqyl", companyId, nameAr: "Maintenance Materials", nameEn: "Maintenance Materials" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x7hz00j7u8l2xxndrdln" }, update: {}, create: { id: "cmqm3x7hz00j7u8l2xxndrdln", companyId, nameAr: "Charcoal", nameEn: "Charcoal" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x7iu00kgu8l2ptprprdh" }, update: {}, create: { id: "cmqm3x7iu00kgu8l2ptprprdh", companyId, nameAr: "Juices", nameEn: "Juices" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm3x7mr00p4u8l2lp05gken" }, update: {}, create: { id: "cmqm3x7mr00p4u8l2lp05gken", companyId, nameAr: "Miscellaneous", nameEn: "Miscellaneous" } })
  await prisma.inventoryCategory.upsert({ where: { id: "cmqm43jm9004u8z3lny16wsfe" }, update: {}, create: { id: "cmqm43jm9004u8z3lny16wsfe", companyId, nameAr: "Advertising Campaigns", nameEn: "Advertising Campaigns" } })

  // Inventory Items
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x71q0037u8l2itzggh5w" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x71q0037u8l2itzggh5w", companyId, nameAr: "بنزين", nameEn: "بنزين", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x71m0035u8l27kxzvoz3" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x728003ru8l2qcb9unw0" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x728003ru8l2qcb9unw0", companyId, nameAr: "اصلاح كهرباء مطعم اسد", nameEn: "اصلاح كهرباء مطعم اسد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x72j0041u8l2p2x7gndc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x72j0041u8l2p2x7gndc", companyId, nameAr: "خل ابيض برميل 30", nameEn: "خل ابيض برميل 30", unit: "bottle", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x72p0045u8l22g9qdtv5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x72p0045u8l22g9qdtv5", companyId, nameAr: "بامية اكسترا", nameEn: "بامية اكسترا", unit: "carton", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x72s0047u8l2kjvfd299" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x72s0047u8l2kjvfd299", companyId, nameAr: "فاصولياء مجمد", nameEn: "فاصولياء مجمد", unit: "carton", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x72v0049u8l2kzojaiz6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x72v0049u8l2kzojaiz6", companyId, nameAr: "بازيلا السنبلة", nameEn: "بازيلا السنبلة", unit: "carton", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x72z004bu8l256u3ayrj" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x72z004bu8l256u3ayrj", companyId, nameAr: "بطاطس جولي شد 4", nameEn: "بطاطس جولي شد 4", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x732004du8l2dvinhkln" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x732004du8l2dvinhkln", companyId, nameAr: "صلصة طماطم رنا شد 6", nameEn: "صلصة طماطم رنا شد 6", unit: "carton", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x738004hu8l2kvfdcp71" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x738004hu8l2kvfdcp71", companyId, nameAr: "كركم مطحون", nameEn: "كركم مطحون", unit: "kg", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73b004ju8l2e95t8700" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73b004ju8l2e95t8700", companyId, nameAr: "حمص رقم 12 هندي", nameEn: "حمص رقم 12 هندي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73g004nu8l2qclwyb0w" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73g004nu8l2qclwyb0w", companyId, nameAr: "اكياس ورق بني", nameEn: "اكياس ورق بني", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73j004pu8l2tc90yzmt" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73j004pu8l2tc90yzmt", companyId, nameAr: "بيض اكس", nameEn: "بيض اكس", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73m004ru8l2qr2it4hh" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73m004ru8l2qr2it4hh", companyId, nameAr: "نشا ذرة", nameEn: "نشا ذرة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73o004tu8l2j8bmb68d" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73o004tu8l2j8bmb68d", companyId, nameAr: "فانيلا", nameEn: "فانيلا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73t004xu8l28mc450ss" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73t004xu8l28mc450ss", companyId, nameAr: "لحم بوبي فيل", nameEn: "لحم بوبي فيل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73w004zu8l25tipfu37" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73w004zu8l25tipfu37", companyId, nameAr: "لحم مفروم شهية", nameEn: "لحم مفروم شهية", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x73y0051u8l2isuonrqc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x73y0051u8l2isuonrqc", companyId, nameAr: "شطة شفرات", nameEn: "شطة شفرات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7410053u8l2bot7yjdi" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7410053u8l2bot7yjdi", companyId, nameAr: "زيت هالة تنك", nameEn: "زيت هالة تنك", unit: "can", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7430055u8l2arnjbhjj" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7430055u8l2arnjbhjj", companyId, nameAr: "زيت زهرتي شد 6", nameEn: "زيت زهرتي شد 6", unit: "carton", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7460057u8l27n3zqtqu" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7460057u8l27n3zqtqu", companyId, nameAr: "طحينة الجميل", nameEn: "طحينة الجميل", unit: "can", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7480059u8l2qpaa5s1i" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7480059u8l2qpaa5s1i", companyId, nameAr: "ماجي سطل شد2", nameEn: "ماجي سطل شد2", unit: "carton", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x74c005bu8l2kjb5tg7m" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x74c005bu8l2kjb5tg7m", companyId, nameAr: "ماجي ابيض اصلي", nameEn: "ماجي ابيض اصلي", unit: "carton", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x74f005du8l2gl69gjp0" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x74f005du8l2gl69gjp0", companyId, nameAr: "قرفة عود شد 20 كغم", nameEn: "قرفة عود شد 20 كغم", unit: "kg", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x74i005fu8l2365fb8d8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x74i005fu8l2365fb8d8", companyId, nameAr: "ملح ناعم 50 ك", nameEn: "ملح ناعم 50 ك", unit: "bag", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x74u0068u8l2zw783tk5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x74u0068u8l2zw783tk5", companyId, nameAr: "تنظيف مداخن", nameEn: "تنظيف مداخن", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x753006gu8l2xnyr3dh9" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x753006gu8l2xnyr3dh9", companyId, nameAr: "دجاج 900", nameEn: "دجاج 900", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x757006iu8l2aodtn606" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x757006iu8l2aodtn606", companyId, nameAr: "دجاج 1500", nameEn: "دجاج 1500", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x75j006tu8l26ybjbg11" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x75j006tu8l26ybjbg11", companyId, nameAr: "خضار", nameEn: "خضار", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75g006ru8l20i8ckgtb" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7600077u8l21olb9tsw" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7600077u8l21olb9tsw", companyId, nameAr: "لبن طازج كامل الدسم", nameEn: "لبن طازج كامل الدسم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7630079u8l2pk1fehc5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7630079u8l2pk1fehc5", companyId, nameAr: "لبن 2 لتر", nameEn: "لبن 2 لتر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x766007bu8l2a3npvau0" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x766007bu8l2a3npvau0", companyId, nameAr: "حليب 2.8", nameEn: "حليب 2.8", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x768007du8l2xckdpsg8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x768007du8l2xckdpsg8", companyId, nameAr: "زبادي 170", nameEn: "زبادي 170", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x76b007fu8l2ftf08z83" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x76b007fu8l2ftf08z83", companyId, nameAr: "زبادي", nameEn: "زبادي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x76e007hu8l248vh3dh7" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x76e007hu8l248vh3dh7", companyId, nameAr: "لبن 1 لتر", nameEn: "لبن 1 لتر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x76n007vu8l2fumstav2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x76n007vu8l2fumstav2", companyId, nameAr: "كنافة", nameEn: "كنافة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7710088u8l2rrlzplkq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7710088u8l2rrlzplkq", companyId, nameAr: "اتصالات توصيل سلطان", nameEn: "اتصالات توصيل سلطان", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x76y0086u8l2h1ai5xg0" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77c008iu8l2d48t8ore" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77c008iu8l2d48t8ore", companyId, nameAr: "ماء عذاري", nameEn: "ماء عذاري", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77a008gu8l2q99adh5l" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77h008mu8l2cjj3hebo" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77h008mu8l2cjj3hebo", companyId, nameAr: "ميرننا 1 لتر", nameEn: "ميرننا 1 لتر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77k008ou8l2tiwh87tk" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77k008ou8l2tiwh87tk", companyId, nameAr: "ماء نوفا", nameEn: "ماء نوفا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77a008gu8l2q99adh5l" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77n008qu8l2367e6vuc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77n008qu8l2367e6vuc", companyId, nameAr: "بيبسي 250 مل", nameEn: "بيبسي 250 مل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77q008su8l2kpowsbtm" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77q008su8l2kpowsbtm", companyId, nameAr: "بيبسي 1 لتر", nameEn: "بيبسي 1 لتر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77t008uu8l2qz8emya6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77t008uu8l2qz8emya6", companyId, nameAr: "بيبسي 2 لتر", nameEn: "بيبسي 2 لتر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77w008wu8l2d8tjip1y" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77w008wu8l2d8tjip1y", companyId, nameAr: "حمضيات عائلي 2 ل", nameEn: "حمضيات عائلي 2 ل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x77z008yu8l2mx4eq2ic" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x77z008yu8l2mx4eq2ic", companyId, nameAr: "سفن اب زجاج", nameEn: "سفن اب زجاج", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7820090u8l2ve72mhlm" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7820090u8l2ve72mhlm", companyId, nameAr: "ديو 250 مل", nameEn: "ديو 250 مل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x78d009gu8l2jkdl9786" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x78d009gu8l2jkdl9786", companyId, nameAr: "دجاج 1200", nameEn: "دجاج 1200", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x78g009iu8l2a5l6u2jq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x78g009iu8l2a5l6u2jq", companyId, nameAr: "دجاج 700", nameEn: "دجاج 700", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x791009yu8l2pzbpdg8b" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x791009yu8l2pzbpdg8b", companyId, nameAr: "لبن صغير", nameEn: "لبن صغير", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x79h00a9u8l200zp4jcc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x79h00a9u8l200zp4jcc", companyId, nameAr: "دجاج 1000", nameEn: "دجاج 1000", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x79r00ahu8l2x6iiilho" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x79r00ahu8l2x6iiilho", companyId, nameAr: "مناديل مكتب", nameEn: "مناديل مكتب", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7a800ayu8l2tnqrqys6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7a800ayu8l2tnqrqys6", companyId, nameAr: "كمون سوري", nameEn: "كمون سوري", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ab00b0u8l2tkt8eh34" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ab00b0u8l2tkt8eh34", companyId, nameAr: "زنجبيل مطحون", nameEn: "زنجبيل مطحون", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ad00b2u8l2e0zg8dm2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ad00b2u8l2e0zg8dm2", companyId, nameAr: "كزبره", nameEn: "كزبره", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7au00blu8l2eii4g041" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7au00blu8l2eii4g041", companyId, nameAr: "كينزا كولا250", nameEn: "كينزا كولا250", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7bd00c4u8l25vgveczl" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7bd00c4u8l25vgveczl", companyId, nameAr: "خروف", nameEn: "خروف", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7bo00cgu8l276kt0ere" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7bo00cgu8l276kt0ere", companyId, nameAr: "سلك غسيل", nameEn: "سلك غسيل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bm00ceu8l2pm9gn5ab" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7br00ciu8l26rh4n2bw" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7br00ciu8l26rh4n2bw", companyId, nameAr: "مريول بلاستيك", nameEn: "مريول بلاستيك", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bm00ceu8l2pm9gn5ab" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7bu00cku8l29d67ocqy" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7bu00cku8l29d67ocqy", companyId, nameAr: "مناديل اوتوكات", nameEn: "مناديل اوتوكات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bm00ceu8l2pm9gn5ab" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7bz00cou8l2lz3bzsd8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7bz00cou8l2lz3bzsd8", companyId, nameAr: "رول تغليف 30 سم", nameEn: "رول تغليف 30 سم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7c300cqu8l20d8gvtuy" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7c300cqu8l20d8gvtuy", companyId, nameAr: "صحن حبة 1002", nameEn: "صحن حبة 1002", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7c600csu8l2ylmxoy5f" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7c600csu8l2ylmxoy5f", companyId, nameAr: "مناديل سحب", nameEn: "مناديل سحب", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7c900cuu8l2a6vqiph8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7c900cuu8l2a6vqiph8", companyId, nameAr: "علب صوص اسود 2 اونص", nameEn: "علب صوص اسود 2 اونص", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7cb00cwu8l2gxkqeqc8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7cb00cwu8l2gxkqeqc8", companyId, nameAr: "اكياس نايلون 4", nameEn: "اكياس نايلون 4", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ce00cyu8l2jfb0wv6e" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ce00cyu8l2jfb0wv6e", companyId, nameAr: "اكياس نفايات 30", nameEn: "اكياس نفايات 30", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bm00ceu8l2pm9gn5ab" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ci00d0u8l22sx0rkg6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ci00d0u8l22sx0rkg6", companyId, nameAr: "علب مايكرويف 250", nameEn: "علب مايكرويف 250", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ck00d2u8l2dubucu5q" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ck00d2u8l2dubucu5q", companyId, nameAr: "صحن الومينيوم نص حبة", nameEn: "صحن الومينيوم نص حبة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7cn00d4u8l2yam7rtf4" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7cn00d4u8l2yam7rtf4", companyId, nameAr: "كاسات بلاستيك", nameEn: "كاسات بلاستيك", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7cq00d6u8l2p0vyo1af" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7cq00d6u8l2p0vyo1af", companyId, nameAr: "كوب صوص اسود 4 اونص", nameEn: "كوب صوص اسود 4 اونص", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ct00d8u8l23v66kxuo" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ct00d8u8l23v66kxuo", companyId, nameAr: "علبة سلطة شفاف", nameEn: "علبة سلطة شفاف", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7cw00dau8l2d0fr7a87" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7cw00dau8l2d0fr7a87", companyId, nameAr: "سفرة شعبي", nameEn: "سفرة شعبي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7cy00dcu8l2msxki9aa" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7cy00dcu8l2msxki9aa", companyId, nameAr: "صحن مشاوي صغير1005", nameEn: "صحن مشاوي صغير1005", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7d100deu8l2ikp46g9z" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7d100deu8l2ikp46g9z", companyId, nameAr: "كوب شوربة 10 اونص ابض", nameEn: "كوب شوربة 10 اونص ابض", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7d400dgu8l2hbucxhhs" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7d400dgu8l2hbucxhhs", companyId, nameAr: "صحن بلاستيك رقم 1", nameEn: "صحن بلاستيك رقم 1", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7d600diu8l2ys1qxu4b" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7d600diu8l2ys1qxu4b", companyId, nameAr: "رول قصدير 30*150", nameEn: "رول قصدير 30*150", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7d900dku8l2n0ysxatf" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7d900dku8l2n0ysxatf", companyId, nameAr: "صابون صحون", nameEn: "صابون صحون", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bm00ceu8l2pm9gn5ab" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7dm00dou8l261gmt4vh" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7dm00dou8l261gmt4vh", companyId, nameAr: "رول كاشير", nameEn: "رول كاشير", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7dc00dmu8l2boatvnw6" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7dp00dqu8l2et86wequ" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7dp00dqu8l2et86wequ", companyId, nameAr: "كمامة طبي", nameEn: "كمامة طبي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ds00dsu8l2vuh1b6qz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ds00dsu8l2vuh1b6qz", companyId, nameAr: "قفاز اسود اكس لارج", nameEn: "قفاز اسود اكس لارج", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7dv00duu8l2zsazk8fy" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7dv00duu8l2zsazk8fy", companyId, nameAr: "كوب شوربة 8 اونص", nameEn: "كوب شوربة 8 اونص", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7dy00dwu8l2c374n8k5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7dy00dwu8l2c374n8k5", companyId, nameAr: "قفاز اسود لارج", nameEn: "قفاز اسود لارج", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7e100dyu8l2gksqrgyz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7e100dyu8l2gksqrgyz", companyId, nameAr: "صحن نفر لحم", nameEn: "صحن نفر لحم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7e300e0u8l2id3y8e3p" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7e300e0u8l2id3y8e3p", companyId, nameAr: "غطاء صجن نفر لحم", nameEn: "غطاء صجن نفر لحم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7e600e2u8l2vafryfbr" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7e600e2u8l2vafryfbr", companyId, nameAr: "ملاعق اسود", nameEn: "ملاعق اسود", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7em00f2u8l2qkj95mfe" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7em00f2u8l2qkj95mfe", companyId, nameAr: "ارز", nameEn: "ارز", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7f300fnu8l2ut4ti1ep" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7f300fnu8l2ut4ti1ep", companyId, nameAr: "مشتريات 5", nameEn: "مشتريات 5", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7fi00g4u8l2mmi8yq7f" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7fi00g4u8l2mmi8yq7f", companyId, nameAr: "لبن كاسة", nameEn: "لبن كاسة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7g600gtu8l2t3sdebkt" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7g600gtu8l2t3sdebkt", companyId, nameAr: "كهربائيات", nameEn: "كهربائيات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7g300gru8l2m3j2pqyl" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7gg00hdu8l2zl8l59bc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7gg00hdu8l2zl8l59bc", companyId, nameAr: "صيانة زيت سيارة", nameEn: "صيانة زيت سيارة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x71m0035u8l27kxzvoz3" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7gl00hju8l20k540cpa" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7gl00hju8l20k540cpa", companyId, nameAr: "تصليح فريون سيارة", nameEn: "تصليح فريون سيارة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7gw00hzu8l2rt52bsql" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7gw00hzu8l2rt52bsql", companyId, nameAr: "زبادي 2 ك", nameEn: "زبادي 2 ك", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7h800ifu8l2fs6bv3g9" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7h800ifu8l2fs6bv3g9", companyId, nameAr: "صيانة وتصليح مكيف سكن الموظفين", nameEn: "صيانة وتصليح مكيف سكن الموظفين", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7hj00iru8l2zuth0chz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7hj00iru8l2zuth0chz", companyId, nameAr: "مياه اوسكا", nameEn: "مياه اوسكا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77a008gu8l2q99adh5l" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7i100j9u8l2j49eh3kr" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7i100j9u8l2j49eh3kr", companyId, nameAr: "فحم نباتي", nameEn: "فحم نباتي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7hz00j7u8l2xxndrdln" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ii00jwu8l2g2go64qq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ii00jwu8l2g2go64qq", companyId, nameAr: "دجاج 1300", nameEn: "دجاج 1300", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ix00kiu8l2pghdiuts" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ix00kiu8l2pghdiuts", companyId, nameAr: "عصير", nameEn: "عصير", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7iu00kgu8l2ptprprdh" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7j600kqu8l2ritzrqte" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7j600kqu8l2ritzrqte", companyId, nameAr: "علبة استيكر", nameEn: "علبة استيكر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ja00ksu8l26e0c0q48" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ja00ksu8l26e0c0q48", companyId, nameAr: "وعاء المونيوم", nameEn: "وعاء المونيوم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7k100ltu8l2veomgm9w" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7k100ltu8l2veomgm9w", companyId, nameAr: "سفرة مطبوع", nameEn: "سفرة مطبوع", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7kk00mlu8l29yjih1ak" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7kk00mlu8l29yjih1ak", companyId, nameAr: "زيت زهرتي", nameEn: "زيت زهرتي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7kn00mnu8l29cgfa3gm" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7kn00mnu8l29cgfa3gm", companyId, nameAr: "خل ابيض", nameEn: "خل ابيض", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7kq00mpu8l2rpvkye76" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7kq00mpu8l2rpvkye76", companyId, nameAr: "كريم كراميل", nameEn: "كريم كراميل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ks00mru8l2z30kpetw" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ks00mru8l2z30kpetw", companyId, nameAr: "بازيلاء مجمد", nameEn: "بازيلاء مجمد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7kv00mtu8l2jdvyjw4j" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7kv00mtu8l2jdvyjw4j", companyId, nameAr: "بهارات مشكل مهران", nameEn: "بهارات مشكل مهران", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7kx00mvu8l262fsm2q7" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7kx00mvu8l262fsm2q7", companyId, nameAr: "ماجي سطل", nameEn: "ماجي سطل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7l000mxu8l2n34s3lny" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7l000mxu8l2n34s3lny", companyId, nameAr: "ملح ناعم 50", nameEn: "ملح ناعم 50", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7l200mzu8l2b0tt8i7p" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7l200mzu8l2b0tt8i7p", companyId, nameAr: "نعنع ناشف", nameEn: "نعنع ناشف", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7l500n1u8l2lq0by91w" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7l500n1u8l2lq0by91w", companyId, nameAr: "سكر 50", nameEn: "سكر 50", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7l800n3u8l2bhmcd473" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7l800n3u8l2bhmcd473", companyId, nameAr: "ماجي ابيض", nameEn: "ماجي ابيض", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7lb00n5u8l26o6iec7i" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7lb00n5u8l26o6iec7i", companyId, nameAr: "زيتون مشكل", nameEn: "زيتون مشكل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ld00n7u8l2q5n5x0yc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ld00n7u8l2q5n5x0yc", companyId, nameAr: "شطه شفرات", nameEn: "شطه شفرات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7lg00n9u8l21h3ybhwm" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7lg00n9u8l21h3ybhwm", companyId, nameAr: "شعيرية", nameEn: "شعيرية", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7lt00o3u8l2ehgqeg6h" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7lt00o3u8l2ehgqeg6h", companyId, nameAr: "زبيب افغاني", nameEn: "زبيب افغاني", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7m300odu8l28uytqz33" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7m300odu8l28uytqz33", companyId, nameAr: "طفايات حريق", nameEn: "طفايات حريق", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7mb00onu8l2aby0jr7x" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7mb00onu8l2aby0jr7x", companyId, nameAr: "بيض", nameEn: "بيض", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7me00opu8l27q3vzozc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7me00opu8l27q3vzozc", companyId, nameAr: "بهارات الكاجون", nameEn: "بهارات الكاجون", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7mh00oru8l2d803xbek" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7mh00oru8l2d803xbek", companyId, nameAr: "دبس فليفلة", nameEn: "دبس فليفلة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7mu00p6u8l2k4883xdz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7mu00p6u8l2k4883xdz", companyId, nameAr: "فحص دوري باص هايكس", nameEn: "فحص دوري باص هايكس", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7mx00p8u8l2hwodpfq6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7mx00p8u8l2hwodpfq6", companyId, nameAr: "قطع لباص هايكس", nameEn: "قطع لباص هايكس", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7nk00pyu8l2581lhtsf" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7nk00pyu8l2581lhtsf", companyId, nameAr: "اضائة ليد", nameEn: "اضائة ليد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7g300gru8l2m3j2pqyl" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ns00q4u8l2ysiczltp" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ns00q4u8l2ysiczltp", companyId, nameAr: "اصلاح باص هايكس", nameEn: "اصلاح باص هايكس", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7nv00q6u8l2wxjvqt7c" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7nv00q6u8l2wxjvqt7c", companyId, nameAr: "عسيل باص هايكس", nameEn: "عسيل باص هايكس", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7pe00rzu8l20vra43zc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7pe00rzu8l20vra43zc", companyId, nameAr: "جلو", nameEn: "جلو", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7g300gru8l2m3j2pqyl" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7pl00s5u8l28w4axdfg" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7pl00s5u8l28w4axdfg", companyId, nameAr: "مواد تغليف", nameEn: "مواد تغليف", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7ps00sbu8l2o50g707k" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7ps00sbu8l2o50g707k", companyId, nameAr: "تنظيف سكن العمال الموظف ثرو", nameEn: "تنظيف سكن العمال الموظف ثرو", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7py00shu8l2ys59bb78" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7py00shu8l2ys59bb78", companyId, nameAr: "اصبلاح باب الزجاج", nameEn: "اصبلاح باب الزجاج", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7qh00t7u8l2l8tlzgke" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7qh00t7u8l2l8tlzgke", companyId, nameAr: "دجاج 1400", nameEn: "دجاج 1400", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7r500u0u8l2jsuzoyly" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7r500u0u8l2jsuzoyly", companyId, nameAr: "اكياس علاق", nameEn: "اكياس علاق", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm3x7se00vtu8l23ji6rgda" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm3x7se00vtu8l23ji6rgda", companyId, nameAr: "جرجر مغسلة", nameEn: "جرجر مغسلة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7g300gru8l2m3j2pqyl" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jis001z8z3ld07kss4g" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jis001z8z3ld07kss4g", companyId, nameAr: "دقيق ابيض 45 ك", nameEn: "دقيق ابيض 45 ك", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jiz00218z3lykvljd23" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jiz00218z3lykvljd23", companyId, nameAr: "جبنة شيدر", nameEn: "جبنة شيدر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jj200238z3l2oivqw7f" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jj200238z3l2oivqw7f", companyId, nameAr: "زيت ليزا", nameEn: "زيت ليزا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jj500258z3lgna76eu2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jj500258z3lgna76eu2", companyId, nameAr: "دقيق فاخر", nameEn: "دقيق فاخر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jjg002g8z3lnjh23uil" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jjg002g8z3lnjh23uil", companyId, nameAr: "خضار فاتورة رقم 22150 9/6", nameEn: "خضار فاتورة رقم 22150 9/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75g006ru8l20i8ckgtb" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jjk002i8z3lx12amkgh" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jjk002i8z3lx12amkgh", companyId, nameAr: "خضار 22079 07/6", nameEn: "خضار 22079 07/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75g006ru8l20i8ckgtb" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jjn002k8z3l7cdom0xo" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jjn002k8z3l7cdom0xo", companyId, nameAr: "خضار 21993 05/6", nameEn: "خضار 21993 05/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75g006ru8l20i8ckgtb" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jkd00338z3l4322u4gx" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jkd00338z3l4322u4gx", companyId, nameAr: "خبز برجر", nameEn: "خبز برجر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jks003f8z3l6m36g79l" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jks003f8z3l6m36g79l", companyId, nameAr: "بنزين 6/6", nameEn: "بنزين 6/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x71m0035u8l27kxzvoz3" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jkv003h8z3l52mbs2p6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jkv003h8z3l52mbs2p6", companyId, nameAr: "بنزين 10/6", nameEn: "بنزين 10/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x71m0035u8l27kxzvoz3" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jky003j8z3lqv4xig0t" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jky003j8z3lqv4xig0t", companyId, nameAr: "بنزين 7/6", nameEn: "بنزين 7/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x71m0035u8l27kxzvoz3" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jl1003l8z3lvfyxj96m" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jl1003l8z3lvfyxj96m", companyId, nameAr: "بنزين 9/6", nameEn: "بنزين 9/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x71m0035u8l27kxzvoz3" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jl5003n8z3lkqjxelhz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jl5003n8z3lkqjxelhz", companyId, nameAr: "بنزين 8/6", nameEn: "بنزين 8/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x71m0035u8l27kxzvoz3" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jli00478z3l4lt0kjcn" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jli00478z3l4lt0kjcn", companyId, nameAr: "بطاطس فرايز", nameEn: "بطاطس فرايز", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jlq004f8z3ljw63q30c" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jlq004f8z3ljw63q30c", companyId, nameAr: "خبز شاورما 6/6", nameEn: "خبز شاورما 6/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jlv004h8z3l02r9ykb8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jlv004h8z3l02r9ykb8", companyId, nameAr: "خبز شاورما 9/6", nameEn: "خبز شاورما 9/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jly004j8z3liou76dop" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jly004j8z3liou76dop", companyId, nameAr: "خبز شاورما 7/6", nameEn: "خبز شاورما 7/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jm1004l8z3lbr633fer" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jm1004l8z3lbr633fer", companyId, nameAr: "خبز شاورما 8/6", nameEn: "خبز شاورما 8/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jmc004w8z3lkqyig1vt" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jmc004w8z3lkqyig1vt", companyId, nameAr: "تسويق انترنت", nameEn: "تسويق انترنت", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm43jm9004u8z3lny16wsfe" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jms005c8z3lp4tvmukg" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jms005c8z3lp4tvmukg", companyId, nameAr: "خبز شاورما", nameEn: "خبز شاورما", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jmy005i8z3l9i3digx4" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jmy005i8z3l9i3digx4", companyId, nameAr: "لبنة بريزدين", nameEn: "لبنة بريزدين", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jn2005k8z3llsc7apql" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jn2005k8z3llsc7apql", companyId, nameAr: "كاتشب جاتلون بيدر", nameEn: "كاتشب جاتلون بيدر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jn5005m8z3lgyuif9ms" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jn5005m8z3lgyuif9ms", companyId, nameAr: "حليب نادك 1 لتر 12", nameEn: "حليب نادك 1 لتر 12", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jn7005o8z3lk16t8j40" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jn7005o8z3lk16t8j40", companyId, nameAr: "رز السفير", nameEn: "رز السفير", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jna005q8z3li3d3s1l8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jna005q8z3li3d3s1l8", companyId, nameAr: "حمص رقم 12", nameEn: "حمص رقم 12", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jnt006b8z3lnbr6p9d6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jnt006b8z3lnbr6p9d6", companyId, nameAr: "فيلية مزرعتي", nameEn: "فيلية مزرعتي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jo0006h8z3lt0h6c3yz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jo0006h8z3lt0h6c3yz", companyId, nameAr: "لي غاز", nameEn: "لي غاز", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7g300gru8l2m3j2pqyl" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jog006y8z3l3hckxwqq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jog006y8z3l3hckxwqq", companyId, nameAr: "كيس اهلا", nameEn: "كيس اهلا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jow007b8z3l1iun2aeg" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jow007b8z3l1iun2aeg", companyId, nameAr: "برجر باتي", nameEn: "برجر باتي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jp6007l8z3lrw7m1euv" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jp6007l8z3lrw7m1euv", companyId, nameAr: "ملابس", nameEn: "ملابس", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jpd007r8z3llemepda5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jpd007r8z3llemepda5", companyId, nameAr: "حاقن التتبيلة", nameEn: "حاقن التتبيلة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jpv00858z3lj9zsp0ms" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jpv00858z3lj9zsp0ms", companyId, nameAr: "صيانه غاز", nameEn: "صيانه غاز", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7g300gru8l2m3j2pqyl" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jq5008g8z3lgrht2u2a" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jq5008g8z3lgrht2u2a", companyId, nameAr: "مايونيز قودي", nameEn: "مايونيز قودي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jq9008i8z3lq8nwk7ny" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jq9008i8z3lq8nwk7ny", companyId, nameAr: "عصير ربيع", nameEn: "عصير ربيع", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7iu00kgu8l2ptprprdh" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jqc008k8z3l3n1hdrpv" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jqc008k8z3l3n1hdrpv", companyId, nameAr: "اكياس بلاستيك", nameEn: "اكياس بلاستيك", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jqf008m8z3lel3vum9d" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jqf008m8z3lel3vum9d", companyId, nameAr: "طرشي", nameEn: "طرشي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jqp00908z3l7rm7fnr3" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jqp00908z3l7rm7fnr3", companyId, nameAr: "كوكا كولا 1 ليتر", nameEn: "كوكا كولا 1 ليتر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jqy00988z3lob8hsero" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jqy00988z3lob8hsero", companyId, nameAr: "بيبسي", nameEn: "بيبسي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jrg009q8z3lmk2y3ua2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jrg009q8z3lmk2y3ua2", companyId, nameAr: "دجاج  مسحب", nameEn: "دجاج  مسحب", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43js300aa8z3l90z0h4ge" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43js300aa8z3l90z0h4ge", companyId, nameAr: "كاتشب شفرات", nameEn: "كاتشب شفرات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43js700ac8z3lys9u0il1" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43js700ac8z3lys9u0il1", companyId, nameAr: "بهارات بروستد", nameEn: "بهارات بروستد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jsw00b48z3lfncj40s8" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jsw00b48z3lfncj40s8", companyId, nameAr: "جوال المطعم شحن", nameEn: "جوال المطعم شحن", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x76y0086u8l2h1ai5xg0" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jt400ba8z3lgbk4a58q" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jt400ba8z3lgbk4a58q", companyId, nameAr: "اعمل تنظيف الصرف الصحي", nameEn: "اعمل تنظيف الصرف الصحي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jtb00bg8z3ltm7xata4" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jtb00bg8z3ltm7xata4", companyId, nameAr: "سكر", nameEn: "سكر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jte00bi8z3l4byq8qqo" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jte00bi8z3l4byq8qqo", companyId, nameAr: "سمك فيلية", nameEn: "سمك فيلية", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jto00bv8z3luw5l72an" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jto00bv8z3luw5l72an", companyId, nameAr: "فاتورة التميمي بهارات", nameEn: "فاتورة التميمي بهارات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43ju600cd8z3l11pw8hy9" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43ju600cd8z3l11pw8hy9", companyId, nameAr: "روبيان", nameEn: "روبيان", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43juu00cw8z3l64x30cd5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43juu00cw8z3l64x30cd5", companyId, nameAr: "صنف 5 ريال", nameEn: "صنف 5 ريال", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7dc00dmu8l2boatvnw6" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jv100d28z3lu5jlcfme" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jv100d28z3lu5jlcfme", companyId, nameAr: "فاتورة  رقم 4955 7/6", nameEn: "فاتورة  رقم 4955 7/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jv400d48z3l9lyvkcju" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jv400d48z3l9lyvkcju", companyId, nameAr: "فاتورة دار بردى 9/6", nameEn: "فاتورة دار بردى 9/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jv700d68z3l7lj8lwec" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jv700d68z3l7lj8lwec", companyId, nameAr: "فاتورة دار بردى", nameEn: "فاتورة دار بردى", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jvb00d88z3lpbnlfbny" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jvb00d88z3lpbnlfbny", companyId, nameAr: "فاتورة رقم 4985 8/6", nameEn: "فاتورة رقم 4985 8/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jvq00dn8z3lhvbpgg2d" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jvq00dn8z3lhvbpgg2d", companyId, nameAr: "بلانش", nameEn: "بلانش", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jw600dz8z3lwnzlpxy9" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jw600dz8z3lwnzlpxy9", companyId, nameAr: "سيقان دجاج", nameEn: "سيقان دجاج", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jwf00e68z3lfm0n1xkn" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jwf00e68z3lfm0n1xkn", companyId, nameAr: "لوازم صيانة", nameEn: "لوازم صيانة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jwn00ed8z3lbkxizhb5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jwn00ed8z3lbkxizhb5", companyId, nameAr: "عود مستطيل", nameEn: "عود مستطيل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jwu00ej8z3l5y2nh4qn" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jwu00ej8z3l5y2nh4qn", companyId, nameAr: "فاتورة رقم 112191", nameEn: "فاتورة رقم 112191", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jx400et8z3l3wkgzumg" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jx400et8z3l3wkgzumg", companyId, nameAr: "علب كرافت", nameEn: "علب كرافت", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jx800ev8z3lueiahpqe" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jx800ev8z3lueiahpqe", companyId, nameAr: "صحن بروستد", nameEn: "صحن بروستد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jxh00f28z3l2q7pgqqv" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jxh00f28z3l2q7pgqqv", companyId, nameAr: "منتجات الكبير", nameEn: "منتجات الكبير", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jyp00ge8z3lm6zfs7ak" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jyp00ge8z3lm6zfs7ak", companyId, nameAr: "فاتورة 10/6", nameEn: "فاتورة 10/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43jzy00hq8z3lvvfdn1i6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43jzy00hq8z3lvvfdn1i6", companyId, nameAr: "فاتورة دار بردى 11/6", nameEn: "فاتورة دار بردى 11/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k0l00ij8z3l7wo2jlig" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k0l00ij8z3l7wo2jlig", companyId, nameAr: "اصلاح كاميرا", nameEn: "اصلاح كاميرا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k0x00ir8z3lo3ukhxv2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k0x00ir8z3lo3ukhxv2", companyId, nameAr: "ادوات مكتبية", nameEn: "ادوات مكتبية", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k1500j38z3l3c45gvmg" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k1500j38z3l3c45gvmg", companyId, nameAr: "فاتورة دار بردى 12/6", nameEn: "فاتورة دار بردى 12/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k1f00jd8z3lc5ow86zx" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k1f00jd8z3lc5ow86zx", companyId, nameAr: "مياه افيفا", nameEn: "مياه افيفا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77a008gu8l2q99adh5l" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k2300k48z3lrl0m3rw4" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k2300k48z3lrl0m3rw4", companyId, nameAr: "حقيبة", nameEn: "حقيبة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k2n00ks8z3lzqsnt1cz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k2n00ks8z3lzqsnt1cz", companyId, nameAr: "فاتورة دار بلادى 13/6", nameEn: "فاتورة دار بلادى 13/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k2s00ky8z3lb6n8qkfi" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k2s00ky8z3lb6n8qkfi", companyId, nameAr: "صنف ابو خمسة", nameEn: "صنف ابو خمسة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7dc00dmu8l2boatvnw6" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k2y00l48z3ltkhvdeq5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k2y00l48z3ltkhvdeq5", companyId, nameAr: "مشتريات كارفور", nameEn: "مشتريات كارفور", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm43k3k00lq8z3llztmjoql" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqm43k3k00lq8z3llztmjoql", companyId, nameAr: "فتاتور دار بدى 14/6", nameEn: "فتاتور دار بدى 14/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4a70001123s70z66mp3" }, update: { lastPurchasePrice: 2.18 }, create: { id: "cmqm4d4a70001123s70z66mp3", companyId, nameAr: "الأرز", nameEn: "الأرز", unit: "كجم", lastPurchasePrice: 2.18 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4ab0003123s8qpbtova" }, update: { lastPurchasePrice: 11.07 }, create: { id: "cmqm4d4ab0003123s8qpbtova", companyId, nameAr: "دجاج شواية", nameEn: "دجاج شواية", unit: "كجم", lastPurchasePrice: 11.07 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4af0005123szectlbwp" }, update: { lastPurchasePrice: 5.29 }, create: { id: "cmqm4d4af0005123szectlbwp", companyId, nameAr: "لبمون", nameEn: "لبمون", unit: "كجم", lastPurchasePrice: 5.29 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4ai0007123skkq6o8sp" }, update: { lastPurchasePrice: 1.9 }, create: { id: "cmqm4d4ai0007123skkq6o8sp", companyId, nameAr: "بصل ابيض", nameEn: "بصل ابيض", unit: "كجم", lastPurchasePrice: 1.9 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4al0009123seeeutpks" }, update: { lastPurchasePrice: 3 }, create: { id: "cmqm4d4al0009123seeeutpks", companyId, nameAr: "فلفل حار", nameEn: "فلفل حار", unit: "كجم", lastPurchasePrice: 3 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4aw000j123sd6ahwbp9" }, update: { lastPurchasePrice: 0.38 }, create: { id: "cmqm4d4aw000j123sd6ahwbp9", companyId, nameAr: "دقوس", nameEn: "دقوس", unit: "كجم", lastPurchasePrice: 0.38 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4bc001b123s5vvk34ln" }, update: { lastPurchasePrice: 8 }, create: { id: "cmqm4d4bc001b123s5vvk34ln", companyId, nameAr: "بطاطا مقلية", nameEn: "بطاطا مقلية", unit: "كجم", lastPurchasePrice: 8 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4bf001d123sbnfl8j96" }, update: { lastPurchasePrice: 0.3 }, create: { id: "cmqm4d4bf001d123sbnfl8j96", companyId, nameAr: "خبز", nameEn: "خبز", unit: "كجم", lastPurchasePrice: 0.3 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4bt001x123sxs5plexj" }, update: { lastPurchasePrice: 11.04 }, create: { id: "cmqm4d4bt001x123sxs5plexj", companyId, nameAr: "دجاج فحم", nameEn: "دجاج فحم", unit: "كجم", lastPurchasePrice: 11.04 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4cf002z123sp8nzddir" }, update: { lastPurchasePrice: 16.48 }, create: { id: "cmqm4d4cf002z123sp8nzddir", companyId, nameAr: "دجاج مضغوط", nameEn: "دجاج مضغوط", unit: "كجم", lastPurchasePrice: 16.48 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4cr003g123sjyrbazm7" }, update: { lastPurchasePrice: 49.94 }, create: { id: "cmqm4d4cr003g123sjyrbazm7", companyId, nameAr: "كبسة لحم", nameEn: "كبسة لحم", unit: "كجم", lastPurchasePrice: 49.94 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4cx003q123sxez0wb6q" }, update: { lastPurchasePrice: 5.5 }, create: { id: "cmqm4d4cx003q123sxez0wb6q", companyId, nameAr: "شيش طاووق", nameEn: "شيش طاووق", unit: "كجم", lastPurchasePrice: 5.5 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4d4003y123sj0znj9vb" }, update: { lastPurchasePrice: 12.44 }, create: { id: "cmqm4d4d4003y123sj0znj9vb", companyId, nameAr: "اوصال لخم", nameEn: "اوصال لخم", unit: "كجم", lastPurchasePrice: 12.44 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4db0046123s8hw6gdz3" }, update: { lastPurchasePrice: 12.55 }, create: { id: "cmqm4d4db0046123s8hw6gdz3", companyId, nameAr: "كباب لحم", nameEn: "كباب لحم", unit: "كجم", lastPurchasePrice: 12.55 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqm4d4dj004e123srwhbaiw0" }, update: { lastPurchasePrice: 6.64 }, create: { id: "cmqm4d4dj004e123srwhbaiw0", companyId, nameAr: "كباب دجاج", nameEn: "كباب دجاج", unit: "كجم", lastPurchasePrice: 6.64 } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7rg0001z47ipuq91myk" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7rg0001z47ipuq91myk", companyId, nameAr: "فلفل احمر افتاب", nameEn: "فلفل احمر افتاب", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7s30007z47i0vz4h9qg" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7s30007z47i0vz4h9qg", companyId, nameAr: "قدر المونيوم", nameEn: "قدر المونيوم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7s50009z47i4jwijj5y" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7s50009z47i4jwijj5y", companyId, nameAr: "قفوف", nameEn: "قفوف", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7s7000bz47i3cne2e6c" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7s7000bz47i3cne2e6c", companyId, nameAr: "حامل قدور", nameEn: "حامل قدور", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7bw00cmu8l25njwgock" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7sg000rz47iruhqgbv6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7sg000rz47iruhqgbv6", companyId, nameAr: "مشروبات غازية فاتورة رقم 404137530", nameEn: "مشروبات غازية فاتورة رقم 404137530", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7sl000zz47ibnuhydxq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7sl000zz47ibnuhydxq", companyId, nameAr: "تغليف وعلب فاتورة رقم 31613", nameEn: "تغليف وعلب فاتورة رقم 31613", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7su001jz47ivw8m6pd9" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7su001jz47ivw8m6pd9", companyId, nameAr: "البان فاتورة", nameEn: "البان فاتورة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7t7002bz47i8juxcz7i" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7t7002bz47i8juxcz7i", companyId, nameAr: "فلاتر مياه", nameEn: "فلاتر مياه", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7tb002jz47i1sskyyg1" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7tb002jz47i1sskyyg1", companyId, nameAr: "دجاج 500", nameEn: "دجاج 500", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7tf002rz47iqc9ccpbq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7tf002rz47iqc9ccpbq", companyId, nameAr: "رقع", nameEn: "رقع", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7tk0031z47iri0zepb4" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7tk0031z47iri0zepb4", companyId, nameAr: "براويز", nameEn: "براويز", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7dc00dmu8l2boatvnw6" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7tm0035z47it60p5grf" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7tm0035z47it60p5grf", companyId, nameAr: "صيانة عامة", nameEn: "صيانة عامة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuo7u6004hz47icmn88tds" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuo7u6004hz47icmn88tds", companyId, nameAr: "فاتورة البان", nameEn: "فاتورة البان", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhta0007ysv1wiu4aojf" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhta0007ysv1wiu4aojf", companyId, nameAr: "حمص رقم 7", nameEn: "حمص رقم 7", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhtd0009ysv1m0w3ayq7" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhtd0009ysv1m0w3ayq7", companyId, nameAr: "فراولة مجمد", nameEn: "فراولة مجمد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhtf000bysv150ulkwsp" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhtf000bysv150ulkwsp", companyId, nameAr: "زيتون اسود", nameEn: "زيتون اسود", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhth000dysv1wksp9x58" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhth000dysv1wksp9x58", companyId, nameAr: "خميرة فورية", nameEn: "خميرة فورية", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhtr000xysv1j1r171gx" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhtr000xysv1j1r171gx", companyId, nameAr: "مستلزمات سكن للموظف محمد", nameEn: "مستلزمات سكن للموظف محمد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhtv0013ysv18wyadrt5" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhtv0013ysv18wyadrt5", companyId, nameAr: "صيانة رمان بيلي", nameEn: "صيانة رمان بيلي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7g300gru8l2m3j2pqyl" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhu00019ysv1h75sot6c" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhu00019ysv1h75sot6c", companyId, nameAr: "كوكاكولا 1 ليتر", nameEn: "كوكاكولا 1 ليتر", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77f008ku8l27rl9rh8c" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhu4001fysv1u0c4blhc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhu4001fysv1u0c4blhc", companyId, nameAr: "بنز", nameEn: "بنز", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhua001pysv1ky1v3t2f" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhua001pysv1ky1v3t2f", companyId, nameAr: "خبز  فاتوره 2/6", nameEn: "خبز  فاتوره 2/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhuc001rysv1nez01awv" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhuc001rysv1nez01awv", companyId, nameAr: "خبز شاورما فاتورة 3/6", nameEn: "خبز شاورما فاتورة 3/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhud001tysv19ng5qad1" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhud001tysv19ng5qad1", companyId, nameAr: "خبز شاورما فاتورة 4/6", nameEn: "خبز شاورما فاتورة 4/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhuf001vysv1z1mkoa1x" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhuf001vysv1z1mkoa1x", companyId, nameAr: "خبز عربي4/6", nameEn: "خبز عربي4/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhug001xysv1puqxrsjr" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhug001xysv1puqxrsjr", companyId, nameAr: "خبز شاورما 1/6", nameEn: "خبز شاورما 1/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhuh001zysv1w9dve0u2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhuh001zysv1w9dve0u2", companyId, nameAr: "خبز شاورما 3/6", nameEn: "خبز شاورما 3/6", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhun002cysv1jhz1wrw2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhun002cysv1jhz1wrw2", companyId, nameAr: "قهوة", nameEn: "قهوة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhv1002uysv1b5gfjew7" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhv1002uysv1b5gfjew7", companyId, nameAr: "اكياس ورق 7", nameEn: "اكياس ورق 7", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhv2002wysv1ijhgcknx" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhv2002wysv1ijhgcknx", companyId, nameAr: "ملح ناعم", nameEn: "ملح ناعم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhv4002yysv186jqmx3c" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhv4002yysv186jqmx3c", companyId, nameAr: "جبنة موزاريلا 3 بقرات", nameEn: "جبنة موزاريلا 3 بقرات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhva003dysv1v59eoqg1" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhva003dysv1v59eoqg1", companyId, nameAr: "مياه نوفا", nameEn: "مياه نوفا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x77a008gu8l2q99adh5l" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvc003fysv107qwue43" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvc003fysv107qwue43", companyId, nameAr: "زيت زيتون الجميل", nameEn: "زيت زيتون الجميل", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhve003hysv1o4rqwgcp" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhve003hysv1o4rqwgcp", companyId, nameAr: "ملح ليمون", nameEn: "ملح ليمون", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvf003jysv17w0b62cr" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvf003jysv17w0b62cr", companyId, nameAr: "ورق ساندويش", nameEn: "ورق ساندويش", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvh003lysv19kh2gnq6" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvh003lysv19kh2gnq6", companyId, nameAr: "حراق مكنون", nameEn: "حراق مكنون", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvo0041ysv19sbmkb7c" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvo0041ysv19sbmkb7c", companyId, nameAr: "اكياس فحم", nameEn: "اكياس فحم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7hz00j7u8l2xxndrdln" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvs0047ysv1f6frz9ae" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvs0047ysv1f6frz9ae", companyId, nameAr: "حبة البركة", nameEn: "حبة البركة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvu0049ysv1obhgw2lh" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvu0049ysv1obhgw2lh", companyId, nameAr: "جبنة سائلة", nameEn: "جبنة سائلة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvv004bysv1h6kd3t75" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvv004bysv1h6kd3t75", companyId, nameAr: "سفرة ا بي", nameEn: "سفرة ا بي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvx004dysv146ke3lkm" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvx004dysv146ke3lkm", companyId, nameAr: "فلفل ابيض مطحون", nameEn: "فلفل ابيض مطحون", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhvy004fysv1ti9gdgk3" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhvy004fysv1ti9gdgk3", companyId, nameAr: "سمسم", nameEn: "سمسم", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhwk005mysv1a7baj3gr" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhwk005mysv1a7baj3gr", companyId, nameAr: "نايلون رقم 18", nameEn: "نايلون رقم 18", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhwl005oysv10841xu49" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhwl005oysv10841xu49", companyId, nameAr: "شاي ربيع", nameEn: "شاي ربيع", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72m0043u8l27w11tihj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhwn005qysv195d1nfrf" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhwn005qysv195d1nfrf", companyId, nameAr: "تونة ارقى", nameEn: "تونة ارقى", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhwo005sysv1ygtsv5ud" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhwo005sysv1ygtsv5ud", companyId, nameAr: "زعتر اكسنرا", nameEn: "زعتر اكسنرا", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhwr005uysv1fopuguao" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhwr005uysv1fopuguao", companyId, nameAr: "فول امريكي", nameEn: "فول امريكي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhx5006pysv11ewmf985" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhx5006pysv11ewmf985", companyId, nameAr: "جبنة عكاوي", nameEn: "جبنة عكاوي", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x75x0075u8l2dcl0y4ej" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhx7006rysv1gg64vo7p" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhx7006rysv1gg64vo7p", companyId, nameAr: "بهارات شاورما", nameEn: "بهارات شاورما", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x735004fu8l2o6z0u0cj" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhxe007bysv15jvbxi5v" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhxe007bysv15jvbxi5v", companyId, nameAr: "فاتورة الحمراني تغليف 112190", nameEn: "فاتورة الحمراني تغليف 112190", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhxs007uysv1wtacpt87" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhxs007uysv1wtacpt87", companyId, nameAr: "مكسرات", nameEn: "مكسرات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhxw0080ysv1frafmqan" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhxw0080ysv1frafmqan", companyId, nameAr: "فاتورة فيرست ستيك", nameEn: "فاتورة فيرست ستيك", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhy00086ysv1fk5o17xm" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhy00086ysv1fk5o17xm", companyId, nameAr: "ارز السفير", nameEn: "ارز السفير", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhy7008mysv1v6hk9sus" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhy7008mysv1v6hk9sus", companyId, nameAr: "صيانة مواد", nameEn: "صيانة مواد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhyh0090ysv1ufy4539x" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhyh0090ysv1ufy4539x", companyId, nameAr: "سبانخ مجمد", nameEn: "سبانخ مجمد", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhyj0092ysv16bh770tc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhyj0092ysv16bh770tc", companyId, nameAr: "نقانق", nameEn: "نقانق", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhz0009wysv1wpz85xrq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhz0009wysv1wpz85xrq", companyId, nameAr: "غطاء سادة", nameEn: "غطاء سادة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73d004lu8l2uuwd9nvo" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhz700a4ysv1o8pzgtlx" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhz700a4ysv1o8pzgtlx", companyId, nameAr: "اصلاح سكن", nameEn: "اصلاح سكن", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhzk00amysv1urx2wwiq" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhzk00amysv1urx2wwiq", companyId, nameAr: "متفرقات", nameEn: "متفرقات", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhzq00awysv16xv79bc2" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhzq00awysv16xv79bc2", companyId, nameAr: "اصلاح  سيارة", nameEn: "اصلاح  سيارة", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x725003pu8l2zyxert52" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuuhzx00b6ysv149k1mi8i" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuuhzx00b6ysv149k1mi8i", companyId, nameAr: "لية", nameEn: "لية", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuui0e00bvysv1ptm3lbtg" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuui0e00bvysv1ptm3lbtg", companyId, nameAr: "فاتورة دار بردى 12//06", nameEn: "فاتورة دار بردى 12//06", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuui0l00c5ysv166md758z" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuui0l00c5ysv166md758z", companyId, nameAr: "فاتورة كارفور", nameEn: "فاتورة كارفور", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x73r004vu8l2awobpqrf" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuui0w00ckysv17zgcyivc" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuui0w00ckysv17zgcyivc", companyId, nameAr: "فاتورة دار بردى 5136", nameEn: "فاتورة دار بردى 5136", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuui1800d2ysv1a8j9vbop" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuui1800d2ysv1a8j9vbop", companyId, nameAr: "محمد عبد المنعم موظف", nameEn: "محمد عبد المنعم موظف", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x7mr00p4u8l2lp05gken" } })
  await prisma.inventoryItem.upsert({ where: { id: "cmqmuui1f00dcysv15b63tkpz" }, update: { lastPurchasePrice: 0 }, create: { id: "cmqmuui1f00dcysv15b63tkpz", companyId, nameAr: "فاتورة دار بردى 5460", nameEn: "فاتورة دار بردى 5460", unit: "unit", lastPurchasePrice: 0, categoryId: "cmqm3x72h003zu8l2podirdgy" } })

  // Purchase Invoices
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x71t0039u8l2h9kbljny" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x71t0039u8l2h9kbljny", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "5d94fb9c-f15a-4496-8", invoiceDate: new Date("2026-05-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 695.68, vatAmount: 104.32, total: 800, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x71u003bu8l264pl2blc", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x71u003cu8l2dosacpah", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x71u003du8l20k9dldd4", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x71u003eu8l222aoej33", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x71u003fu8l21mjcom1n", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x71u003gu8l2nelw6jqh", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x71u003hu8l23hhdvlbd", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x71u003iu8l248uj5l9j", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x71u003ju8l2kzdf3pe8", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x71u003ku8l2fwc4mk03", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x71u003lu8l2rdinuuhk", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x72a003tu8l2quc8dad7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x72a003tu8l2quc8dad7", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "f384a842-2033-4f0d-8", invoiceDate: new Date("2026-05-01T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 700, vatAmount: 0, total: 700, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x72a003vu8l2p06i4js0", itemId: "cmqm3x728003ru8l2qcb9unw0", quantity: 1, unitPrice: 700, vatRate: 0, vatAmount: 0, total: 700 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x74l005hu8l2u4zd9ur7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x74l005hu8l2u4zd9ur7", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "7b17ed53-15ca-4217-b", invoiceDate: new Date("2026-05-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 8118.77, vatAmount: 1217.82, total: 9336.59, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x74l005ju8l2qzxtqxo5", itemId: "cmqm3x72j0041u8l2p2x7gndc", quantity: 3, unitPrice: 50, vatRate: 15, vatAmount: 22.5, total: 172.5 },
          { id: "cmqm3x74l005ku8l2lw2xeblb", itemId: "cmqm3x72p0045u8l22g9qdtv5", quantity: 4, unitPrice: 25, vatRate: 15, vatAmount: 15, total: 115 },
          { id: "cmqm3x74l005lu8l2bnjp5pf6", itemId: "cmqm3x72s0047u8l2kjvfd299", quantity: 3, unitPrice: 46.09, vatRate: 15, vatAmount: 20.74, total: 159.01 },
          { id: "cmqm3x74l005mu8l20omx8e3f", itemId: "cmqm3x72v0049u8l2kzojaiz6", quantity: 2, unitPrice: 78.27, vatRate: 15, vatAmount: 23.48, total: 180.02 },
          { id: "cmqm3x74l005nu8l2eqo425wr", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 10, unitPrice: 52, vatRate: 15, vatAmount: 78, total: 598 },
          { id: "cmqm3x74l005ou8l2dq1gam2r", itemId: "cmqm3x732004du8l2dvinhkln", quantity: 1, unitPrice: 217.4, vatRate: 15, vatAmount: 32.61, total: 250.01 },
          { id: "cmqm3x74l005pu8l2kgq84v14", itemId: "cmqm3x738004hu8l2kvfdcp71", quantity: 1, unitPrice: 12, vatRate: 15, vatAmount: 1.8, total: 13.8 },
          { id: "cmqm3x74l005qu8l28h4rjeeq", itemId: "cmqm3x73b004ju8l2e95t8700", quantity: 1, unitPrice: 95, vatRate: 15, vatAmount: 14.25, total: 109.25 },
          { id: "cmqm3x74l005ru8l22bvkcur7", itemId: "cmqm3x73g004nu8l2qclwyb0w", quantity: 5, unitPrice: 33.05, vatRate: 15, vatAmount: 24.79, total: 190.04 },
          { id: "cmqm3x74l005su8l2h81bscnh", itemId: "cmqm3x73j004pu8l2tc90yzmt", quantity: 0.5, unitPrice: 165, vatRate: 15.01, vatAmount: 12.38, total: 94.88 },
          { id: "cmqm3x74l005tu8l2bf5avkmp", itemId: "cmqm3x73m004ru8l2qr2it4hh", quantity: 1, unitPrice: 15, vatRate: 15, vatAmount: 2.25, total: 17.25 },
          { id: "cmqm3x74l005uu8l2cua59no7", itemId: "cmqm3x73o004tu8l2j8bmb68d", quantity: 1, unitPrice: 155, vatRate: 15, vatAmount: 23.25, total: 178.25 },
          { id: "cmqm3x74l005vu8l2ozb4hbh2", itemId: "cmqm3x73t004xu8l28mc450ss", quantity: 2, unitPrice: 470, vatRate: 15, vatAmount: 141, total: 1081 },
          { id: "cmqm3x74l005wu8l2ndzded58", itemId: "cmqm3x73w004zu8l25tipfu37", quantity: 1, unitPrice: 56.53, vatRate: 15, vatAmount: 8.48, total: 65.01 },
          { id: "cmqm3x74l005xu8l28x1cju16", itemId: "cmqm3x73y0051u8l2isuonrqc", quantity: 1, unitPrice: 55, vatRate: 15, vatAmount: 8.25, total: 63.25 },
          { id: "cmqm3x74l005yu8l2ut62fbst", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 30, unitPrice: 102, vatRate: 15, vatAmount: 459, total: 3519 },
          { id: "cmqm3x74l005zu8l2pcw3mdo2", itemId: "cmqm3x7430055u8l2arnjbhjj", quantity: 4, unitPrice: 68, vatRate: 15, vatAmount: 40.8, total: 312.8 },
          { id: "cmqm3x74l0060u8l2adkjhbm5", itemId: "cmqm3x7460057u8l27n3zqtqu", quantity: 4, unitPrice: 105.22, vatRate: 15, vatAmount: 63.13, total: 484.01 },
          { id: "cmqm3x74l0061u8l2i5dwpnm1", itemId: "cmqm3x7480059u8l2qpaa5s1i", quantity: 8, unitPrice: 130, vatRate: 15, vatAmount: 156, total: 1196 },
          { id: "cmqm3x74l0062u8l25qpx7owi", itemId: "cmqm3x74c005bu8l2kjb5tg7m", quantity: 1, unitPrice: 217.4, vatRate: 15, vatAmount: 32.61, total: 250.01 },
          { id: "cmqm3x74l0063u8l2wbgnx7cu", itemId: "cmqm3x74f005du8l2gl69gjp0", quantity: 10, unitPrice: 20, vatRate: 15, vatAmount: 30, total: 230 },
          { id: "cmqm3x74l0064u8l21v7q6t1v", itemId: "cmqm3x74i005fu8l2365fb8d8", quantity: 2, unitPrice: 25, vatRate: 15, vatAmount: 7.5, total: 57.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x74w006au8l2sf63tevm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x74w006au8l2sf63tevm", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x74r0066u8l2y3fvw100", invoiceNumber: "df54d0ab-245f-42cd-a", invoiceDate: new Date("2026-05-01T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 200, vatAmount: 0, total: 200, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x74w006cu8l2t9sz0vam", itemId: "cmqm3x74u0068u8l2zw783tk5", quantity: 1, unitPrice: 200, vatRate: 0, vatAmount: 0, total: 200 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x759006ku8l2yehs2uvw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x759006ku8l2yehs2uvw", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "d41a4cb3-2b7a-48c2-8", invoiceDate: new Date("2026-05-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2565, vatAmount: 384.75, total: 2949.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x759006mu8l2bkbxyw3k", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 120, unitPrice: 13.05, vatRate: 15, vatAmount: 234.9, total: 1800.9 },
          { id: "cmqm3x759006nu8l2teuwhimc", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.65, vatRate: 15, vatAmount: 149.85, total: 1148.85 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x75l006vu8l2up5gxv33" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x75l006vu8l2up5gxv33", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "dd0d1951-b9c5-4b87-a", invoiceDate: new Date("2026-05-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1106.5, vatAmount: 165.97, total: 1272.47, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x75l006xu8l25zko3x9h", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1106.5, vatRate: 15, vatAmount: 165.97, total: 1272.47 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x75s0071u8l2vw4hviqw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x75s0071u8l2vw4hviqw", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "f6ba5a91-51b9-4e77-9", invoiceDate: new Date("2026-05-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 3168, vatAmount: 475.2, total: 3643.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x75s0073u8l2aoov7ri4", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 264, unitPrice: 12, vatRate: 15, vatAmount: 475.2, total: 3643.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x76g007ju8l2z89f6lq9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x76g007ju8l2z89f6lq9", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "49e80d9d-cea8-42cf-8", invoiceDate: new Date("2026-05-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 620.66, vatAmount: 93.1, total: 713.77, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x76g007lu8l2pxhe2aej", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 35, unitPrice: 2.3, vatRate: 14.99, vatAmount: 12.07, total: 92.58 },
          { id: "cmqm3x76g007mu8l2z3hqcumc", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
          { id: "cmqm3x76g007nu8l2rz1i67o1", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x76g007ou8l2qpsvoe5w", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 8, unitPrice: 9.1, vatRate: 15, vatAmount: 10.92, total: 83.72 },
          { id: "cmqm3x76g007pu8l2oe7dhu29", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 60, unitPrice: 1.65, vatRate: 15, vatAmount: 14.85, total: 113.85 },
          { id: "cmqm3x76g007qu8l2llk9ql8g", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 61.6, vatRate: 15, vatAmount: 9.24, total: 70.84 },
          { id: "cmqm3x76g007ru8l2w0xn7mae", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 24, unitPrice: 4.73, vatRate: 15, vatAmount: 17.03, total: 130.55 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x76p007xu8l2bmbj5pjj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x76p007xu8l2bmbj5pjj", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x76k007tu8l2ahspyra6", invoiceNumber: "441457cc-9751-402c-8", invoiceDate: new Date("2026-05-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 156.52, vatAmount: 23.48, total: 180, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x76p007zu8l2l48fiq1r", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 180, vatRate: 15, vatAmount: 23.48, total: 180 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x76t0081u8l2ubo5ognl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x76t0081u8l2ubo5ognl", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "fe5a882f-1e85-4b4d-b", invoiceDate: new Date("2026-05-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 6088.5, vatAmount: 913.27, total: 7001.78, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x76u0083u8l24udxg8su", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 390, unitPrice: 13.05, vatRate: 15, vatAmount: 763.42, total: 5852.93 },
          { id: "cmqm3x76u0084u8l2wx2b2n4a", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.65, vatRate: 15, vatAmount: 149.85, total: 1148.85 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x773008au8l2nlylnl5y" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x773008au8l2nlylnl5y", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x74r0066u8l2y3fvw100", invoiceNumber: "cdb6ff48-dde7-41e4-8", invoiceDate: new Date("2026-05-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 100, vatAmount: 15, total: 115, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x773008cu8l28hpyvh0i", itemId: "cmqm3x7710088u8l2rrlzplkq", quantity: 1, unitPrice: 115, vatRate: 15, vatAmount: 15, total: 115 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7860092u8l2szdc6iob" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7860092u8l2szdc6iob", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "dc954759-fbfe-4480-a", invoiceDate: new Date("2026-05-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 4555.64, vatAmount: 683.36, total: 5239, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7860094u8l2c36zypgz", itemId: "cmqm3x77c008iu8l2d48t8ore", quantity: 10, unitPrice: 9.75, vatRate: 15, vatAmount: 12.72, total: 97.5 },
          { id: "cmqm3x7860095u8l273r6wip6", itemId: "cmqm3x77h008mu8l2cjj3hebo", quantity: 20, unitPrice: 52.24, vatRate: 15, vatAmount: 136.28, total: 1044.8 },
          { id: "cmqm3x7860096u8l2rqfn9i5g", itemId: "cmqm3x77k008ou8l2tiwh87tk", quantity: 30, unitPrice: 15, vatRate: 15, vatAmount: 58.7, total: 450 },
          { id: "cmqm3x7860097u8l274o4zg25", itemId: "cmqm3x77n008qu8l2367e6vuc", quantity: 30, unitPrice: 44.99, vatRate: 15, vatAmount: 176.05, total: 1349.7 },
          { id: "cmqm3x7860098u8l205ovfwu3", itemId: "cmqm3x77q008su8l2kpowsbtm", quantity: 10, unitPrice: 52.24, vatRate: 15, vatAmount: 68.14, total: 522.4 },
          { id: "cmqm3x7860099u8l2n8mo5bxr", itemId: "cmqm3x77t008uu8l2qz8emya6", quantity: 5, unitPrice: 43.99, vatRate: 15, vatAmount: 28.69, total: 219.95 },
          { id: "cmqm3x786009au8l23yl96ova", itemId: "cmqm3x77w008wu8l2d8tjip1y", quantity: 20, unitPrice: 43.99, vatRate: 15, vatAmount: 114.76, total: 879.8 },
          { id: "cmqm3x786009bu8l2iwk8dtv8", itemId: "cmqm3x77z008yu8l2mx4eq2ic", quantity: 10, unitPrice: 44.99, vatRate: 15, vatAmount: 58.68, total: 449.9 },
          { id: "cmqm3x786009cu8l2f3kr5al6", itemId: "cmqm3x7820090u8l2ve72mhlm", quantity: 5, unitPrice: 44.99, vatRate: 15, vatAmount: 29.34, total: 224.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x78j009ku8l2aeukqtwe" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x78j009ku8l2aeukqtwe", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "ea5fe3d1-55fc-4adf-b", invoiceDate: new Date("2026-05-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 597, vatAmount: 89.55, total: 686.55, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x78j009mu8l23r3a8pf8", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 20, unitPrice: 11.75, vatRate: 15, vatAmount: 35.25, total: 270.25 },
          { id: "cmqm3x78j009nu8l2rny3v102", itemId: "cmqm3x78d009gu8l2jkdl9786", quantity: 20, unitPrice: 13.1, vatRate: 15, vatAmount: 39.3, total: 301.3 },
          { id: "cmqm3x78j009ou8l24xbqr7hm", itemId: "cmqm3x78g009iu8l2a5l6u2jq", quantity: 10, unitPrice: 10, vatRate: 15, vatAmount: 15, total: 115 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x78m009qu8l2bhla1pnv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x78m009qu8l2bhla1pnv", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "fc2de8ee-eb8f-4924-a", invoiceDate: new Date("2026-05-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1261, vatAmount: 189.15, total: 1450.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x78m009su8l2w3tpgsnp", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1261, vatRate: 15, vatAmount: 189.15, total: 1450.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x78r009uu8l2wdhcfdy3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x78r009uu8l2wdhcfdy3", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "2f324490-7f54-4217-a", invoiceDate: new Date("2026-05-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 333, vatAmount: 49.95, total: 382.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x78r009wu8l2lh5wpz11", itemId: "cmqm3x78g009iu8l2a5l6u2jq", quantity: 36, unitPrice: 9.25, vatRate: 15, vatAmount: 49.95, total: 382.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x79400a0u8l2i5cih50t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x79400a0u8l2i5cih50t", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "67826275-f204-455d-a", invoiceDate: new Date("2026-05-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 562.94, vatAmount: 84.44, total: 647.38, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x79400a2u8l2t0bk68e3", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 61.6, vatRate: 15, vatAmount: 18.48, total: 141.68 },
          { id: "cmqm3x79400a3u8l2t94s7i5v", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 16, unitPrice: 4.73, vatRate: 15, vatAmount: 11.35, total: 87.03 },
          { id: "cmqm3x79400a4u8l285x4b1bv", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x79400a5u8l2vdq8o6lh", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
          { id: "cmqm3x79500a6u8l2hl36d0ff", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 60, unitPrice: 1.65, vatRate: 15, vatAmount: 14.85, total: 113.85 },
          { id: "cmqm3x79500a7u8l2ncr49cnm", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x79j00abu8l2dpo1fhda" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x79j00abu8l2dpo1fhda", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "138b1882-90fd-4ab4-b", invoiceDate: new Date("2026-05-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 864.5, vatAmount: 129.67, total: 994.17, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x79j00adu8l2sckwg0td", itemId: "cmqm3x79h00a9u8l200zp4jcc", quantity: 70, unitPrice: 12.35, vatRate: 15, vatAmount: 129.67, total: 994.17 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x79t00aju8l2amx62el1" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x79t00aju8l2amx62el1", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x79o00afu8l2tvhcu3vi", invoiceNumber: "b87c682a-eed9-4db0-b", invoiceDate: new Date("2026-05-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 148, vatAmount: 22.2, total: 170.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x79u00alu8l21ese0n1b", itemId: "cmqm3x79r00ahu8l2x6iiilho", quantity: 4, unitPrice: 37, vatRate: 15, vatAmount: 22.2, total: 170.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x79x00anu8l222q3hn78" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x79x00anu8l222q3hn78", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "3c1aa016-54bd-499e-8", invoiceDate: new Date("2026-05-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1440, vatAmount: 216, total: 1656, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x79x00apu8l2dt5gv9cp", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 120, unitPrice: 12, vatRate: 15, vatAmount: 216, total: 1656 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7a000aru8l2pnf658a3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7a000aru8l2pnf658a3", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "5355b0dc-7ab9-4be6-b", invoiceDate: new Date("2026-05-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4914, vatAmount: 737.1, total: 5651.1, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7a000atu8l2lbc47e77", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 13.05, vatRate: 15, vatAmount: 587.25, total: 4502.25 },
          { id: "cmqm3x7a000auu8l23g98iwds", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.65, vatRate: 15, vatAmount: 149.85, total: 1148.85 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ag00b4u8l2so8eo8ot" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ag00b4u8l2so8eo8ot", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7a600awu8l2y2lnyem8", invoiceNumber: "0b4734bd-ed93-446e-8", invoiceDate: new Date("2026-05-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 808.7, vatAmount: 121.3, total: 930, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ag00b6u8l2p2vdztc8", itemId: "cmqm3x7a800ayu8l2tnqrqys6", quantity: 20, unitPrice: 35, vatRate: 15, vatAmount: 91.3, total: 700 },
          { id: "cmqm3x7ag00b7u8l2s57bdw7a", itemId: "cmqm3x7ab00b0u8l2tkt8eh34", quantity: 5, unitPrice: 28, vatRate: 15, vatAmount: 18.26, total: 140 },
          { id: "cmqm3x7ag00b8u8l2w8y5n52m", itemId: "cmqm3x7ad00b2u8l2e0zg8dm2", quantity: 5, unitPrice: 18, vatRate: 15, vatAmount: 11.74, total: 90 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ak00bau8l29shbkaro" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ak00bau8l29shbkaro", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "b93f2682-c9ec-4057-a", invoiceDate: new Date("2026-05-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4108.5, vatAmount: 616.27, total: 4724.77, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ak00bcu8l2huh6j31m", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 13.05, vatRate: 15, vatAmount: 391.5, total: 3001.5 },
          { id: "cmqm3x7ak00bdu8l2croqyhhs", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.65, vatRate: 15, vatAmount: 224.77, total: 1723.27 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7an00bfu8l2bj5fxnh4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7an00bfu8l2bj5fxnh4", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "713dfe6d-3bce-4bf1-8", invoiceDate: new Date("2026-05-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1567, vatAmount: 235.05, total: 1802.05, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7an00bhu8l2ql4yu9t7", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1567, vatRate: 15, vatAmount: 235.05, total: 1802.05 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7aw00bnu8l2307cersn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7aw00bnu8l2307cersn", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "873ec971-f278-4886-a", invoiceDate: new Date("2026-05-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1359, vatAmount: 203.85, total: 1562.85, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7aw00bpu8l2bpmm8zvo", itemId: "cmqm3x7au00blu8l2eii4g041", quantity: 45, unitPrice: 30.2, vatRate: 15, vatAmount: 203.85, total: 1562.85 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7b000bru8l2zgccxguq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7b000bru8l2zgccxguq", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "f854649a-d2eb-4fcb-b", invoiceDate: new Date("2026-05-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2390, vatAmount: 358.5, total: 2748.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7b000btu8l2j152fvx1", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 11.95, vatRate: 15, vatAmount: 358.5, total: 2748.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7b500bxu8l26nju415c" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7b500bxu8l26nju415c", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7b300bvu8l2njiuwnps", invoiceNumber: "b69da0af-2215-4aab-9", invoiceDate: new Date("2026-05-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1766.06, vatAmount: 264.91, total: 2030.97, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7b600bzu8l2x2jjf931", itemId: "cmqm3x77z008yu8l2mx4eq2ic", quantity: 21, unitPrice: 38.26, vatRate: 15, vatAmount: 120.52, total: 923.98 },
          { id: "cmqm3x7b600c0u8l28n9srrg7", itemId: "cmqm3x77n008qu8l2367e6vuc", quantity: 20, unitPrice: 48.13, vatRate: 15, vatAmount: 144.39, total: 1106.99 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7bf00c6u8l2m1zig6sg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7bf00c6u8l2m1zig6sg", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "3d133d90-94f7-49d9-8", invoiceDate: new Date("2026-05-05T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 1700, vatAmount: 0, total: 1700, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7bf00c8u8l2h7ru2cxk", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 1, unitPrice: 1700, vatRate: 0, vatAmount: 0, total: 1700 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7bi00cau8l2z7qj8co6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7bi00cau8l2z7qj8co6", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "7e7dc2a5-a16c-41e9-a", invoiceDate: new Date("2026-05-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2400, vatAmount: 360, total: 2760, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7bi00ccu8l25jzh4zsa", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 12, vatRate: 15, vatAmount: 360, total: 2760 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7e900e4u8l2vbbtztdi" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7e900e4u8l2vbbtztdi", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x79o00afu8l2tvhcu3vi", invoiceNumber: "7134b89d-f606-44fd-a", invoiceDate: new Date("2026-05-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 8753, vatAmount: 1312.95, total: 10065.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ea00e6u8l27fza6cat", itemId: "cmqm3x7bo00cgu8l276kt0ere", quantity: 1, unitPrice: 95, vatRate: 15, vatAmount: 14.25, total: 109.25 },
          { id: "cmqm3x7ea00e7u8l2w8mq6fwq", itemId: "cmqm3x7br00ciu8l26rh4n2bw", quantity: 1, unitPrice: 55, vatRate: 15, vatAmount: 8.25, total: 63.25 },
          { id: "cmqm3x7ea00e8u8l2h2aw5pc0", itemId: "cmqm3x7bu00cku8l29d67ocqy", quantity: 5, unitPrice: 65, vatRate: 15, vatAmount: 48.75, total: 373.75 },
          { id: "cmqm3x7ea00e9u8l28fw9ez0h", itemId: "cmqm3x7bz00cou8l2lz3bzsd8", quantity: 1, unitPrice: 75, vatRate: 15, vatAmount: 11.25, total: 86.25 },
          { id: "cmqm3x7ea00eau8l2fr33fsn6", itemId: "cmqm3x7c300cqu8l20d8gvtuy", quantity: 5, unitPrice: 195, vatRate: 15, vatAmount: 146.25, total: 1121.25 },
          { id: "cmqm3x7ea00ebu8l2baevkepx", itemId: "cmqm3x7c600csu8l2ylmxoy5f", quantity: 4, unitPrice: 72, vatRate: 15, vatAmount: 43.2, total: 331.2 },
          { id: "cmqm3x7ea00ecu8l2d4nc4k0n", itemId: "cmqm3x7c900cuu8l2a6vqiph8", quantity: 5, unitPrice: 90, vatRate: 15, vatAmount: 67.5, total: 517.5 },
          { id: "cmqm3x7ea00edu8l2rnz2hcyf", itemId: "cmqm3x7cb00cwu8l2gxkqeqc8", quantity: 2, unitPrice: 110, vatRate: 15, vatAmount: 33, total: 253 },
          { id: "cmqm3x7ea00eeu8l21pyr66l2", itemId: "cmqm3x7ce00cyu8l2jfb0wv6e", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 7.5, total: 57.5 },
          { id: "cmqm3x7ea00efu8l2yxzrxenj", itemId: "cmqm3x7ci00d0u8l22sx0rkg6", quantity: 2, unitPrice: 60, vatRate: 15, vatAmount: 18, total: 138 },
          { id: "cmqm3x7ea00egu8l20vbtfl2n", itemId: "cmqm3x7ck00d2u8l2dubucu5q", quantity: 10, unitPrice: 150, vatRate: 15, vatAmount: 225, total: 1725 },
          { id: "cmqm3x7ea00ehu8l2grj6e593", itemId: "cmqm3x7cn00d4u8l2yam7rtf4", quantity: 4, unitPrice: 22, vatRate: 15, vatAmount: 13.2, total: 101.2 },
          { id: "cmqm3x7ea00eiu8l2l5lf06n8", itemId: "cmqm3x7cq00d6u8l2p0vyo1af", quantity: 2, unitPrice: 90, vatRate: 15, vatAmount: 27, total: 207 },
          { id: "cmqm3x7ea00eju8l2srcwv7wi", itemId: "cmqm3x7ct00d8u8l23v66kxuo", quantity: 2, unitPrice: 85, vatRate: 15, vatAmount: 25.5, total: 195.5 },
          { id: "cmqm3x7ea00eku8l29wuq8ob0", itemId: "cmqm3x7cw00dau8l2d0fr7a87", quantity: 3, unitPrice: 26, vatRate: 15, vatAmount: 11.7, total: 89.7 },
          { id: "cmqm3x7ea00elu8l2z56fy2ro", itemId: "cmqm3x7cy00dcu8l2msxki9aa", quantity: 1, unitPrice: 57, vatRate: 15, vatAmount: 8.55, total: 65.55 },
          { id: "cmqm3x7ea00emu8l2m5dcul54", itemId: "cmqm3x7d100deu8l2ikp46g9z", quantity: 1, unitPrice: 140, vatRate: 15, vatAmount: 21, total: 161 },
          { id: "cmqm3x7ea00enu8l2xpax7i06", itemId: "cmqm3x7d400dgu8l2hbucxhhs", quantity: 1, unitPrice: 44, vatRate: 15, vatAmount: 6.6, total: 50.6 },
          { id: "cmqm3x7ea00eou8l2mghuplvh", itemId: "cmqm3x7d600diu8l2ys1qxu4b", quantity: 2, unitPrice: 225, vatRate: 15, vatAmount: 67.5, total: 517.5 },
          { id: "cmqm3x7ea00epu8l24jk5veml", itemId: "cmqm3x7d900dku8l2n0ysxatf", quantity: 1, unitPrice: 33, vatRate: 15, vatAmount: 4.95, total: 37.95 },
          { id: "cmqm3x7ea00equ8l2r325urcw", itemId: "cmqm3x7dm00dou8l261gmt4vh", quantity: 1, unitPrice: 75, vatRate: 15, vatAmount: 11.25, total: 86.25 },
          { id: "cmqm3x7ea00eru8l2w4g6i16s", itemId: "cmqm3x7dp00dqu8l2et86wequ", quantity: 1, unitPrice: 125, vatRate: 15, vatAmount: 18.75, total: 143.75 },
          { id: "cmqm3x7ea00esu8l2lvhahshb", itemId: "cmqm3x7ds00dsu8l2vuh1b6qz", quantity: 1, unitPrice: 83, vatRate: 15, vatAmount: 12.45, total: 95.45 },
          { id: "cmqm3x7ea00etu8l2xdehpvbq", itemId: "cmqm3x7dv00duu8l2zsazk8fy", quantity: 1, unitPrice: 205, vatRate: 15, vatAmount: 30.75, total: 235.75 },
          { id: "cmqm3x7ea00euu8l231a654p0", itemId: "cmqm3x7dy00dwu8l2c374n8k5", quantity: 1, unitPrice: 83, vatRate: 15, vatAmount: 12.45, total: 95.45 },
          { id: "cmqm3x7ea00evu8l29geuxjwc", itemId: "cmqm3x7e100dyu8l2gksqrgyz", quantity: 8, unitPrice: 240, vatRate: 15, vatAmount: 288, total: 2208 },
          { id: "cmqm3x7ea00ewu8l2mu9de6n5", itemId: "cmqm3x7e300e0u8l2id3y8e3p", quantity: 8, unitPrice: 30, vatRate: 15, vatAmount: 36, total: 276 },
          { id: "cmqm3x7ea00exu8l24uohf01b", itemId: "cmqm3x7dy00dwu8l2c374n8k5", quantity: 3, unitPrice: 83, vatRate: 15, vatAmount: 37.35, total: 286.35 },
          { id: "cmqm3x7ea00eyu8l2lh7qz4pp", itemId: "cmqm3x7e600e2u8l2vafryfbr", quantity: 10, unitPrice: 38, vatRate: 15, vatAmount: 57, total: 437 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7eo00f4u8l2zerooufe" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7eo00f4u8l2zerooufe", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ej00f0u8l2xc3s1dkc", invoiceNumber: "8b2e042e-fc5e-49a9-a", invoiceDate: new Date("2026-05-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 11087, vatAmount: 1663.05, total: 12750.05, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7eo00f6u8l2qufi4dnk", itemId: "cmqm3x7em00f2u8l2qkj95mfe", quantity: 50, unitPrice: 221.74, vatRate: 15, vatAmount: 1663.05, total: 12750.05 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7er00f8u8l2cv4y9d05" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7er00f8u8l2cv4y9d05", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "b25229ca-fb6a-46a3-a", invoiceDate: new Date("2026-05-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2151, vatAmount: 322.65, total: 2473.65, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7er00fau8l2gefmajew", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 180, unitPrice: 11.95, vatRate: 15, vatAmount: 322.65, total: 2473.65 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ew00fcu8l2bcin01rl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ew00fcu8l2bcin01rl", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "cb0db701-5251-4e7b-b", invoiceDate: new Date("2026-05-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 254.56, vatAmount: 38.18, total: 292.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ew00feu8l2ttgkg056", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 35, unitPrice: 2.3, vatRate: 14.99, vatAmount: 12.07, total: 92.58 },
          { id: "cmqm3x7ew00ffu8l2pflk8e6o", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
          { id: "cmqm3x7ew00fgu8l2kbstksob", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ez00fiu8l2mcznv6m9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ez00fiu8l2mcznv6m9", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "c0587b35-eefc-43d2-a", invoiceDate: new Date("2026-05-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4302, vatAmount: 645.3, total: 4947.3, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ez00fku8l25aysuw21", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm3x7ez00flu8l2ivk95oiy", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 180, unitPrice: 16.65, vatRate: 15, vatAmount: 449.55, total: 3446.55 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7f500fpu8l22p11zau2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7f500fpu8l22p11zau2", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x74r0066u8l2y3fvw100", invoiceNumber: "c46fcdd0-644c-46c8-b", invoiceDate: new Date("2026-05-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 48.7, vatAmount: 7.3, total: 56.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7f500fru8l2y3bq6tvw", itemId: "cmqm3x7f300fnu8l2ut4ti1ep", quantity: 1, unitPrice: 48.7, vatRate: 14.99, vatAmount: 7.3, total: 56.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7f800ftu8l2jlimsuu0" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7f800ftu8l2jlimsuu0", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "3677e810-df5e-4dca-8", invoiceDate: new Date("2026-05-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2304, vatAmount: 345.6, total: 2649.6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7f800fvu8l2d84th3pl", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 192, unitPrice: 12, vatRate: 15, vatAmount: 345.6, total: 2649.6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7fb00fxu8l2ituadwue" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7fb00fxu8l2ituadwue", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "0eb18996-b4c9-4f15-8", invoiceDate: new Date("2026-05-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4108.5, vatAmount: 616.27, total: 4724.77, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7fb00fzu8l2aqpj959i", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.65, vatRate: 15, vatAmount: 224.77, total: 1723.27 },
          { id: "cmqm3x7fb00g0u8l2tlc7y9fx", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 13.05, vatRate: 15, vatAmount: 391.5, total: 3001.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7fk00g6u8l2laademxj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7fk00g6u8l2laademxj", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ff00g2u8l24yfu9l09", invoiceNumber: "3d5e2cb4-1269-48c0-a", invoiceDate: new Date("2026-05-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 516, vatAmount: 77.4, total: 593.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7fk00g8u8l27qeew4bi", itemId: "cmqm3x7fi00g4u8l2mmi8yq7f", quantity: 6, unitPrice: 86, vatRate: 15, vatAmount: 77.4, total: 593.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7fp00gau8l2xuu4w7yt" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7fp00gau8l2xuu4w7yt", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x76k007tu8l2ahspyra6", invoiceNumber: "5d69e6f2-fd15-4f9a-b", invoiceDate: new Date("2026-05-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 165.22, vatAmount: 24.78, total: 190, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7fp00gcu8l2w0ud9e6i", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 190, vatRate: 15, vatAmount: 24.78, total: 190 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ft00geu8l2hleg9pr9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ft00geu8l2hleg9pr9", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "65193880-b2d2-4b8e-9", invoiceDate: new Date("2026-05-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1495, vatAmount: 224.25, total: 1719.25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ft00ggu8l2wbkhh7bg", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1495, vatRate: 15, vatAmount: 224.25, total: 1719.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7fw00giu8l2vg0rlrzg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7fw00giu8l2vg0rlrzg", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "4b868817-4551-4b2a-9", invoiceDate: new Date("2026-05-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2081.04, vatAmount: 312.16, total: 2393.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7fw00gku8l25siwplo5", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 174, unitPrice: 11.96, vatRate: 15, vatAmount: 312.16, total: 2393.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7fz00gmu8l23qayh1v2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7fz00gmu8l23qayh1v2", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "a99591f5-b6dd-44a3-9", invoiceDate: new Date("2026-05-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 5260.5, vatAmount: 789.08, total: 6049.58, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7fz00gou8l27wl3lyhc", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 250, unitPrice: 13.05, vatRate: 15, vatAmount: 489.38, total: 3751.88 },
          { id: "cmqm3x7fz00gpu8l2p3m1akxn", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 120, unitPrice: 16.65, vatRate: 15, vatAmount: 299.7, total: 2297.7 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7g700gvu8l2pare29ja" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7g700gvu8l2pare29ja", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x74r0066u8l2y3fvw100", invoiceNumber: "2717e59a-d3dc-4a6c-8", invoiceDate: new Date("2026-05-08T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7g700gxu8l2jjiucrdz", itemId: "cmqm3x7g600gtu8l2t3sdebkt", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ga00gzu8l2nh937haf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ga00gzu8l2nh937haf", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "77a24a3e-2bad-4546-b", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 695.68, vatAmount: 104.32, total: 800, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ga00h1u8l2nlieiviz", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7ga00h2u8l2rwj9h284", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7ga00h3u8l2islgrnig", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7ga00h4u8l2kdfjbzw9", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7ga00h5u8l201pmu7ed", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7ga00h6u8l2vwuhjyac", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7ga00h7u8l2xwh6ult0", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7ga00h8u8l2yncry9r0", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7ga00h9u8l2edepwhc7", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7ga00hau8l2uucpbopi", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7ga00hbu8l2lktnhc0q", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7gh00hfu8l2c4y60ss4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7gh00hfu8l2c4y60ss4", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "c1984790-a45f-4802-a", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 108.7, vatAmount: 16.3, total: 125, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7gi00hhu8l2wuonoqta", itemId: "cmqm3x7gg00hdu8l2zl8l59bc", quantity: 1, unitPrice: 108.7, vatRate: 15, vatAmount: 16.3, total: 125 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7gn00hlu8l2lsq17gi2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7gn00hlu8l2lsq17gi2", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "b071a460-cf96-40f1-9", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 900, vatAmount: 0, total: 900, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7gn00hnu8l2ukla4roc", itemId: "cmqm3x7gl00hju8l20k540cpa", quantity: 1, unitPrice: 900, vatRate: 0, vatAmount: 0, total: 900 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7gq00hpu8l2736luomm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7gq00hpu8l2736luomm", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "1d7e4133-8daa-4c83-a", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1636.61, vatAmount: 245.49, total: 1882.1, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7gq00hru8l2sob46uhf", itemId: "cmqm3x77w008wu8l2d8tjip1y", quantity: 10, unitPrice: 43.99, vatRate: 15, vatAmount: 57.38, total: 439.9 },
          { id: "cmqm3x7gq00hsu8l2ihmif08e", itemId: "cmqm3x77n008qu8l2367e6vuc", quantity: 20, unitPrice: 45.99, vatRate: 15, vatAmount: 119.97, total: 919.8 },
          { id: "cmqm3x7gq00htu8l21aqe5gi2", itemId: "cmqm3x77h008mu8l2cjj3hebo", quantity: 10, unitPrice: 52.24, vatRate: 15, vatAmount: 68.14, total: 522.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7gt00hvu8l2dj3362sh" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7gt00hvu8l2dj3362sh", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "1d5ea371-5b49-4059-9", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1794, vatAmount: 269.1, total: 2063.1, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7gt00hxu8l2v55hbfw5", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 150, unitPrice: 11.96, vatRate: 15, vatAmount: 269.1, total: 2063.1 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7gy00i1u8l2ny3na8ad" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7gy00i1u8l2ny3na8ad", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "b3704372-7fdb-48e2-8", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 264.28, vatAmount: 39.64, total: 303.92, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7gy00i3u8l2i5rafp5v", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x7gy00i4u8l2elt0c2o6", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 60, unitPrice: 1.65, vatRate: 15, vatAmount: 14.85, total: 113.85 },
          { id: "cmqm3x7gy00i5u8l2jq48vopa", itemId: "cmqm3x7gw00hzu8l2rt52bsql", quantity: 6, unitPrice: 12.38, vatRate: 15, vatAmount: 11.14, total: 85.42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7h200i7u8l27pahk4gv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7h200i7u8l27pahk4gv", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "d6e2db68-4d36-4aa1-a", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2997, vatAmount: 449.55, total: 3446.55, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7h200i9u8l21ezvvwul", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 180, unitPrice: 16.65, vatRate: 15, vatAmount: 449.55, total: 3446.55 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7h500ibu8l2zkow5wve" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7h500ibu8l2zkow5wve", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "fa559871-c841-465c-b", invoiceDate: new Date("2026-05-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1326.5, vatAmount: 198.97, total: 1525.47, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7h500idu8l2yf2u99pz", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1326.5, vatRate: 15, vatAmount: 198.97, total: 1525.47 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ha00ihu8l2wvmgmk9c" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ha00ihu8l2wvmgmk9c", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "6e07cd05-dde1-42ed-a", invoiceDate: new Date("2026-05-10T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 260, vatAmount: 0, total: 260, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ha00iju8l24hxmvltj", itemId: "cmqm3x7h800ifu8l2fs6bv3g9", quantity: 1, unitPrice: 260, vatRate: 0, vatAmount: 0, total: 260 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7hd00ilu8l29o6t37to" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7hd00ilu8l29o6t37to", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "495892b9-361c-4d32-8", invoiceDate: new Date("2026-05-10T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 1700, vatAmount: 0, total: 1700, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7hd00inu8l285ponncf", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 1, unitPrice: 1700, vatRate: 0, vatAmount: 0, total: 1700 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7hl00itu8l2oq0yqyrv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7hl00itu8l2oq0yqyrv", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "9a59e8cc-6239-4c6b-9", invoiceDate: new Date("2026-05-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 589.13, vatAmount: 88.37, total: 677.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7hl00ivu8l2b3h8mtux", itemId: "cmqm3x7hj00iru8l2zuth0chz", quantity: 50, unitPrice: 13.55, vatRate: 15, vatAmount: 88.37, total: 677.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ho00ixu8l20fw8nqhv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ho00ixu8l20fw8nqhv", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x76k007tu8l2ahspyra6", invoiceNumber: "7523f254-98bb-4f2c-9", invoiceDate: new Date("2026-05-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 130.43, vatAmount: 19.57, total: 150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ho00izu8l2ewqwda71", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 150, vatRate: 15, vatAmount: 19.57, total: 150 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ht00j1u8l2zq6uurut" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ht00j1u8l2zq6uurut", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "35ecbff7-3261-41a7-9", invoiceDate: new Date("2026-05-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3600, vatAmount: 540, total: 4140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ht00j3u8l2tyjb01mq", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 12, vatRate: 15, vatAmount: 540, total: 4140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7i300jbu8l2gs18umka" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7i300jbu8l2gs18umka", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7hw00j5u8l2kc4np869", invoiceNumber: "f1e94e1f-da36-42f4-b", invoiceDate: new Date("2026-05-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1521.74, vatAmount: 228.26, total: 1750, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7i300jdu8l29zfbv1fk", itemId: "cmqm3x7i100j9u8l2j49eh3kr", quantity: 50, unitPrice: 35, vatRate: 15, vatAmount: 228.26, total: 1750 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7i700jfu8l2ag6k8zbd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7i700jfu8l2ag6k8zbd", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "ef736ed2-3621-42c0-8", invoiceDate: new Date("2026-05-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1452, vatAmount: 217.8, total: 1669.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7i700jhu8l2dmlyigp4", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1452, vatRate: 15, vatAmount: 217.8, total: 1669.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7i900jju8l26dd1c9mr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7i900jju8l26dd1c9mr", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "792c1632-b0ec-492c-b", invoiceDate: new Date("2026-05-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2505.5, vatAmount: 375.83, total: 2881.33, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7i900jlu8l28g9yd60u", itemId: "cmqm3x78g009iu8l2a5l6u2jq", quantity: 50, unitPrice: 10.15, vatRate: 15, vatAmount: 76.13, total: 583.63 },
          { id: "cmqm3x7i900jmu8l23l34eo7p", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 120, unitPrice: 16.65, vatRate: 15, vatAmount: 299.7, total: 2297.7 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7id00jou8l2leakqmml" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7id00jou8l2leakqmml", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "1cd11c0a-2919-4c1c-9", invoiceDate: new Date("2026-05-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 421.24, vatAmount: 63.18, total: 484.43, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7id00jqu8l2bdoya18w", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 16, unitPrice: 4.73, vatRate: 15, vatAmount: 11.35, total: 87.03 },
          { id: "cmqm3x7id00jru8l2owxpijon", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x7id00jsu8l29hhtyew0", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 35, unitPrice: 2.3, vatRate: 14.99, vatAmount: 12.07, total: 92.58 },
          { id: "cmqm3x7id00jtu8l2g2skbxln", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
          { id: "cmqm3x7id00juu8l23uprofwe", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ik00jyu8l2gewusxfb" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ik00jyu8l2gewusxfb", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "f5a8567b-425c-411c-8", invoiceDate: new Date("2026-05-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 7763.22, vatAmount: 1164.48, total: 8927.7, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ik00k0u8l2vi18kjud", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 18, unitPrice: 14.19, vatRate: 15, vatAmount: 38.31, total: 293.73 },
          { id: "cmqm3x7ik00k1u8l2u0e921z9", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.38, vatRate: 15, vatAmount: 147.42, total: 1130.22 },
          { id: "cmqm3x7ik00k2u8l24kvur1cz", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 500, unitPrice: 13.05, vatRate: 15, vatAmount: 978.75, total: 7503.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7in00k4u8l2yj5gxtel" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7in00k4u8l2yj5gxtel", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "250d7bdd-32c3-487e-8", invoiceDate: new Date("2026-05-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3600, vatAmount: 540, total: 4140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7io00k6u8l2v7ajwii1", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 12, vatRate: 15, vatAmount: 540, total: 4140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7iq00k8u8l2z7a7sf8r" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7iq00k8u8l2z7a7sf8r", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "a372ff36-0c0f-4ddd-a", invoiceDate: new Date("2026-05-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 386.04, vatAmount: 57.9, total: 443.94, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7iq00kau8l2z6evd2sk", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 108, unitPrice: 1.42, vatRate: 15, vatAmount: 23, total: 176.36 },
          { id: "cmqm3x7iq00kbu8l2dgqofbdo", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 61.6, vatRate: 15, vatAmount: 9.24, total: 70.84 },
          { id: "cmqm3x7iq00kcu8l2x2aib6kw", itemId: "cmqm3x7gw00hzu8l2rt52bsql", quantity: 6, unitPrice: 12.38, vatRate: 15, vatAmount: 11.14, total: 85.42 },
          { id: "cmqm3x7iq00kdu8l2yd93r62l", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 10, unitPrice: 4.73, vatRate: 15.01, vatAmount: 7.1, total: 54.4 },
          { id: "cmqm3x7iq00keu8l2eoc4zy4p", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 30, unitPrice: 1.65, vatRate: 14.99, vatAmount: 7.42, total: 56.92 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7iz00kku8l2cuxuj6n7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7iz00kku8l2cuxuj6n7", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x74r0066u8l2y3fvw100", invoiceNumber: "7b556960-0330-47c6-b", invoiceDate: new Date("2026-05-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 3.75, total: 28.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7iz00kmu8l2jtpv0y3b", itemId: "cmqm3x7ix00kiu8l2pghdiuts", quantity: 5, unitPrice: 5, vatRate: 15, vatAmount: 3.75, total: 28.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7jc00kuu8l2xftp869x" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7jc00kuu8l2xftp869x", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7j300kou8l24l31p1g8", invoiceNumber: "acab767c-33d5-46ff-9", invoiceDate: new Date("2026-05-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 143.5, vatAmount: 21.53, total: 165.03, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7jc00kwu8l2oj6kjp52", itemId: "cmqm3x7j600kqu8l2ritzrqte", quantity: 1, unitPrice: 113.05, vatRate: 15, vatAmount: 16.96, total: 130.01 },
          { id: "cmqm3x7jc00kxu8l2jwb0opbj", itemId: "cmqm3x7ja00ksu8l26e0c0q48", quantity: 5, unitPrice: 6.09, vatRate: 15.01, vatAmount: 4.57, total: 35.02 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7jf00kzu8l2g952p0x8" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7jf00kzu8l2g952p0x8", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "ba9a7e32-46a1-47b8-b", invoiceDate: new Date("2026-05-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1240.5, vatAmount: 186.07, total: 1426.58, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7jf00l1u8l2ro91vn3j", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1240.5, vatRate: 15, vatAmount: 186.07, total: 1426.58 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ji00l3u8l2m4n6u4gv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ji00l3u8l2m4n6u4gv", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "a1ef22f7-07e5-4059-8", invoiceDate: new Date("2026-05-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2136, vatAmount: 320.4, total: 2456.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ji00l5u8l25g1uene3", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 178, unitPrice: 12, vatRate: 15, vatAmount: 320.4, total: 2456.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7jk00l7u8l2ieom6c3y" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7jk00l7u8l2ieom6c3y", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "eaa31d38-a8f5-43ec-8", invoiceDate: new Date("2026-05-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2820.06, vatAmount: 423.01, total: 3243.07, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7jl00l9u8l2w1xeenu1", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 190, unitPrice: 13.05, vatRate: 15, vatAmount: 371.93, total: 2851.43 },
          { id: "cmqm3x7jl00lau8l2c3gqq9a3", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 24, unitPrice: 14.19, vatRate: 15, vatAmount: 51.08, total: 391.64 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7jn00lcu8l2pebhm095" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7jn00lcu8l2pebhm095", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "ab94309e-0d70-4242-a", invoiceDate: new Date("2026-05-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 6080.4, vatAmount: 912.06, total: 6992.46, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7jn00leu8l2q3dromhw", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 180, unitPrice: 16.38, vatRate: 15, vatAmount: 442.26, total: 3390.66 },
          { id: "cmqm3x7jn00lfu8l2hjh2nl8s", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 240, unitPrice: 13.05, vatRate: 15, vatAmount: 469.8, total: 3601.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7jr00lhu8l2cu1rojbk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7jr00lhu8l2cu1rojbk", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x76k007tu8l2ahspyra6", invoiceNumber: "2625c186-05ff-43f3-8", invoiceDate: new Date("2026-05-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 156.52, vatAmount: 23.48, total: 180, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7jr00lju8l2hqba3wig", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 180, vatRate: 15, vatAmount: 23.48, total: 180 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ju00llu8l27w950ftw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ju00llu8l27w950ftw", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "deb22c60-97c8-4283-b", invoiceDate: new Date("2026-05-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1356.5, vatAmount: 203.47, total: 1559.97, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7jv00lnu8l2roe20ymp", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1356.5, vatRate: 15, vatAmount: 203.47, total: 1559.97 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7jy00lpu8l2wv64kddn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7jy00lpu8l2wv64kddn", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "74d3cfcd-7299-4fd3-b", invoiceDate: new Date("2026-05-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2392, vatAmount: 358.8, total: 2750.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7jy00lru8l289v221gb", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 11.96, vatRate: 15, vatAmount: 358.8, total: 2750.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7k300lvu8l25epdgt5u" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7k300lvu8l25epdgt5u", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "a327b582-a16a-46df-8", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4190.4, vatAmount: 628.56, total: 4818.96, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7k300lxu8l289r8llhs", itemId: "cmqm3x7k100ltu8l2veomgm9w", quantity: 523.8, unitPrice: 8, vatRate: 15, vatAmount: 628.56, total: 4818.96 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7k600lzu8l2sd5i1l7t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7k600lzu8l2sd5i1l7t", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "f3cd7f23-df59-4c7b-9", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1052.48, vatAmount: 157.87, total: 1210.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7k600m1u8l2mqz60kkb", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 88, unitPrice: 11.96, vatRate: 15, vatAmount: 157.87, total: 1210.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7k900m3u8l2q89ecp6p" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7k900m3u8l2q89ecp6p", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "02683e02-8e9d-4425-8", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2424, vatAmount: 363.6, total: 2787.6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7k900m5u8l2rg46kzpi", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 202, unitPrice: 12, vatRate: 15, vatAmount: 363.6, total: 2787.6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7kc00m7u8l2j9dubqwl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7kc00m7u8l2j9dubqwl", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "35204b8a-6968-4ddb-9", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 7269.4, vatAmount: 1090.41, total: 8359.81, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7kc00m9u8l20tv72jnm", itemId: "cmqm3x78g009iu8l2a5l6u2jq", quantity: 40, unitPrice: 10.15, vatRate: 15, vatAmount: 60.9, total: 466.9 },
          { id: "cmqm3x7kc00mau8l2enr0plv9", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 13.05, vatRate: 15, vatAmount: 587.25, total: 4502.25 },
          { id: "cmqm3x7kc00mbu8l28j5oishv", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 180, unitPrice: 16.38, vatRate: 15, vatAmount: 442.26, total: 3390.66 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7kf00mdu8l2wnahvx49" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7kf00mdu8l2wnahvx49", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "d88e4211-c141-428d-9", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 451.66, vatAmount: 67.74, total: 519.41, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7kf00mfu8l294jy26vp", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 35, unitPrice: 2.3, vatRate: 14.99, vatAmount: 12.07, total: 92.58 },
          { id: "cmqm3x7kf00mgu8l2dy0p2k27", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x7kf00mhu8l2pe6e5751", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
          { id: "cmqm3x7kf00miu8l2w2qnwq9c", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 61.6, vatRate: 15, vatAmount: 18.48, total: 141.68 },
          { id: "cmqm3x7kf00mju8l2qgzwwchc", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 18, unitPrice: 4.73, vatRate: 15, vatAmount: 12.77, total: 97.91 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7li00nbu8l2tsenwvbh" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7li00nbu8l2tsenwvbh", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "ade33040-feec-48e2-9", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 7403.5, vatAmount: 1110.52, total: 8514.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7li00ndu8l2yvtvqenx", itemId: "cmqm3x7kk00mlu8l29yjih1ak", quantity: 2, unitPrice: 67, vatRate: 15, vatAmount: 20.1, total: 154.1 },
          { id: "cmqm3x7li00neu8l2ecqkrstv", itemId: "cmqm3x7kn00mnu8l29cgfa3gm", quantity: 2, unitPrice: 50, vatRate: 15, vatAmount: 15, total: 115 },
          { id: "cmqm3x7li00nfu8l2hgdkqyzl", itemId: "cmqm3x7kq00mpu8l2rpvkye76", quantity: 1, unitPrice: 210, vatRate: 15, vatAmount: 31.5, total: 241.5 },
          { id: "cmqm3x7li00ngu8l2yxqxrjhc", itemId: "cmqm3x7ks00mru8l2z30kpetw", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqm3x7li00nhu8l209cykmwc", itemId: "cmqm3x7kv00mtu8l2jdvyjw4j", quantity: 0.5, unitPrice: 400, vatRate: 15, vatAmount: 30, total: 230 },
          { id: "cmqm3x7li00niu8l2cxoinnu8", itemId: "cmqm3x72p0045u8l22g9qdtv5", quantity: 3, unitPrice: 100, vatRate: 15, vatAmount: 45, total: 345 },
          { id: "cmqm3x7li00nju8l2zikman2z", itemId: "cmqm3x7kx00mvu8l262fsm2q7", quantity: 8, unitPrice: 130, vatRate: 15, vatAmount: 156, total: 1196 },
          { id: "cmqm3x7li00nku8l27fbhtfmu", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 10, unitPrice: 52, vatRate: 15, vatAmount: 78, total: 598 },
          { id: "cmqm3x7li00nlu8l2n121plry", itemId: "cmqm3x7l000mxu8l2n34s3lny", quantity: 2, unitPrice: 25, vatRate: 15, vatAmount: 7.5, total: 57.5 },
          { id: "cmqm3x7li00nmu8l2u6os38v3", itemId: "cmqm3x7l200mzu8l2b0tt8i7p", quantity: 3, unitPrice: 35, vatRate: 15, vatAmount: 15.75, total: 120.75 },
          { id: "cmqm3x7li00nnu8l20wse4lfm", itemId: "cmqm3x7460057u8l27n3zqtqu", quantity: 4, unitPrice: 105.22, vatRate: 15, vatAmount: 63.13, total: 484.01 },
          { id: "cmqm3x7li00nou8l28caha80m", itemId: "cmqm3x7l500n1u8l2lq0by91w", quantity: 2, unitPrice: 107, vatRate: 15, vatAmount: 32.1, total: 246.1 },
          { id: "cmqm3x7li00npu8l2d0jpor8b", itemId: "cmqm3x7l800n3u8l2bhmcd473", quantity: 1, unitPrice: 215, vatRate: 15, vatAmount: 32.25, total: 247.25 },
          { id: "cmqm3x7li00nqu8l24vunt3kq", itemId: "cmqm3x7lb00n5u8l26o6iec7i", quantity: 1, unitPrice: 126.09, vatRate: 15, vatAmount: 18.91, total: 145 },
          { id: "cmqm3x7li00nru8l2yyuesat9", itemId: "cmqm3x7ld00n7u8l2q5n5x0yc", quantity: 1, unitPrice: 55, vatRate: 15, vatAmount: 8.25, total: 63.25 },
          { id: "cmqm3x7li00nsu8l2ya54obot", itemId: "cmqm3x73t004xu8l28mc450ss", quantity: 1, unitPrice: 460, vatRate: 15, vatAmount: 69, total: 529 },
          { id: "cmqm3x7li00ntu8l29uuj82ze", itemId: "cmqm3x73w004zu8l25tipfu37", quantity: 1, unitPrice: 56.53, vatRate: 15, vatAmount: 8.48, total: 65.01 },
          { id: "cmqm3x7li00nuu8l22w4tetbz", itemId: "cmqm3x7lg00n9u8l21h3ybhwm", quantity: 2, unitPrice: 45, vatRate: 15, vatAmount: 13.5, total: 103.5 },
          { id: "cmqm3x7li00nvu8l29ga5dq2x", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 30, unitPrice: 102, vatRate: 15, vatAmount: 459, total: 3519 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7lo00nxu8l2ko5jbnv5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7lo00nxu8l2ko5jbnv5", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "247cf92b-0c60-4b88-a", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 5150, vatAmount: 0, total: 5150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7lo00nzu8l2zo3bpf1q", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 1, unitPrice: 1750, vatRate: 0, vatAmount: 0, total: 1750 },
          { id: "cmqm3x7lo00o0u8l2ffh33cvh", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 1, unitPrice: 1750, vatRate: 0, vatAmount: 0, total: 1750 },
          { id: "cmqm3x7lo00o1u8l2bwh56yfh", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 1, unitPrice: 1650, vatRate: 0, vatAmount: 0, total: 1650 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7lu00o5u8l2xqg9grdg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7lu00o5u8l2xqg9grdg", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "9e8d1ce8-a2b8-4974-9", invoiceDate: new Date("2026-05-16T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1956.52, vatAmount: 293.48, total: 2250, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7lu00o7u8l296jv2php", itemId: "cmqm3x7lt00o3u8l2ehgqeg6h", quantity: 15, unitPrice: 150, vatRate: 15, vatAmount: 293.48, total: 2250 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ly00o9u8l248zy16at" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ly00o9u8l248zy16at", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "83d7a9e2-9f2b-4e04-a", invoiceDate: new Date("2026-05-17T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3600, vatAmount: 540, total: 4140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ly00obu8l2tv4vzc6x", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 12, vatRate: 15, vatAmount: 540, total: 4140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7m500ofu8l2conojkrg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7m500ofu8l2conojkrg", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "7d000534-e0da-4124-8", invoiceDate: new Date("2026-05-17T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 130.74, vatAmount: 19.61, total: 150.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7m500ohu8l2eu9vqtle", itemId: "cmqm3x7m300odu8l28uytqz33", quantity: 1, unitPrice: 150.35, vatRate: 15, vatAmount: 19.61, total: 150.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7m700oju8l2o7hdr56j" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7m700oju8l2o7hdr56j", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "667d1540-3f01-4bc7-8", invoiceDate: new Date("2026-05-17T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1436, vatAmount: 215.4, total: 1651.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7m800olu8l2ggmsnw97", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1436, vatRate: 15, vatAmount: 215.4, total: 1651.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7mj00otu8l2jv1ddh3d" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7mj00otu8l2jv1ddh3d", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "33282b5b-6de4-41b7-8", invoiceDate: new Date("2026-05-17T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 537.5, vatAmount: 80.63, total: 618.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7mj00ovu8l2n9yiv8uj", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 0.5, unitPrice: 155, vatRate: 15.01, vatAmount: 11.63, total: 89.13 },
          { id: "cmqm3x7mj00owu8l26slaa53j", itemId: "cmqm3x7me00opu8l27q3vzozc", quantity: 1, unitPrice: 220, vatRate: 15, vatAmount: 33, total: 253 },
          { id: "cmqm3x7mj00oxu8l2o0czb5vb", itemId: "cmqm3x7mh00oru8l2d803xbek", quantity: 1, unitPrice: 240, vatRate: 15, vatAmount: 36, total: 276 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7mm00ozu8l23oks4tgg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7mm00ozu8l23oks4tgg", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "0be6fd1d-bb76-4b12-b", invoiceDate: new Date("2026-05-17T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 201.24, vatAmount: 30.19, total: 231.43, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7mm00p1u8l2k7mbipko", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 60, unitPrice: 1.65, vatRate: 15, vatAmount: 14.85, total: 113.85 },
          { id: "cmqm3x7mm00p2u8l2dbc6hw12", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7mz00pau8l20g9aet89" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7mz00pau8l20g9aet89", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "ccec01a1-db05-4a08-9", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 117.4, vatAmount: 17.61, total: 135.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7mz00pcu8l2e9zopxn6", itemId: "cmqm3x7mu00p6u8l2k4883xdz", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 15, total: 115 },
          { id: "cmqm3x7mz00pdu8l2ai5d929a", itemId: "cmqm3x7mx00p8u8l2hwodpfq6", quantity: 1, unitPrice: 17.4, vatRate: 15, vatAmount: 2.61, total: 20.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7n300pfu8l2rpd0nl50" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7n300pfu8l2rpd0nl50", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7a600awu8l2y2lnyem8", invoiceNumber: "a5ab963f-ff69-442b-9", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 443.48, vatAmount: 66.52, total: 510, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7n300phu8l2blrk2csk", itemId: "cmqm3x7a800ayu8l2tnqrqys6", quantity: 15, unitPrice: 34, vatRate: 15, vatAmount: 66.52, total: 510 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7n600pju8l2gpa7jb9m" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7n600pju8l2gpa7jb9m", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "fbf2bfc3-c190-4c9d-b", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3600, vatAmount: 540, total: 4140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7n700plu8l2lf17q8mi", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 12, vatRate: 15, vatAmount: 540, total: 4140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7nd00ppu8l2bfpygo0t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7nd00ppu8l2bfpygo0t", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7na00pnu8l25z4jy8de", invoiceNumber: "75c62498-e7d1-4060-9", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 516, vatAmount: 77.4, total: 593.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7nd00pru8l2zslj3b8r", itemId: "cmqm3x7fi00g4u8l2mmi8yq7f", quantity: 6, unitPrice: 86, vatRate: 15, vatAmount: 77.4, total: 593.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ng00ptu8l2sbkzvb6e" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ng00ptu8l2sbkzvb6e", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "45bd5b26-5b10-441f-a", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3592.8, vatAmount: 538.92, total: 4131.72, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ng00pvu8l2g2k5hdln", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 13.05, vatRate: 15, vatAmount: 391.5, total: 3001.5 },
          { id: "cmqm3x7ng00pwu8l2slz9eldx", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.38, vatRate: 15, vatAmount: 147.42, total: 1130.22 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7no00q0u8l2jba9evht" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7no00q0u8l2jba9evht", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "94c53e4c-dccf-4ea1-a", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 130.5, vatAmount: 19.57, total: 150.07, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7no00q2u8l2jgkqx2jc", itemId: "cmqm3x7nk00pyu8l2581lhtsf", quantity: 15, unitPrice: 8.7, vatRate: 15, vatAmount: 19.57, total: 150.07 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7nx00q8u8l2o0nue6pu" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7nx00q8u8l2o0nue6pu", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "6578fe3f-f1fb-4ce6-9", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 1250, vatAmount: 0, total: 1250, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7nx00qau8l2k5cub8jq", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 1200, vatRate: 0, vatAmount: 0, total: 1200 },
          { id: "cmqm3x7nx00qbu8l2cnx6q3gp", itemId: "cmqm3x7nv00q6u8l2wxjvqt7c", quantity: 1, unitPrice: 50, vatRate: 0, vatAmount: 0, total: 50 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7o100qdu8l2mnoxga1p" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7o100qdu8l2mnoxga1p", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x76k007tu8l2ahspyra6", invoiceNumber: "3b0adf2d-4e25-439b-b", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 121.74, vatAmount: 18.26, total: 140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7o100qfu8l28x7s5rp3", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 140, vatRate: 15, vatAmount: 18.26, total: 140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7o400qhu8l2py6gyz4r" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7o400qhu8l2py6gyz4r", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "b415c532-6314-4c92-b", invoiceDate: new Date("2026-05-18T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 1650, vatAmount: 0, total: 1650, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7o400qju8l287q2silh", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 1, unitPrice: 1650, vatRate: 0, vatAmount: 0, total: 1650 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7o800qlu8l2s1qyu1ep" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7o800qlu8l2s1qyu1ep", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "78b456ce-8180-4d3a-9", invoiceDate: new Date("2026-05-19T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2391.3, vatAmount: 358.69, total: 2750, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7o800qnu8l2x7ai8uv7", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 30, unitPrice: 14.19, vatRate: 15, vatAmount: 63.85, total: 489.56 },
          { id: "cmqm3x7o800qou8l2bpo1mbov", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 120, unitPrice: 16.38, vatRate: 15, vatAmount: 294.84, total: 2260.44 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7oc00qqu8l2kljanihr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7oc00qqu8l2kljanihr", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "d8b396d5-c289-4142-9", invoiceDate: new Date("2026-05-19T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3600, vatAmount: 540, total: 4140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7oc00qsu8l2ehyg3ds1", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 12, vatRate: 15, vatAmount: 540, total: 4140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7og00quu8l2wo3wj8op" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7og00quu8l2wo3wj8op", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "88cb327d-3439-48d0-a", invoiceDate: new Date("2026-05-19T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 162.82, vatAmount: 24.42, total: 187.24, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7og00qwu8l2zphfjo6a", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x7og00qxu8l2l3galqz4", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ol00qzu8l29k1p6use" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ol00qzu8l29k1p6use", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "70b475df-f195-454c-9", invoiceDate: new Date("2026-05-20T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3600, vatAmount: 540, total: 4140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ol00r1u8l285lx3q1q", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 12, vatRate: 15, vatAmount: 540, total: 4140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7op00r3u8l28ua3954z" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7op00r3u8l28ua3954z", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "5f8f343d-4d55-40a2-b", invoiceDate: new Date("2026-05-20T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1899.9, vatAmount: 284.98, total: 2184.89, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7op00r5u8l296bgvcaz", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
          { id: "cmqm3x7op00r6u8l2pbbhng04", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 30, unitPrice: 14.19, vatRate: 15, vatAmount: 63.85, total: 489.56 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ot00r8u8l27nzv2qbq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ot00r8u8l27nzv2qbq", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "de0cac4f-3d48-4789-9", invoiceDate: new Date("2026-05-20T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 22600, vatAmount: 3390, total: 25990, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ot00rau8l2t116ej3p", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 2000, unitPrice: 11.3, vatRate: 15, vatAmount: 3390, total: 25990 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ow00rcu8l2jrc8bwr7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ow00rcu8l2jrc8bwr7", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ej00f0u8l2xc3s1dkc", invoiceNumber: "90a7b026-7694-433f-a", invoiceDate: new Date("2026-05-20T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 11087, vatAmount: 1663.05, total: 12750.05, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ow00reu8l2b4nx60o0", itemId: "cmqm3x7em00f2u8l2qkj95mfe", quantity: 50, unitPrice: 221.74, vatRate: 15, vatAmount: 1663.05, total: 12750.05 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7p000rgu8l2ulypgblo" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7p000rgu8l2ulypgblo", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "540ca8bc-75f1-4be6-a", invoiceDate: new Date("2026-05-21T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 667.09, vatAmount: 100.06, total: 767.16, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7p000riu8l22229n8om", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 61.6, vatRate: 15, vatAmount: 18.48, total: 141.68 },
          { id: "cmqm3x7p000rju8l2sa5a082v", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 35, unitPrice: 2.3, vatRate: 14.99, vatAmount: 12.07, total: 92.58 },
          { id: "cmqm3x7p000rku8l2x1k54hix", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
          { id: "cmqm3x7p000rlu8l201n8606d", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 21, unitPrice: 4.73, vatRate: 15, vatAmount: 14.9, total: 114.23 },
          { id: "cmqm3x7p000rmu8l2przg1f8y", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 60, unitPrice: 1.65, vatRate: 15, vatAmount: 14.85, total: 113.85 },
          { id: "cmqm3x7p000rnu8l2jj0hahwp", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
          { id: "cmqm3x7p000rou8l22r8919ge", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7p400rqu8l260w6v58d" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7p400rqu8l260w6v58d", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "08c1b421-5c82-44d2-a", invoiceDate: new Date("2026-05-21T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1899.9, vatAmount: 284.98, total: 2184.89, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7p400rsu8l2en5usqtf", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 30, unitPrice: 14.19, vatRate: 15, vatAmount: 63.85, total: 489.56 },
          { id: "cmqm3x7p400rtu8l254qzekt1", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7p800rvu8l2qd6p2t3d" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7p800rvu8l2qd6p2t3d", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "8eb3e260-57b6-454d-8", invoiceDate: new Date("2026-05-21T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1597.5, vatAmount: 239.63, total: 1837.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7p800rxu8l23sgi63sf", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1597.5, vatRate: 15, vatAmount: 239.63, total: 1837.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7pg00s1u8l2ibg4mevv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7pg00s1u8l2ibg4mevv", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "a4da8789-0b98-4014-a", invoiceDate: new Date("2026-05-21T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 13.04, vatAmount: 1.96, total: 15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7pg00s3u8l26wn06z16", itemId: "cmqm3x7pe00rzu8l20vra43zc", quantity: 1, unitPrice: 15, vatRate: 15.03, vatAmount: 1.96, total: 15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7pn00s7u8l2i5x4c14g" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7pn00s7u8l2i5x4c14g", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x79o00afu8l2tvhcu3vi", invoiceNumber: "8c7f6e5f-23d8-4477-b", invoiceDate: new Date("2026-05-21T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3006, vatAmount: 450.9, total: 3456.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7pn00s9u8l2abdridy9", itemId: "cmqm3x7pl00s5u8l28w4axdfg", quantity: 1, unitPrice: 3006, vatRate: 15, vatAmount: 450.9, total: 3456.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7pu00sdu8l2ral2p4hv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7pu00sdu8l2ral2p4hv", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "09d2efd4-da0b-4eee-a", invoiceDate: new Date("2026-05-21T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 100, vatAmount: 0, total: 100, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7pu00sfu8l2fwmx5gvy", itemId: "cmqm3x7ps00sbu8l2o50g707k", quantity: 1, unitPrice: 100, vatRate: 0, vatAmount: 0, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7q000sju8l28fnz8flk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7q000sju8l28fnz8flk", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "2386ba54-aad6-403e-9", invoiceDate: new Date("2026-05-22T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 600, vatAmount: 0, total: 600, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7q000slu8l22adbxajm", itemId: "cmqm3x7py00shu8l2ys59bb78", quantity: 1, unitPrice: 600, vatRate: 0, vatAmount: 0, total: 600 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7q500snu8l2iblqnyb9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7q500snu8l2iblqnyb9", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "7f097542-d22f-4e7e-9", invoiceDate: new Date("2026-05-22T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 27.82, vatAmount: 4.17, total: 31.99, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7q500spu8l2ow6qr7li", itemId: "cmqm3x7ix00kiu8l2pghdiuts", quantity: 2, unitPrice: 13.91, vatRate: 14.99, vatAmount: 4.17, total: 31.99 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7q800sru8l27oo49btd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7q800sru8l27oo49btd", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "d03651f9-eef9-4bcf-b", invoiceDate: new Date("2026-05-22T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1899.9, vatAmount: 284.98, total: 2184.89, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7q800stu8l2nnypa6rt", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
          { id: "cmqm3x7q800suu8l2pv50zvs1", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 30, unitPrice: 14.19, vatRate: 15, vatAmount: 63.85, total: 489.56 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7qc00swu8l29xn8fn15" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7qc00swu8l29xn8fn15", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "ea0e2573-03e9-481d-a", invoiceDate: new Date("2026-05-23T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 478.28, vatAmount: 71.72, total: 550, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7qc00syu8l2bwjim3p0", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7qc00szu8l21detim6m", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7qc00t0u8l26lcgzh7h", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7qc00t1u8l2e77koot0", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7qc00t2u8l22ddbg17e", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7qc00t3u8l2ad95t8ss", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7qc00t4u8l2zxop5zke", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7qc00t5u8l2hetq2qa7", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7qk00t9u8l2p08o9s6g" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7qk00t9u8l2p08o9s6g", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "940c13ab-6788-4338-8", invoiceDate: new Date("2026-05-23T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3040.08, vatAmount: 456.01, total: 3496.09, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7qk00tbu8l2s86pqwh8", itemId: "cmqm3x7qh00t7u8l2l8tlzgke", quantity: 6, unitPrice: 15.28, vatRate: 15, vatAmount: 13.75, total: 105.43 },
          { id: "cmqm3x7qk00tcu8l25ku0vnwh", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 180, unitPrice: 16.38, vatRate: 15, vatAmount: 442.26, total: 3390.66 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7qn00teu8l2g7cxzw2u" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7qn00teu8l2g7cxzw2u", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "3a1bc039-57ce-4dc0-8", invoiceDate: new Date("2026-05-23T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 316.16, vatAmount: 47.42, total: 363.59, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7qn00tgu8l2rr8c295w", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 35, unitPrice: 2.3, vatRate: 14.99, vatAmount: 12.07, total: 92.58 },
          { id: "cmqm3x7qn00thu8l2ycf3jeqi", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
          { id: "cmqm3x7qn00tiu8l2una2ho5f", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
          { id: "cmqm3x7qn00tju8l219usr2sj", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 61.6, vatRate: 15, vatAmount: 9.24, total: 70.84 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7qs00tlu8l26n2xzzsb" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7qs00tlu8l26n2xzzsb", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "4b543834-7ae4-4b80-b", invoiceDate: new Date("2026-05-23T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1304.5, vatAmount: 195.67, total: 1500.17, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7qs00tnu8l2brkyx94q", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1304.5, vatRate: 15, vatAmount: 195.67, total: 1500.17 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7qv00tpu8l2a5fbc94v" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7qv00tpu8l2a5fbc94v", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x76k007tu8l2ahspyra6", invoiceNumber: "6d387df0-4594-4f6d-a", invoiceDate: new Date("2026-05-23T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 434.78, vatAmount: 65.22, total: 500, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7qv00tru8l2obhjae1e", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 250, vatRate: 15, vatAmount: 32.61, total: 250 },
          { id: "cmqm3x7qv00tsu8l2jio3iv6x", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 250, vatRate: 15, vatAmount: 32.61, total: 250 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7qy00tuu8l2bixuco97" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7qy00tuu8l2bixuco97", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7hw00j5u8l2kc4np869", invoiceNumber: "ea4884dc-64e8-4a7d-9", invoiceDate: new Date("2026-05-24T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1521.74, vatAmount: 228.26, total: 1750, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7qy00twu8l2ibyne6wm", itemId: "cmqm3x7i100j9u8l2j49eh3kr", quantity: 50, unitPrice: 35, vatRate: 15, vatAmount: 228.26, total: 1750 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7r700u2u8l2fsybp2jf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7r700u2u8l2fsybp2jf", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7r200tyu8l22arw1rzb", invoiceNumber: "7e4ad8ff-73ab-4968-9", invoiceDate: new Date("2026-05-24T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 90, vatAmount: 13.5, total: 103.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7r700u4u8l2jmv6z1b3", itemId: "cmqm3x7r500u0u8l2jsuzoyly", quantity: 1, unitPrice: 90, vatRate: 15, vatAmount: 13.5, total: 103.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7ra00u6u8l20e9xe1qh" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7ra00u6u8l20e9xe1qh", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "5b2f4fb3-3f93-41d1-9", invoiceDate: new Date("2026-05-24T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2610.5, vatAmount: 391.57, total: 3002.07, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7ra00u8u8l28xi3dmo1", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 230, unitPrice: 11.35, vatRate: 15, vatAmount: 391.57, total: 3002.07 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7rc00uau8l2ut9jap8e" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7rc00uau8l2ut9jap8e", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "2e0a77e8-880b-4e73-9", invoiceDate: new Date("2026-05-24T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 8701, vatAmount: 1305.15, total: 10006.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7rc00ucu8l205anfvfo", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 770, unitPrice: 11.3, vatRate: 15, vatAmount: 1305.15, total: 10006.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7rg00ueu8l2r7qyt8ow" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7rg00ueu8l2r7qyt8ow", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "f1a62e46-78a6-48cc-b", invoiceDate: new Date("2026-05-25T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 245.32, vatAmount: 36.8, total: 282.12, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7rg00ugu8l2nzkg6e8b", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x7rg00uhu8l2r7paksic", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 60, unitPrice: 1.65, vatRate: 15, vatAmount: 14.85, total: 113.85 },
          { id: "cmqm3x7rg00uiu8l28bdfmrmr", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 4, unitPrice: 4.73, vatRate: 15.01, vatAmount: 2.84, total: 21.76 },
          { id: "cmqm3x7rg00uju8l24r9webg9", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 4, unitPrice: 9.1, vatRate: 15, vatAmount: 5.46, total: 41.86 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7rk00ulu8l2jjcuihqr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7rk00ulu8l2jjcuihqr", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "c4f186c6-31e9-4710-a", invoiceDate: new Date("2026-05-25T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 982.8, vatAmount: 147.42, total: 1130.22, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7rk00unu8l23qx5dd5d", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.38, vatRate: 15, vatAmount: 147.42, total: 1130.22 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7rn00upu8l2mnjqq7ux" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7rn00upu8l2mnjqq7ux", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ff00g2u8l24yfu9l09", invoiceNumber: "17c0ed3b-70f6-4c41-9", invoiceDate: new Date("2026-05-25T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 516, vatAmount: 77.4, total: 593.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7rn00uru8l2cifw0o68", itemId: "cmqm3x7fi00g4u8l2mmi8yq7f", quantity: 6, unitPrice: 86, vatRate: 15, vatAmount: 77.4, total: 593.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7rq00utu8l23szi83pz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7rq00utu8l23szi83pz", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "895ffbb5-83ca-44f0-8", invoiceDate: new Date("2026-05-25T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1950, vatAmount: 292.5, total: 2242.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7rq00uvu8l23xniel1g", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1950, vatRate: 15, vatAmount: 292.5, total: 2242.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7rt00uxu8l2649s2qgm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7rt00uxu8l2649s2qgm", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "3cb38963-4612-4587-a", invoiceDate: new Date("2026-05-25T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 783, vatAmount: 117.45, total: 900.45, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7rt00uzu8l2lifuavq8", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 60, unitPrice: 13.05, vatRate: 15, vatAmount: 117.45, total: 900.45 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7rx00v1u8l2z3tzf4fg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7rx00v1u8l2z3tzf4fg", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "558ca4d1-f692-4773-a", invoiceDate: new Date("2026-05-26T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 601.42, vatAmount: 90.21, total: 691.64, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7rx00v3u8l2ruum9k4g", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 35, unitPrice: 2.3, vatRate: 14.99, vatAmount: 12.07, total: 92.58 },
          { id: "cmqm3x7rx00v4u8l2blhjrj4y", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x7rx00v5u8l27hcwn3l9", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 61.6, vatRate: 15, vatAmount: 18.48, total: 141.68 },
          { id: "cmqm3x7rx00v6u8l232xsjk2m", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 216, unitPrice: 1.42, vatRate: 15, vatAmount: 46.01, total: 352.73 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7s000v8u8l2qphsq8ge" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7s000v8u8l2qphsq8ge", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "32f4b5bf-869d-471f-b", invoiceDate: new Date("2026-05-26T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 786.24, vatAmount: 117.94, total: 904.18, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7s000vau8l2shcomjmd", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 48, unitPrice: 16.38, vatRate: 15, vatAmount: 117.94, total: 904.18 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7s400vcu8l2pky7m15w" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7s400vcu8l2pky7m15w", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "b7b2c642-1341-40c2-9", invoiceDate: new Date("2026-05-28T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 304.36, vatAmount: 45.64, total: 350, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7s400veu8l2vv597exy", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7s400vfu8l2qtc2v8v6", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7s400vgu8l26he2zioj", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqm3x7s400vhu8l259wdh7eg", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm3x7s400viu8l2r2kf0ynu", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 6.52, total: 50 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7s700vku8l2pb40mmms" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7s700vku8l2pb40mmms", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "211ad549-2c97-4ad8-b", invoiceDate: new Date("2026-05-28T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 3300, vatAmount: 0, total: 3300, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7s700vmu8l2ydvg7244", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 2, unitPrice: 1650, vatRate: 0, vatAmount: 0, total: 3300 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7sa00vou8l2n1sl8vqk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7sa00vou8l2n1sl8vqk", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "799aa8f0-ee57-4d69-a", invoiceDate: new Date("2026-05-29T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3531.6, vatAmount: 529.74, total: 4061.34, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7sa00vqu8l2skijsl2g", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 120, unitPrice: 16.38, vatRate: 15, vatAmount: 294.84, total: 2260.44 },
          { id: "cmqm3x7sa00vru8l2mut7goe4", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 120, unitPrice: 13.05, vatRate: 15, vatAmount: 234.9, total: 1800.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7sg00vvu8l2qxqcz3ma" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7sg00vvu8l2qxqcz3ma", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "2aa5c98e-d555-4e08-a", invoiceDate: new Date("2026-05-29T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 20, vatAmount: 0, total: 20, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7sg00vxu8l2bytfg7ec", itemId: "cmqm3x7se00vtu8l23ji6rgda", quantity: 1, unitPrice: 20, vatRate: 0, vatAmount: 0, total: 20 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7sj00vzu8l2dfz4gbtl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7sj00vzu8l2dfz4gbtl", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "44d8e222-c820-4418-8", invoiceDate: new Date("2026-05-30T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 487.59, vatAmount: 73.14, total: 560.73, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7sj00w1u8l2s9r7n8bl", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 21, unitPrice: 4.73, vatRate: 15, vatAmount: 14.9, total: 114.23 },
          { id: "cmqm3x7sj00w2u8l23m41r056", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 61.6, vatRate: 15, vatAmount: 18.48, total: 141.68 },
          { id: "cmqm3x7sj00w3u8l2atxrfbvn", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
          { id: "cmqm3x7sj00w4u8l2z54ng35n", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
          { id: "cmqm3x7sj00w5u8l2xj7tpxsc", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7sn00w7u8l2z7q05ub7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7sn00w7u8l2z7q05ub7", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "5f1bc9ae-ec5e-4faf-a", invoiceDate: new Date("2026-05-30T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3204.6, vatAmount: 480.69, total: 3685.29, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7sn00w9u8l2s8ye2jck", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm3x7sn00wau8l26gk2p4m1", itemId: "cmqm3x7qh00t7u8l2l8tlzgke", quantity: 60, unitPrice: 15.28, vatRate: 15, vatAmount: 137.52, total: 1054.32 },
          { id: "cmqm3x7sn00wbu8l21m8d1ip4", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.38, vatRate: 15, vatAmount: 147.42, total: 1130.22 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm3x7sr00wdu8l26bdnt79m" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm3x7sr00wdu8l26bdnt79m", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "e2ed0a24-9fc3-4ca9-9", invoiceDate: new Date("2026-05-31T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 200, vatAmount: 0, total: 200, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm3x7sr00wfu8l2hj01m0rf", itemId: "cmqm3x74u0068u8l2zw783tk5", quantity: 1, unitPrice: 200, vatRate: 0, vatAmount: 0, total: 200 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jj700278z3l1k58zm4z" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jj700278z3l1k58zm4z", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "d6c3a72f-a277-429e-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 930.75, vatAmount: 139.61, total: 1070.36, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jj700298z3lremyc65u", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm43jj7002a8z3lsy4is6p0", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 148, vatRate: 15, vatAmount: 22.2, total: 170.2 },
          { id: "cmqm43jj7002b8z3l3w5p69mm", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm43jj7002c8z3lyy2kvzls", itemId: "cmqm43jiz00218z3lykvljd23", quantity: 1, unitPrice: 52, vatRate: 15, vatAmount: 7.8, total: 59.8 },
          { id: "cmqm43jj7002d8z3lyfdcp0ol", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 137, vatRate: 15, vatAmount: 20.55, total: 157.55 },
          { id: "cmqm43jj7002e8z3ljx21qrug", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jjq002m8z3lhyf2wdpx" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jjq002m8z3lhyf2wdpx", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "8583f280-1482-4d6f-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 652, vatAmount: 97.8, total: 749.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jjq002o8z3l1dd7tvsa", itemId: "cmqm43jjg002g8z3lnjh23uil", quantity: 1, unitPrice: 285, vatRate: 15, vatAmount: 42.75, total: 327.75 },
          { id: "cmqm43jjq002p8z3l3k041zgm", itemId: "cmqm43jjk002i8z3lx12amkgh", quantity: 1, unitPrice: 242, vatRate: 15, vatAmount: 36.3, total: 278.3 },
          { id: "cmqm43jjq002q8z3lie36nv45", itemId: "cmqm43jjn002k8z3l7cdom0xo", quantity: 1, unitPrice: 125, vatRate: 15, vatAmount: 18.75, total: 143.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jjw002s8z3l03i8fpch" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jjw002s8z3l03i8fpch", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "e11e2798-fd21-42e3-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jjw002u8z3lgozl4v9s", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jk4002w8z3lrtl89370" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jk4002w8z3lrtl89370", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "8b02d8ac-4489-4ebf-9", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2091.24, vatAmount: 313.69, total: 2404.93, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jk5002y8z3lss8ublml", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 48, unitPrice: 16.38, vatRate: 15, vatAmount: 117.94, total: 904.18 },
          { id: "cmqm43jk5002z8z3ljj2t99sx", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jkf00358z3l6v7s67q7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jkf00358z3l6v7s67q7", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "1dd69913-c2cf-4106-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 16.83, vatAmount: 2.52, total: 19.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jkf00378z3lae8puq6e", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.35, vatRate: 14.97, vatAmount: 2.52, total: 19.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jkn003b8z3lfel8j1ep" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jkn003b8z3lfel8j1ep", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "2dc94ff9-eed9-4a7e-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 78.92, vatAmount: 11.84, total: 90.76, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jkn003d8z3lfg46hnxe", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 90.76, vatRate: 15, vatAmount: 11.84, total: 90.76 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jl8003p8z3l65ixzkco" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jl8003p8z3l65ixzkco", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "1e4d78af-3f9f-4d42-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 240.02, vatAmount: 35.98, total: 276, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jl8003r8z3lmt0zmjgz", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 93, vatRate: 15, vatAmount: 12.13, total: 93 },
          { id: "cmqm43jl8003s8z3l0czyd2jc", itemId: "cmqm43jkv003h8z3l52mbs2p6", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jl8003t8z3lv6erpjn6", itemId: "cmqm43jky003j8z3lqv4xig0t", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jl8003u8z3li7ej9z2l", itemId: "cmqm43jky003j8z3lqv4xig0t", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jl8003v8z3lkty9dt4m", itemId: "cmqm43jl1003l8z3lvfyxj96m", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jl8003w8z3laepf6y2f", itemId: "cmqm43jl5003n8z3lkqjxelhz", quantity: 1, unitPrice: 10, vatRate: 14.94, vatAmount: 1.3, total: 10 },
          { id: "cmqm43jl8003x8z3lbjofmj8y", itemId: "cmqm43jl5003n8z3lkqjxelhz", quantity: 1, unitPrice: 60, vatRate: 15.01, vatAmount: 7.83, total: 60 },
          { id: "cmqm43jl8003y8z3lu11172ru", itemId: "cmqm43jl1003l8z3lvfyxj96m", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jl8003z8z3l971g1t07", itemId: "cmqm43jkv003h8z3l52mbs2p6", quantity: 1, unitPrice: 70, vatRate: 15, vatAmount: 9.13, total: 70 },
          { id: "cmqm43jl800408z3ljsyi51nr", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jl800418z3luttsdgvz", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 3, vatRate: 14.94, vatAmount: 0.39, total: 3 },
          { id: "cmqm43jl800428z3l8fp79pk7", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jl800438z3lbvu1uxgb", itemId: "cmqm43jl1003l8z3lvfyxj96m", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jlk00498z3l4non14mw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jlk00498z3l4non14mw", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "0003c1c5-1b6a-4c78-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 765, vatAmount: 114.75, total: 879.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jlk004b8z3l0i2i56mm", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 15, unitPrice: 51, vatRate: 15, vatAmount: 114.75, total: 879.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jm3004n8z3lajt18ycb" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jm3004n8z3lajt18ycb", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "f42ba6c4-e3d9-45cf-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 168, vatAmount: 0, total: 168, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jm3004p8z3lcz6d1zvm", itemId: "cmqm43jlq004f8z3ljw63q30c", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
          { id: "cmqm43jm3004q8z3l4njn316f", itemId: "cmqm43jlv004h8z3l02r9ykb8", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
          { id: "cmqm43jm3004r8z3lojwb7m19", itemId: "cmqm43jly004j8z3liou76dop", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
          { id: "cmqm43jm3004s8z3lftej1qso", itemId: "cmqm43jm1004l8z3lbr633fer", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jme004y8z3lui833byx" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jme004y8z3lui833byx", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "2caf9f4f-fe55-465a-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 119.7, vatAmount: 17.95, total: 137.65, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jme00508z3ljmlfpbi8", itemId: "cmqm43jmc004w8z3lkqyig1vt", quantity: 1, unitPrice: 41.65, vatRate: 14.99, vatAmount: 5.43, total: 41.65 },
          { id: "cmqm43jme00518z3lgtfhtjv2", itemId: "cmqm43jmc004w8z3lkqyig1vt", quantity: 1, unitPrice: 96, vatRate: 15, vatAmount: 12.52, total: 96 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jmi00538z3l7bjh1fft" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jmi00538z3l7bjh1fft", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "e0a47f21-6995-401f-9", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jmi00558z3laijzawdc", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jmi00568z3lllb019b0", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jmm00588z3lasj8y5jz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jmm00588z3lasj8y5jz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "a6d293a2-278c-46bf-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 136, vatAmount: 20.4, total: 156.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jmn005a8z3li9vnrltb", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 136, vatRate: 15, vatAmount: 20.4, total: 156.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jmu005e8z3l8nqbkber" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jmu005e8z3l8nqbkber", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "10750372-2520-4590-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jmu005g8z3lobtfiggi", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jnd005s8z3lb1tvao4u" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jnd005s8z3lb1tvao4u", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3062c846-e790-4481-a", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1452.45, vatAmount: 217.86, total: 1670.31, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jnd005u8z3lwf8ezl5v", itemId: "cmqm43jmy005i8z3l9i3digx4", quantity: 2, unitPrice: 46, vatRate: 15, vatAmount: 13.8, total: 105.8 },
          { id: "cmqm43jnd005v8z3lionoa5ym", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm43jnd005w8z3l8991z1dy", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm43jnd005x8z3l7kgfgz9r", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 2, unitPrice: 137, vatRate: 15, vatAmount: 41.1, total: 315.1 },
          { id: "cmqm43jnd005y8z3lqntsma59", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqm43jnd005z8z3lxwhpw0m5", itemId: "cmqm43jn2005k8z3llsc7apql", quantity: 1, unitPrice: 68, vatRate: 15, vatAmount: 10.2, total: 78.2 },
          { id: "cmqm43jnd00608z3lo8erpdo4", itemId: "cmqm43jn5005m8z3lgyuif9ms", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqm43jnd00618z3l0zvzgvit", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 0.5, unitPrice: 148, vatRate: 15, vatAmount: 11.1, total: 85.1 },
          { id: "cmqm43jnd00628z3lkooviuge", itemId: "cmqm43jn7005o8z3lk16t8j40", quantity: 1, unitPrice: 208.7, vatRate: 15, vatAmount: 31.3, total: 240 },
          { id: "cmqm43jnd00638z3lpc5yjcr2", itemId: "cmqm43jna005q8z3li3d3s1l8", quantity: 1, unitPrice: 95, vatRate: 15, vatAmount: 14.25, total: 109.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jnl00658z3lodl0iqc6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jnl00658z3lodl0iqc6", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "3dcdd0a3-639a-4703-b", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1376, vatAmount: 206.4, total: 1582.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jnl00678z3lapod18cr", itemId: "cmqm3x7au00blu8l2eii4g041", quantity: 43, unitPrice: 32, vatRate: 15, vatAmount: 206.4, total: 1582.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jnv006d8z3lm4bv1jnm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jnv006d8z3lm4bv1jnm", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "0d222ff4-22fc-44af-a", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 326.1, vatAmount: 48.91, total: 375.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jnv006f8z3lgaxm8wk4", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 30, unitPrice: 10.87, vatRate: 15, vatAmount: 48.91, total: 375.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jo2006j8z3l9e5xskfz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jo2006j8z3l9e5xskfz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "eb99db64-4e8b-4019-8", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jo2006l8z3lr1vyiglx", itemId: "cmqm43jo0006h8z3lt0h6c3yz", quantity: 2, unitPrice: 5, vatRate: 14.94, vatAmount: 1.3, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jo5006n8z3l8abmqan1" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jo5006n8z3l8abmqan1", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "3b53af66-d77d-4c6c-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 65.22, vatAmount: 9.78, total: 75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jo5006p8z3lsm28z2j8", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jo5006q8z3lql29dlus", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 15, vatAmount: 9.13, total: 70 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jo9006s8z3lnul09924" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jo9006s8z3lnul09924", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "cc9fc33d-503f-4b56-8", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 16.83, vatAmount: 2.52, total: 19.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jo9006u8z3lfj89c0mb", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.35, vatRate: 14.97, vatAmount: 2.52, total: 19.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43joj00708z3lc32c9la9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43joj00708z3lc32c9la9", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43joc006w8z3l9sezfou2", invoiceNumber: "6e42f68f-02ba-4174-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 322, vatAmount: 48.3, total: 370.3, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43joj00728z3lp87za23s", itemId: "cmqm43jog006y8z3l3hckxwqq", quantity: 2, unitPrice: 161, vatRate: 15, vatAmount: 48.3, total: 370.3 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jz700gx8z3l34fc8zi9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jz700gx8z3l34fc8zi9", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "91eb9364-66cd-4044-b", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jz700gz8z3lqucf6uxd", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jz700h08z3lr8bxju8n", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43joo00748z3l78pho2m6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43joo00748z3l78pho2m6", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "e3e3911d-421a-43d6-b", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43joo00768z3ltsyldscf", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
          { id: "cmqm43joo00778z3l3ma3tt8o", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43joy007d8z3lppcoyz8z" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43joy007d8z3lppcoyz8z", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jot00798z3l6m6s1mm8", invoiceNumber: "dcff4257-7b5f-4e89-8", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 300, vatAmount: 45, total: 345, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43joz007f8z3lymw02iwl", itemId: "cmqm43jow007b8z3l1iun2aeg", quantity: 10, unitPrice: 30, vatRate: 15, vatAmount: 45, total: 345 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jp2007h8z3lzevcq0am" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jp2007h8z3lzevcq0am", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "52397000-5551-44f4-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jp2007j8z3l5gjh5yt5", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jp9007n8z3l42kfiuyz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jp9007n8z3l42kfiuyz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "a983fb60-5115-4686-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jp9007p8z3ltf685pei", itemId: "cmqm43jp6007l8z3lrw7m1euv", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jpf007t8z3lmr9fvexf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jpf007t8z3lmr9fvexf", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "1a1fd0ba-c900-4b09-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 7.83, vatAmount: 1.17, total: 9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jpf007v8z3la8sm3wuk", itemId: "cmqm43jpd007r8z3llemepda5", quantity: 1, unitPrice: 7.83, vatRate: 14.94, vatAmount: 1.17, total: 9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jpm007x8z3lschp067o" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jpm007x8z3lschp067o", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "56d822b9-aed6-4191-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1530, vatAmount: 229.5, total: 1759.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jpm007z8z3lak43digy", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 30, unitPrice: 51, vatRate: 15, vatAmount: 229.5, total: 1759.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jpr00818z3laly5opfc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jpr00818z3laly5opfc", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "03eeeaf3-9b00-4a2a-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 326.1, vatAmount: 48.91, total: 375.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jpr00838z3lizr18sn4", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 30, unitPrice: 10.87, vatRate: 15, vatAmount: 48.91, total: 375.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jpy00878z3lgprdlyc5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jpy00878z3lgprdlyc5", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "7724a52d-def8-4ee6-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 36, vatAmount: 0, total: 36, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jpy00898z3lh7xbzydy", itemId: "cmqm43jpv00858z3lj9zsp0ms", quantity: 2, unitPrice: 18, vatRate: 0, vatAmount: 0, total: 36 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jq1008b8z3lc5e47tlc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jq1008b8z3lc5e47tlc", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "884ca51c-a37b-4819-b", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1894.68, vatAmount: 284.2, total: 2178.88, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jq1008d8z3ly4batiqz", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm43jq1008e8z3lw6fdfarw", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 36, unitPrice: 16.38, vatRate: 15, vatAmount: 88.45, total: 678.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jqi008o8z3le48boh39" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jqi008o8z3le48boh39", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "9ac85910-8bd4-4642-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1095.78, vatAmount: 164.36, total: 1260.14, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jqi008q8z3lta1p8chn", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 4, unitPrice: 99.15, vatRate: 15, vatAmount: 59.49, total: 456.09 },
          { id: "cmqm43jqi008r8z3lk64bqwj3", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm43jqi008s8z3lajwbml9o", itemId: "cmqm43jq5008g8z3lgrht2u2a", quantity: 2, unitPrice: 45, vatRate: 15, vatAmount: 13.5, total: 103.5 },
          { id: "cmqm43jqi008t8z3l3sbuczvf", itemId: "cmqm43jq9008i8z3lq8nwk7ny", quantity: 2, unitPrice: 43.48, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm43jqi008u8z3lighpbpkd", itemId: "cmqm43jqc008k8z3l3n1hdrpv", quantity: 1, unitPrice: 85.22, vatRate: 15, vatAmount: 12.78, total: 98 },
          { id: "cmqm43jqi008v8z3lg7n58h8v", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 137, vatRate: 15, vatAmount: 20.55, total: 157.55 },
          { id: "cmqm43jqi008w8z3l17otymu9", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqm43jqi008x8z3ljszw86m6", itemId: "cmqm43jqf008m8z3lel3vum9d", quantity: 2, unitPrice: 27, vatRate: 15, vatAmount: 8.1, total: 62.1 },
          { id: "cmqm43jqi008y8z3l52i6ut1u", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 148, vatRate: 15, vatAmount: 22.2, total: 170.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jqr00928z3l5wg4h2v7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jqr00928z3l5wg4h2v7", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "339f2bb9-055f-4404-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 573.9, vatAmount: 86.08, total: 659.99, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jqr00948z3ls7v54pli", itemId: "cmqm43jqp00908z3l7rm7fnr3", quantity: 30, unitPrice: 19.13, vatRate: 15, vatAmount: 86.08, total: 659.99 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jr1009a8z3lunh3zta6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jr1009a8z3lunh3zta6", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jqv00968z3lt7u9bct4", invoiceNumber: "c5764e11-8c0a-4154-b", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1540, vatAmount: 231, total: 1771, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jr1009c8z3l4dlwrjr9", itemId: "cmqm43jqy00988z3lob8hsero", quantity: 1, unitPrice: 1540, vatRate: 15, vatAmount: 231, total: 1771 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jr5009e8z3lsphrti1z" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jr5009e8z3lsphrti1z", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "401dc83a-a3e1-4990-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 19.83, vatAmount: 2.97, total: 22.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jr5009g8z3lw9svqmiv", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.83, vatRate: 14.98, vatAmount: 2.97, total: 22.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jr8009i8z3ldzn00no7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jr8009i8z3ldzn00no7", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "3aa78036-34bb-414c-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 305, vatAmount: 45.75, total: 350.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jr8009k8z3l4uwvrwjm", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 305, vatRate: 15, vatAmount: 45.75, total: 350.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jrc009m8z3lhxkp8n1f" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jrc009m8z3lhxkp8n1f", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "c25cd86a-38a5-46ca-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jrc009o8z3lfive8e7o", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jri009s8z3ladn3hg2l" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jri009s8z3ladn3hg2l", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "4aa51aec-ccd3-411e-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 38.24, vatAmount: 5.74, total: 43.98, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jri009u8z3lm34ye6mf", itemId: "cmqm43jrg009q8z3lmk2y3ua2", quantity: 1, unitPrice: 43.98, vatRate: 15.01, vatAmount: 5.74, total: 43.98 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jro009w8z3l5ab8hesu" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jro009w8z3l5ab8hesu", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "b55c6336-bd8e-4f30-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 4.35, vatAmount: 0.65, total: 5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jro009y8z3lswv7ple1", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jrr00a08z3lt2fobavt" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jrr00a08z3lt2fobavt", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "b4a039e2-abfc-47c9-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jrr00a28z3lyn4jf9k3", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jry00a68z3lytet0bqe" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jry00a68z3lytet0bqe", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jrw00a48z3lybfhe531", invoiceNumber: "c7f907b0-b13e-457d-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 7.83, vatAmount: 1.17, total: 9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jry00a88z3l1pwup6pw", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 9, vatRate: 14.94, vatAmount: 1.17, total: 9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jsb00ae8z3lnmqwid1k" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jsb00ae8z3lnmqwid1k", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "f74c2bc8-bf24-48bc-9", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 973.75, vatAmount: 146.06, total: 1119.81, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jsb00ag8z3lj4h9d537", itemId: "cmqm43jn2005k8z3llsc7apql", quantity: 1, unitPrice: 68, vatRate: 15, vatAmount: 10.2, total: 78.2 },
          { id: "cmqm43jsb00ah8z3l4ss5ukxm", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm43jsb00ai8z3lfd5jkh8s", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm43jsb00aj8z3l57cn837i", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 135, vatRate: 15, vatAmount: 20.25, total: 155.25 },
          { id: "cmqm43jsb00ak8z3l2q9w65pn", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqm43jsc00al8z3lrpkmovjl", itemId: "cmqm43js300aa8z3l90z0h4ge", quantity: 2, unitPrice: 45, vatRate: 15, vatAmount: 13.5, total: 103.5 },
          { id: "cmqm43jsc00am8z3lhlu7tm6w", itemId: "cmqm3x7cn00d4u8l2yam7rtf4", quantity: 1, unitPrice: 27, vatRate: 15, vatAmount: 4.05, total: 31.05 },
          { id: "cmqm43jsc00an8z3ltopydlk4", itemId: "cmqm43js700ac8z3lys9u0il1", quantity: 2, unitPrice: 30, vatRate: 15, vatAmount: 9, total: 69 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jsi00ap8z3leijlh2oz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jsi00ap8z3leijlh2oz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "f4fc2ea1-6948-4685-b", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jsi00ar8z3ld0df7gvp", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
          { id: "cmqm43jsi00as8z3l9xkyo2zl", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jsm00au8z3l61uoan6s" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jsm00au8z3l61uoan6s", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "38fee3e2-b16c-4a83-b", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 74.8, vatAmount: 11.22, total: 86.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jsn00aw8z3lek713ehb", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 76.02, vatRate: 15.01, vatAmount: 9.92, total: 76.02 },
          { id: "cmqm43jsn00ax8z3l5dcv0bx8", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43jsn00ay8z3lznc9sf4p", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jsq00b08z3lksq58bhm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jsq00b08z3lksq58bhm", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "fe856ef6-9837-4f97-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jsr00b28z3lnpe4p9fk", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jsz00b68z3lz6czikdc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jsz00b68z3lz6czikdc", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "0cddf089-27e6-46d5-8", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 92.03, vatAmount: 0, total: 92.03, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jsz00b88z3lme7bk2cs", itemId: "cmqm43jsw00b48z3lfncj40s8", quantity: 1, unitPrice: 92.03, vatRate: 0, vatAmount: 0, total: 92.03 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jt600bc8z3lih85unkz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jt600bc8z3lih85unkz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "66cfcdd5-1239-4ea8-8", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 150, vatAmount: 0, total: 150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jt600be8z3l9yyo313u", itemId: "cmqm43jt400ba8z3lgbk4a58q", quantity: 1, unitPrice: 150, vatRate: 0, vatAmount: 0, total: 150 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jth00bk8z3l3q5kq8un" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jth00bk8z3l3q5kq8un", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3e647638-b2cc-43cb-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1172.75, vatAmount: 175.91, total: 1348.66, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jth00bm8z3lshqf2psq", itemId: "cmqm43jtb00bg8z3ltm7xata4", quantity: 1, unitPrice: 29, vatRate: 15, vatAmount: 4.35, total: 33.35 },
          { id: "cmqm43jth00bn8z3l31edjh1d", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 2, unitPrice: 135, vatRate: 15, vatAmount: 40.5, total: 310.5 },
          { id: "cmqm43jth00bo8z3lq5gj8itg", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm43jth00bp8z3l7phs613z", itemId: "cmqm43jmy005i8z3l9i3digx4", quantity: 2, unitPrice: 46, vatRate: 15, vatAmount: 13.8, total: 105.8 },
          { id: "cmqm43jth00bq8z3lk0uqdm25", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm43jth00br8z3lmk27wlmv", itemId: "cmqm43jn5005m8z3lgyuif9ms", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqm43jth00bs8z3lofhmh7iy", itemId: "cmqm43jte00bi8z3l4byq8qqo", quantity: 1, unitPrice: 107, vatRate: 15, vatAmount: 16.05, total: 123.05 },
          { id: "cmqm43jth00bt8z3lutfo4kmv", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 0.5, unitPrice: 148, vatRate: 15, vatAmount: 11.1, total: 85.1 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jtq00bx8z3la41bx6h2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jtq00bx8z3la41bx6h2", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "660230fc-74ea-474b-b", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 55.58, vatAmount: 8.34, total: 63.92, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jtq00bz8z3lw7v8ah86", itemId: "cmqm43jto00bv8z3luw5l72an", quantity: 1, unitPrice: 63.92, vatRate: 15.01, vatAmount: 8.34, total: 63.92 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jtv00c18z3lvf2lm7rd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jtv00c18z3lvf2lm7rd", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "3995c0c6-05d6-413c-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 434.78, vatAmount: 65.22, total: 500, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jtv00c38z3lphb3k0rl", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 1, unitPrice: 500, vatRate: 15, vatAmount: 65.22, total: 500 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jty00c58z3ljgq9th61" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jty00c58z3ljgq9th61", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "17cee513-cfbb-44a3-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jty00c78z3l9m10knr0", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43ju200c98z3l4vb8v3nv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43ju200c98z3l4vb8v3nv", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "05350a1a-a44f-4b33-b", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43ju200cb8z3lqj96c1sc", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s830052gtzf1patscgq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s830052gtzf1patscgq", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jot00798z3l6m6s1mm8", invoiceNumber: "dcff4257-7b5f-4e89-8", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 300, vatAmount: 45, total: 345, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s830054gtzfloy87d4m", itemId: "cmqm43jow007b8z3l1iun2aeg", quantity: 10, unitPrice: 30, vatRate: 15, vatAmount: 45, total: 345 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43ju900cf8z3l1mx5sbtl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43ju900cf8z3l1mx5sbtl", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "52953e84-8348-41a4-9", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 78.23, vatAmount: 11.74, total: 89.97, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43ju900ch8z3lvma8vm27", itemId: "cmqm43ju600cd8z3l11pw8hy9", quantity: 1, unitPrice: 89.97, vatRate: 15.01, vatAmount: 11.74, total: 89.97 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43juh00cj8z3l3al3fx1j" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43juh00cj8z3l3al3fx1j", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "4084a50c-f38e-40d5-8", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1361.62, vatAmount: 204.24, total: 1565.86, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43juh00cl8z3lufxcjmeb", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 1, unitPrice: 1565.86, vatRate: 15, vatAmount: 204.24, total: 1565.86 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43juk00cn8z3lh7ao1k60" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43juk00cn8z3lh7ao1k60", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "37ae8b08-ca25-4b0c-9", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jul00cp8z3lmkjwvkj1", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43juo00cr8z3lajz848q1" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43juo00cr8z3lajz848q1", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "983dd2b1-f7ba-4f77-9", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2157.3, vatAmount: 323.59, total: 2480.89, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43juo00ct8z3l6bjy4hri", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 90, unitPrice: 13.05, vatRate: 15, vatAmount: 176.17, total: 1350.67 },
          { id: "cmqm43juo00cu8z3ldlriduoj", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.38, vatRate: 15, vatAmount: 147.42, total: 1130.22 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jux00cy8z3lmbhk6rv5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jux00cy8z3lmbhk6rv5", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "9b9110db-2ee0-40c9-8", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jux00d08z3lct85mb01", itemId: "cmqm43juu00cw8z3l64x30cd5", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jve00da8z3liyi65df3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jve00da8z3liyi65df3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "95b8742a-2abc-4ded-b", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 5123.15, vatAmount: 768.47, total: 5891.62, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jve00dc8z3lrpqc2olw", itemId: "cmqm43jv100d28z3lu5jlcfme", quantity: 1, unitPrice: 1580.33, vatRate: 15, vatAmount: 237.05, total: 1817.38 },
          { id: "cmqm43jve00dd8z3ljef0hwe3", itemId: "cmqm43jv400d48z3l9lyvkcju", quantity: 1, unitPrice: 1271, vatRate: 15, vatAmount: 190.65, total: 1461.65 },
          { id: "cmqm43jve00de8z3lbtglen3z", itemId: "cmqm43jv700d68z3l7lj8lwec", quantity: 1, unitPrice: 1209.8, vatRate: 15, vatAmount: 181.47, total: 1391.27 },
          { id: "cmqm43jve00df8z3l397kuzeo", itemId: "cmqm43jvb00d88z3lpbnlfbny", quantity: 1, unitPrice: 1062.02, vatRate: 15, vatAmount: 159.3, total: 1221.32 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jvi00dh8z3lab0ow5sw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jvi00dh8z3lab0ow5sw", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "f11f498e-c707-4630-9", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 15, vatAmount: 2.25, total: 17.25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jvj00dj8z3lwdist7mh", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 15, vatRate: 15, vatAmount: 2.25, total: 17.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jvs00dp8z3ll2wzgz9o" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jvs00dp8z3ll2wzgz9o", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "a14bdf95-65d6-4bdf-b", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 55.63, vatAmount: 8.35, total: 63.98, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jvs00dr8z3ltijid70d", itemId: "cmqm43jvq00dn8z3lhvbpgg2d", quantity: 2, unitPrice: 31.99, vatRate: 15.01, vatAmount: 8.35, total: 63.98 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jw100dv8z3lbp1rfszg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jw100dv8z3lbp1rfszg", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jvy00dt8z3lks39x36p", invoiceNumber: "3d70942c-0345-4be4-a", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 770, vatAmount: 115.5, total: 885.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jw100dx8z3ldx30bdj5", itemId: "cmqm43js300aa8z3l90z0h4ge", quantity: 20, unitPrice: 38.5, vatRate: 15, vatAmount: 115.5, total: 885.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jw800e18z3lpkhs66ud" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jw800e18z3lpkhs66ud", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "be2bfcc2-07ec-420f-8", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 504.4, vatAmount: 75.66, total: 580.06, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jw800e38z3lcmdmxtgz", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 40, unitPrice: 10.87, vatRate: 15, vatAmount: 65.22, total: 500.02 },
          { id: "cmqm43jw800e48z3lhtx9kz23", itemId: "cmqm43jw600dz8z3lwnzlpxy9", quantity: 10, unitPrice: 6.96, vatRate: 15, vatAmount: 10.44, total: 80.04 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jwh00e88z3l5hwpfsue" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jwh00e88z3l5hwpfsue", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "06532239-a378-490b-b", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 160, vatAmount: 0, total: 160, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jwh00ea8z3lukmi1law", itemId: "cmqm43jwf00e68z3lfm0n1xkn", quantity: 1, unitPrice: 150, vatRate: 0, vatAmount: 0, total: 150 },
          { id: "cmqm43jwh00eb8z3lswg76oae", itemId: "cmqm43jwf00e68z3lfm0n1xkn", quantity: 1, unitPrice: 10, vatRate: 0, vatAmount: 0, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jwp00ef8z3lgm9r3w3q" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jwp00ef8z3lgm9r3w3q", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7j300kou8l24l31p1g8", invoiceNumber: "e13f0eff-19e5-420e-b", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 104.35, vatAmount: 15.65, total: 120, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jwq00eh8z3l0t432q40", itemId: "cmqm43jwn00ed8z3lbkxizhb5", quantity: 1, unitPrice: 104.35, vatRate: 15, vatAmount: 15.65, total: 120 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jwx00el8z3loevsnd3c" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jwx00el8z3loevsnd3c", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7r200tyu8l22arw1rzb", invoiceNumber: "6ffa213c-2ca4-4da8-9", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3725, vatAmount: 558.75, total: 4283.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jwx00en8z3l8iv9nfpd", itemId: "cmqm43jwu00ej8z3l5y2nh4qn", quantity: 1, unitPrice: 4283.75, vatRate: 15, vatAmount: 558.75, total: 4283.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jx000ep8z3l77bgu4my" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jx000ep8z3l77bgu4my", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "84d9260e-e7f6-4181-8", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 19.83, vatAmount: 2.97, total: 22.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jx000er8z3lezhhfafu", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.83, vatRate: 14.98, vatAmount: 2.97, total: 22.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jxb00ex8z3ly8oz9saz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jxb00ex8z3ly8oz9saz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7j300kou8l24l31p1g8", invoiceNumber: "137a5b77-3418-4c9e-a", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 309.57, vatAmount: 46.43, total: 356, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jxb00ez8z3ls1160vmd", itemId: "cmqm43jx400et8z3l3wkgzumg", quantity: 1, unitPrice: 96, vatRate: 15, vatAmount: 12.52, total: 96 },
          { id: "cmqm43jxb00f08z3lte4m6teo", itemId: "cmqm43jx800ev8z3lueiahpqe", quantity: 1, unitPrice: 260, vatRate: 15, vatAmount: 33.91, total: 260 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jxj00f48z3lonx4b5nu" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jxj00f48z3lonx4b5nu", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "a017665d-31db-47a6-8", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 427.83, vatAmount: 64.17, total: 492, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jxj00f68z3lpjsbm407", itemId: "cmqm43jxh00f28z3l2q7pgqqv", quantity: 1, unitPrice: 492, vatRate: 15, vatAmount: 64.17, total: 492 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jxn00f88z3lqxlzbiic" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jxn00f88z3lqxlzbiic", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "751c66fe-ed91-4c48-9", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jxn00fa8z3lp0le2661", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm43jxn00fb8z3l1ufa3kzh", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jxq00fd8z3ljgz91go9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jxq00fd8z3ljgz91go9", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "43d753f0-3181-41cb-b", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1020, vatAmount: 153, total: 1173, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jxr00ff8z3l4xupdwvp", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 20, unitPrice: 51, vatRate: 15, vatAmount: 153, total: 1173 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jxu00fh8z3l615nytpd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jxu00fh8z3l615nytpd", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "819301ed-cce3-4ae1-9", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jxu00fj8z3lw813xzy6", itemId: "cmqm43juu00cw8z3l64x30cd5", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jxw00fl8z3l1tltur0t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jxw00fl8z3l1tltur0t", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "d83187b6-566f-4a23-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 326.1, vatAmount: 48.91, total: 375.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jxx00fn8z3ljasnpkfr", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 30, unitPrice: 10.87, vatRate: 15, vatAmount: 48.91, total: 375.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jxz00fp8z3lxzff1ss2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jxz00fp8z3lxzff1ss2", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "ede7c171-5149-4d7b-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 3.48, vatAmount: 0.52, total: 4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jxz00fr8z3l5kgmxcg7", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.52, total: 4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jy300ft8z3lky0n0zjr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jy300ft8z3lky0n0zjr", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "2489afba-faea-45ad-a", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 573.9, vatAmount: 86.08, total: 659.99, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jy300fv8z3l2q0d374i", itemId: "cmqm43jqp00908z3l7rm7fnr3", quantity: 30, unitPrice: 19.13, vatRate: 15, vatAmount: 86.08, total: 659.99 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jy900fx8z3lmlu2brq1" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jy900fx8z3lmlu2brq1", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "93e85b8d-fc82-4d64-a", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1894.68, vatAmount: 284.2, total: 2178.88, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jy900fz8z3lq2cgqi2o", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm43jy900g08z3la15opq4u", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 36, unitPrice: 16.38, vatRate: 15, vatAmount: 88.45, total: 678.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jyd00g28z3lpbzcq34p" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jyd00g28z3lpbzcq34p", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "cf602995-4ac5-4b66-9", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 17.24, vatAmount: 2.59, total: 19.83, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jyd00g48z3lsvllgalq", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.83, vatRate: 15.02, vatAmount: 2.59, total: 19.83 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jyg00g68z3luyn5mmf3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jyg00g68z3luyn5mmf3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "ab39bf59-9caa-431c-a", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 68.7, vatAmount: 10.3, total: 79, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jyg00g88z3ldfb20qdb", itemId: "cmqm43ju600cd8z3l11pw8hy9", quantity: 1, unitPrice: 79, vatRate: 14.99, vatAmount: 10.3, total: 79 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jyj00ga8z3lkizxw8s8" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jyj00ga8z3lkizxw8s8", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "459f2fa4-1796-4e53-a", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1275, vatAmount: 191.25, total: 1466.25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jyj00gc8z3lmma1i3yt", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 25, unitPrice: 51, vatRate: 15, vatAmount: 191.25, total: 1466.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jyr00gg8z3l59n4yuih" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jyr00gg8z3l59n4yuih", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3f8858ca-6cb7-4743-b", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1130.63, vatAmount: 169.59, total: 1300.22, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jyr00gi8z3lu3176pt1", itemId: "cmqm43jyp00ge8z3lm6zfs7ak", quantity: 1, unitPrice: 1130.63, vatRate: 15, vatAmount: 169.59, total: 1300.22 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jyv00gk8z3lw8w9fqo3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jyv00gk8z3lw8w9fqo3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "ec952eed-c78e-4abf-9", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1601.46, vatAmount: 240.22, total: 1841.68, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jyv00gm8z3lfph92d2h", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
          { id: "cmqm43jyv00gn8z3lf4hl77sg", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 70, unitPrice: 13.05, vatRate: 15, vatAmount: 137.03, total: 1050.53 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jyy00gp8z3lj2nvol3e" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jyy00gp8z3lj2nvol3e", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "6e946ee9-f423-45d2-9", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jyy00gr8z3lcd0ch2rl", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jz300gt8z3lzvtg2x0q" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jz300gt8z3lzvtg2x0q", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "8d82c230-f92f-4803-b", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 18.22, vatAmount: 2.73, total: 20.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jz300gv8z3lath8do91", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 18.22, vatRate: 14.98, vatAmount: 2.73, total: 20.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jzb00h28z3l7cq8t9g3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jzb00h28z3l7cq8t9g3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "b6816859-11f8-45cc-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 16.83, vatAmount: 2.52, total: 19.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jzb00h48z3ljy6ga8vp", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 16.83, vatRate: 14.97, vatAmount: 2.52, total: 19.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jzf00h68z3ldr78cn47" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jzf00h68z3ldr78cn47", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "d4c9f598-c5e1-467f-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 217.4, vatAmount: 32.61, total: 250.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jzf00h88z3l24z81cim", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 20, unitPrice: 10.87, vatRate: 15, vatAmount: 32.61, total: 250.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jzi00ha8z3le0o7r1ka" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jzi00ha8z3le0o7r1ka", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43joc006w8z3l9sezfou2", invoiceNumber: "6684a8bf-e256-45fd-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 161, vatAmount: 24.15, total: 185.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jzi00hc8z3li7fozdq1", itemId: "cmqm43jog006y8z3l3hckxwqq", quantity: 1, unitPrice: 161, vatRate: 15, vatAmount: 24.15, total: 185.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jzl00he8z3lhh8sq30t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jzl00he8z3lhh8sq30t", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "183ae2ad-bc15-4c28-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 13.22, vatAmount: 1.98, total: 15.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jzm00hg8z3l0s19uewu", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 13.22, vatRate: 14.98, vatAmount: 1.98, total: 15.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jzp00hi8z3l1fkirv9n" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jzp00hi8z3l1fkirv9n", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "cba7057c-2519-4628-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 10, vatAmount: 1.5, total: 11.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jzp00hk8z3lhoouroz9", itemId: "cmqm43jwf00e68z3lfm0n1xkn", quantity: 1, unitPrice: 10, vatRate: 15, vatAmount: 1.5, total: 11.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43jzs00hm8z3lpvnmp66j" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43jzs00hm8z3lpvnmp66j", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "38a398ef-bea6-4b0d-8", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43jzs00ho8z3l671jf10d", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0100hs8z3lmu7vr8ox" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0100hs8z3lmu7vr8ox", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "2c8cee09-e31d-48de-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 849.65, vatAmount: 127.45, total: 977.1, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0100hu8z3ln4tv69fn", itemId: "cmqm43jzy00hq8z3lvvfdn1i6", quantity: 1, unitPrice: 849.65, vatRate: 15, vatAmount: 127.45, total: 977.1 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0400hw8z3lse31y0ne" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0400hw8z3lse31y0ne", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "d03a5c9e-5e55-4e19-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1045.62, vatAmount: 156.85, total: 1202.47, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0400hy8z3lxchejp2o", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 24, unitPrice: 16.38, vatRate: 15, vatAmount: 58.97, total: 452.09 },
          { id: "cmqm43k0400hz8z3lgobrvu98", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 50, unitPrice: 13.05, vatRate: 15, vatAmount: 97.88, total: 750.38 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0700i18z3ls0r1kk83" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0700i18z3ls0r1kk83", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "ba763c8d-6a56-47fd-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 6, vatAmount: 0, total: 6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0700i38z3lxwrb6lvc", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 6, vatRate: 0, vatAmount: 0, total: 6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0b00i58z3lvvokxo0q" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0b00i58z3lvvokxo0q", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "6c6631b1-652f-4e07-8", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0b00i78z3lk0pyzdc0", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0e00i98z3l0bwlp5zl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0e00i98z3l0bwlp5zl", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "0a9d528e-5052-4816-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 69.57, vatAmount: 10.43, total: 80, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0e00ib8z3leb4zy8tm", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43k0e00ic8z3lxbq0au9f", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 15, vatAmount: 9.13, total: 70 },
          { id: "cmqm43k0e00id8z3lskfejwpd", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0h00if8z3ldoc11wmc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0h00if8z3ldoc11wmc", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "717ce47f-9401-4e87-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0h00ih8z3ly5fknsrr", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0r00il8z3lkbx2azlc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0r00il8z3lkbx2azlc", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "406bfe3e-2a8d-4fa2-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 100, vatAmount: 0, total: 100, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0r00in8z3lbnm8nzoq", itemId: "cmqm43k0l00ij8z3l7wo2jlig", quantity: 1, unitPrice: 100, vatRate: 0, vatAmount: 0, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k0z00it8z3ldhpnwhor" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k0z00it8z3ldhpnwhor", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43k0u00ip8z3ltygl5yfu", invoiceNumber: "f790f8f0-a9df-4215-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 126.09, vatAmount: 18.91, total: 145, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k0z00iv8z3le8mvhe4s", itemId: "cmqm43k0x00ir8z3lo3ukhxv2", quantity: 1, unitPrice: 145, vatRate: 15, vatAmount: 18.91, total: 145 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1200ix8z3l1j9iu6lw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1200ix8z3l1j9iu6lw", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "27a7e1ed-dcc5-4ef3-b", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 13.05, vatAmount: 1.95, total: 15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1200iz8z3l138u3ima", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43k1200j08z3l5ih46w6v", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm43k1200j18z3lsyg75qp0", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1700j58z3ltbmjgagb" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1700j58z3ltbmjgagb", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "8226fe50-973c-4df7-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 977.33, vatAmount: 146.6, total: 1123.93, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1700j78z3lhybu81bc", itemId: "cmqm43k1500j38z3l3c45gvmg", quantity: 1, unitPrice: 977.33, vatRate: 15, vatAmount: 146.6, total: 1123.93 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1b00j98z3lppdsp62t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1b00j98z3lppdsp62t", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "fe4fcf84-640e-49a0-b", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 687.96, vatAmount: 103.19, total: 791.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1b00jb8z3lhipg4zqy", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1i00jf8z3ld0dzs0p5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1i00jf8z3ld0dzs0p5", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "e3fe8681-40d0-4bb8-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 660.61, vatAmount: 99.09, total: 759.7, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1i00jh8z3lb67pvmuc", itemId: "cmqm43jqp00908z3l7rm7fnr3", quantity: 30, unitPrice: 21.99, vatRate: 15, vatAmount: 86.05, total: 659.7 },
          { id: "cmqm43k1i00ji8z3lcvnrnbfg", itemId: "cmqm43k1f00jd8z3lc5ow86zx", quantity: 10, unitPrice: 10, vatRate: 15, vatAmount: 13.04, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1n00jk8z3lh9g4cyve" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1n00jk8z3lh9g4cyve", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "8ee66162-f3ae-4cb0-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 226, vatAmount: 33.9, total: 259.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1n00jm8z3lg8n3jmkv", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 226, vatRate: 15, vatAmount: 33.9, total: 259.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1q00jo8z3ls7m6jf6g" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1q00jo8z3ls7m6jf6g", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43k0u00ip8z3ltygl5yfu", invoiceNumber: "ea265984-7eba-4bb5-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1q00jq8z3lzcwf2h04", itemId: "cmqm43k0x00ir8z3lo3ukhxv2", quantity: 1, unitPrice: 10, vatRate: 14.94, vatAmount: 1.3, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1t00js8z3ltm0wkote" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1t00js8z3ltm0wkote", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "8ba4fc33-e310-4f93-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 65.22, vatAmount: 9.78, total: 75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1t00ju8z3ltgcibx8b", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 75, vatRate: 15, vatAmount: 9.78, total: 75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1w00jw8z3ldl4s73cf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1w00jw8z3ldl4s73cf", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "2b2cfa12-edc2-46cb-b", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1824, vatAmount: 273.6, total: 2097.6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1w00jy8z3l4wcfxuti", itemId: "cmqm3x7au00blu8l2eii4g041", quantity: 57, unitPrice: 32, vatRate: 15, vatAmount: 273.6, total: 2097.6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k1y00k08z3lwz3qr3s9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k1y00k08z3lwz3qr3s9", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "b2e52f46-9f7d-4371-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k1y00k28z3l13v9ptp6", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k2500k68z3lv7nm5qpj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k2500k68z3lv7nm5qpj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "281d9a79-4974-4744-b", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 304.35, vatAmount: 45.65, total: 350, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k2500k88z3lphiej74f", itemId: "cmqm43jqc008k8z3l3n1hdrpv", quantity: 1, unitPrice: 147.83, vatRate: 15, vatAmount: 22.17, total: 170 },
          { id: "cmqm43k2500k98z3lbo8jxqug", itemId: "cmqm43k2300k48z3lrl0m3rw4", quantity: 1, unitPrice: 156.52, vatRate: 15, vatAmount: 23.48, total: 180 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k2800kb8z3lth8oe7g7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k2800kb8z3lth8oe7g7", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "8953a784-a599-46f6-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 434.8, vatAmount: 65.22, total: 500.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k2800kd8z3lx0bccf6x", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 40, unitPrice: 10.87, vatRate: 15, vatAmount: 65.22, total: 500.02 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k2d00kf8z3luoek1jn6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k2d00kf8z3luoek1jn6", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "b54a06fa-d7fa-4b9f-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1000, vatAmount: 150, total: 1150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k2d00kh8z3lcfh06nk1", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 20, unitPrice: 57.5, vatRate: 15, vatAmount: 150, total: 1150 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k2g00kj8z3liaz29ue3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k2g00kj8z3liaz29ue3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "42b225b7-7d06-4fda-b", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k2g00kl8z3l4jk5qwkn", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm43k2g00km8z3lrzxx9gum", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k2j00ko8z3lm3a4tagd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k2j00ko8z3lm3a4tagd", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "ee400873-d4b7-4249-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k2j00kq8z3la4s2ark1", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k2p00ku8z3lgghj76xy" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k2p00ku8z3lgghj76xy", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "06a6db0f-d57d-4bde-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1061, vatAmount: 159.15, total: 1220.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k2p00kw8z3ldgwsdpzw", itemId: "cmqm43k2n00ks8z3lzqsnt1cz", quantity: 1, unitPrice: 1061, vatRate: 15, vatAmount: 159.15, total: 1220.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k2u00l08z3l836w75tj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k2u00l08z3l836w75tj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "305c001b-f957-4162-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k2u00l28z3lffzhomo6", itemId: "cmqm43k2s00ky8z3lb6n8qkfi", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3000l68z3l0l3fl2ya" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3000l68z3l0l3fl2ya", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "15bb2fbf-c30a-456c-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 69.48, vatAmount: 10.42, total: 79.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3000l88z3lst34mceo", itemId: "cmqm43k2y00l48z3ltkhvdeq5", quantity: 1, unitPrice: 79.9, vatRate: 15, vatAmount: 10.42, total: 79.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3600la8z3lgkqcftpn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3600la8z3lgkqcftpn", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "adcdd831-d56a-44b5-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 95.83, vatAmount: 14.37, total: 110.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3600lc8z3lssops04y", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 110.2, vatRate: 15, vatAmount: 14.37, total: 110.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3900le8z3lwgz8gkd6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3900le8z3lwgz8gkd6", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "412ba580-a88f-4dcf-b", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 250, vatAmount: 0, total: 250, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3900lg8z3lb1141nyx", itemId: "cmqm43jt400ba8z3lgbk4a58q", quantity: 1, unitPrice: 250, vatRate: 0, vatAmount: 0, total: 250 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3c00li8z3l65poak21" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3c00li8z3l65poak21", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "0be48d17-48ec-4e1e-b", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3c00lk8z3ly8mbpbea", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 2, unitPrice: 5, vatRate: 14.94, vatAmount: 1.3, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3g00lm8z3l85usb6zd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3g00lm8z3l85usb6zd", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "fb10561e-ea52-49ae-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3g00lo8z3lf33qqde2", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3m00ls8z3l3c99t06k" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3m00ls8z3l3c99t06k", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3758312f-c25d-47b7-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 946.58, vatAmount: 141.99, total: 1088.57, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3m00lu8z3lndzsw3uv", itemId: "cmqm43k3k00lq8z3llztmjoql", quantity: 1, unitPrice: 946.58, vatRate: 15, vatAmount: 141.99, total: 1088.57 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3q00lw8z3lbypo771s" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3q00lw8z3lbypo771s", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "5e5381c9-c4f5-4676-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 185, vatAmount: 27.75, total: 212.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3q00ly8z3lbirmmfn5", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 185, vatRate: 15, vatAmount: 27.75, total: 212.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3t00m08z3l1kf2ks2e" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3t00m08z3l1kf2ks2e", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "cbd8a54e-5a86-455f-8", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 20.83, vatAmount: 3.12, total: 23.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3t00m28z3lwyfgso8j", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 23.95, vatRate: 14.98, vatAmount: 3.12, total: 23.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k3y00m48z3lffc3m4lg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k3y00m48z3lffc3m4lg", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "b8d73f82-5b75-4b6c-8", invoiceDate: new Date("2026-06-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 434.8, vatAmount: 65.22, total: 500.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k3y00m68z3l466qi78g", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 40, unitPrice: 10.87, vatRate: 15, vatAmount: 65.22, total: 500.02 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm43k4200m88z3l70ukj3hj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm43k4200m88z3l70ukj3hj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "6a02963e-16a2-465a-9", invoiceDate: new Date("2026-06-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 36.5, vatAmount: 5.48, total: 41.98, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm43k4200ma8z3lx7215wby", itemId: "cmqm43k2y00l48z3ltkhvdeq5", quantity: 1, unitPrice: 41.98, vatRate: 15.01, vatAmount: 5.48, total: 41.98 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s4f001qgtzf0qagyejt" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s4f001qgtzf0qagyejt", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "d6c3a72f-a277-429e-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 930.75, vatAmount: 139.61, total: 1070.36, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s4f001sgtzf7eazt8dm", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm47s4f001tgtzflsk7xerk", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 148, vatRate: 15, vatAmount: 22.2, total: 170.2 },
          { id: "cmqm47s4f001ugtzfqa5wnuh4", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm47s4f001vgtzfkygbk8uq", itemId: "cmqm43jiz00218z3lykvljd23", quantity: 1, unitPrice: 52, vatRate: 15, vatAmount: 7.8, total: 59.8 },
          { id: "cmqm47s4g001wgtzfd00udkej", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 137, vatRate: 15, vatAmount: 20.55, total: 157.55 },
          { id: "cmqm47s4g001xgtzfrpu9pj3a", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s4p001zgtzfrel42vjs" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s4p001zgtzfrel42vjs", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "8583f280-1482-4d6f-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 652, vatAmount: 97.8, total: 749.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s4p0021gtzfmz3ma4ly", itemId: "cmqm43jjg002g8z3lnjh23uil", quantity: 1, unitPrice: 285, vatRate: 15, vatAmount: 42.75, total: 327.75 },
          { id: "cmqm47s4p0022gtzfe1tm2tff", itemId: "cmqm43jjk002i8z3lx12amkgh", quantity: 1, unitPrice: 242, vatRate: 15, vatAmount: 36.3, total: 278.3 },
          { id: "cmqm47s4p0023gtzfxce4pkgz", itemId: "cmqm43jjn002k8z3l7cdom0xo", quantity: 1, unitPrice: 125, vatRate: 15, vatAmount: 18.75, total: 143.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s4v0025gtzf711j1ixw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s4v0025gtzf711j1ixw", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "e11e2798-fd21-42e3-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s4v0027gtzf0aj7ikuv", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s520029gtzfpma50xd6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s520029gtzfpma50xd6", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "8b02d8ac-4489-4ebf-9", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2091.24, vatAmount: 313.69, total: 2404.93, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s52002bgtzf65w6rrce", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 48, unitPrice: 16.38, vatRate: 15, vatAmount: 117.94, total: 904.18 },
          { id: "cmqm47s52002cgtzf7y5lmzi7", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s5b002egtzfmzymslyn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s5b002egtzfmzymslyn", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "1dd69913-c2cf-4106-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 16.83, vatAmount: 2.52, total: 19.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s5b002ggtzfmj2wd7wr", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.35, vatRate: 14.97, vatAmount: 2.52, total: 19.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s5h002igtzffz9egxev" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s5h002igtzffz9egxev", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "2dc94ff9-eed9-4a7e-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 78.92, vatAmount: 11.84, total: 90.76, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s5h002kgtzfjn83xulk", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 90.76, vatRate: 15, vatAmount: 11.84, total: 90.76 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s5p002mgtzfln9agppk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s5p002mgtzfln9agppk", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "1e4d78af-3f9f-4d42-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 240.02, vatAmount: 35.98, total: 276, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s5p002ogtzfjudo949a", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 93, vatRate: 15, vatAmount: 12.13, total: 93 },
          { id: "cmqm47s5p002pgtzf3zyx00it", itemId: "cmqm43jkv003h8z3l52mbs2p6", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s5p002qgtzf256kzwbo", itemId: "cmqm43jky003j8z3lqv4xig0t", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s5p002rgtzflkd09s4g", itemId: "cmqm43jky003j8z3lqv4xig0t", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s5p002sgtzf2311hghf", itemId: "cmqm43jl1003l8z3lvfyxj96m", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s5p002tgtzf0xzup7n6", itemId: "cmqm43jl5003n8z3lkqjxelhz", quantity: 1, unitPrice: 10, vatRate: 14.94, vatAmount: 1.3, total: 10 },
          { id: "cmqm47s5p002ugtzfubuxaqwl", itemId: "cmqm43jl5003n8z3lkqjxelhz", quantity: 1, unitPrice: 60, vatRate: 15.01, vatAmount: 7.83, total: 60 },
          { id: "cmqm47s5p002vgtzfkkpxk541", itemId: "cmqm43jl1003l8z3lvfyxj96m", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s5p002wgtzf9oxe2zu2", itemId: "cmqm43jkv003h8z3l52mbs2p6", quantity: 1, unitPrice: 70, vatRate: 15, vatAmount: 9.13, total: 70 },
          { id: "cmqm47s5p002xgtzfmxrto3ig", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s5p002ygtzfgbgwi4ow", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 3, vatRate: 14.94, vatAmount: 0.39, total: 3 },
          { id: "cmqm47s5p002zgtzf8i4f992o", itemId: "cmqm43jks003f8z3l6m36g79l", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s5p0030gtzfmlcsin9h", itemId: "cmqm43jl1003l8z3lvfyxj96m", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s5v0032gtzf5qdnh26x" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s5v0032gtzf5qdnh26x", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "0003c1c5-1b6a-4c78-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 765, vatAmount: 114.75, total: 879.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s5v0034gtzfd6iwg1w0", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 15, unitPrice: 51, vatRate: 15, vatAmount: 114.75, total: 879.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s630036gtzfjoaeobew" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s630036gtzfjoaeobew", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "f42ba6c4-e3d9-45cf-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 168, vatAmount: 0, total: 168, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s630038gtzfksm4exvy", itemId: "cmqm43jlq004f8z3ljw63q30c", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
          { id: "cmqm47s630039gtzf1m5kzi7e", itemId: "cmqm43jlv004h8z3l02r9ykb8", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
          { id: "cmqm47s63003agtzf1umn21rm", itemId: "cmqm43jly004j8z3liou76dop", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
          { id: "cmqm47s63003bgtzflqpg70em", itemId: "cmqm43jm1004l8z3lbr633fer", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s6c003dgtzfs4zw8d45" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s6c003dgtzfs4zw8d45", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "2caf9f4f-fe55-465a-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 119.7, vatAmount: 17.95, total: 137.65, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s6c003fgtzfph52by3x", itemId: "cmqm43jmc004w8z3lkqyig1vt", quantity: 1, unitPrice: 41.65, vatRate: 14.99, vatAmount: 5.43, total: 41.65 },
          { id: "cmqm47s6c003ggtzfbsj3ni09", itemId: "cmqm43jmc004w8z3lkqyig1vt", quantity: 1, unitPrice: 96, vatRate: 15, vatAmount: 12.52, total: 96 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s6f003igtzfra5bqcn4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s6f003igtzfra5bqcn4", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "e0a47f21-6995-401f-9", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s6f003kgtzf6h8vtoe3", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s6f003lgtzf23qg6p6l", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s6j003ngtzf05sqhery" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s6j003ngtzf05sqhery", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "a6d293a2-278c-46bf-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 136, vatAmount: 20.4, total: 156.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s6j003pgtzf6qruzswt", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 136, vatRate: 15, vatAmount: 20.4, total: 156.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s6n003rgtzfmuaxwl5a" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s6n003rgtzfmuaxwl5a", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "10750372-2520-4590-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s6n003tgtzf1qg0bw7m", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s6x003vgtzfz8yj3xb0" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s6x003vgtzfz8yj3xb0", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3062c846-e790-4481-a", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1452.45, vatAmount: 217.86, total: 1670.31, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s6x003xgtzfjjjk8ibp", itemId: "cmqm43jmy005i8z3l9i3digx4", quantity: 2, unitPrice: 46, vatRate: 15, vatAmount: 13.8, total: 105.8 },
          { id: "cmqm47s6x003ygtzf6b6l014p", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm47s6x003zgtzf8v1rvzpb", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm47s6x0040gtzfpbihd06h", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 2, unitPrice: 137, vatRate: 15, vatAmount: 41.1, total: 315.1 },
          { id: "cmqm47s6x0041gtzfazx91p4k", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqm47s6x0042gtzfe44j2dp8", itemId: "cmqm43jn2005k8z3llsc7apql", quantity: 1, unitPrice: 68, vatRate: 15, vatAmount: 10.2, total: 78.2 },
          { id: "cmqm47s6x0043gtzfn05p427o", itemId: "cmqm43jn5005m8z3lgyuif9ms", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqm47s6x0044gtzf5xnf1i6q", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 0.5, unitPrice: 148, vatRate: 15, vatAmount: 11.1, total: 85.1 },
          { id: "cmqm47s6x0045gtzfrae4n1l7", itemId: "cmqm43jn7005o8z3lk16t8j40", quantity: 1, unitPrice: 208.7, vatRate: 15, vatAmount: 31.3, total: 240 },
          { id: "cmqm47s6x0046gtzfwnjafdb6", itemId: "cmqm43jna005q8z3li3d3s1l8", quantity: 1, unitPrice: 95, vatRate: 15, vatAmount: 14.25, total: 109.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s750048gtzfbpksgoeg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s750048gtzfbpksgoeg", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "3dcdd0a3-639a-4703-b", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1376, vatAmount: 206.4, total: 1582.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s75004agtzf8a4tb0gv", itemId: "cmqm3x7au00blu8l2eii4g041", quantity: 43, unitPrice: 32, vatRate: 15, vatAmount: 206.4, total: 1582.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s7a004cgtzfjlpo5wrw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s7a004cgtzfjlpo5wrw", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "0d222ff4-22fc-44af-a", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 326.1, vatAmount: 48.91, total: 375.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s7a004egtzfunl4qzod", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 30, unitPrice: 10.87, vatRate: 15, vatAmount: 48.91, total: 375.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s7f004ggtzfeu8hhqlk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s7f004ggtzfeu8hhqlk", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "eb99db64-4e8b-4019-8", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s7g004igtzf7j25wd3t", itemId: "cmqm43jo0006h8z3lt0h6c3yz", quantity: 2, unitPrice: 5, vatRate: 14.94, vatAmount: 1.3, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s7j004kgtzfcdxt2icm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s7j004kgtzfcdxt2icm", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "3b53af66-d77d-4c6c-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 65.22, vatAmount: 9.78, total: 75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s7j004mgtzf07r26dce", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47s7j004ngtzfcimel7se", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 15, vatAmount: 9.13, total: 70 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s7m004pgtzfjpijoles" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s7m004pgtzfjpijoles", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "cc9fc33d-503f-4b56-8", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 16.83, vatAmount: 2.52, total: 19.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s7m004rgtzf03eu4phq", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.35, vatRate: 14.97, vatAmount: 2.52, total: 19.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s7s004tgtzfvuox4g0k" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s7s004tgtzfvuox4g0k", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43joc006w8z3l9sezfou2", invoiceNumber: "6e42f68f-02ba-4174-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 322, vatAmount: 48.3, total: 370.3, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s7s004vgtzfmiqevgck", itemId: "cmqm43jog006y8z3l3hckxwqq", quantity: 2, unitPrice: 161, vatRate: 15, vatAmount: 48.3, total: 370.3 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s7v004xgtzfump3i5kk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s7v004xgtzfump3i5kk", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "e3e3911d-421a-43d6-b", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s7v004zgtzf5er700cb", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
          { id: "cmqm47s7v0050gtzf2z6iimqx", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s860056gtzfrtegh90s" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s860056gtzfrtegh90s", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "52397000-5551-44f4-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s860058gtzfjyb6hj0e", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s8b005agtzfr5jx2kmr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s8b005agtzfr5jx2kmr", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "a983fb60-5115-4686-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s8b005cgtzf2ejea6r0", itemId: "cmqm43jp6007l8z3lrw7m1euv", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s8g005egtzf7lkmd11y" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s8g005egtzf7lkmd11y", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "1a1fd0ba-c900-4b09-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 7.83, vatAmount: 1.17, total: 9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s8g005ggtzfvi2vkd7o", itemId: "cmqm43jpd007r8z3llemepda5", quantity: 1, unitPrice: 7.83, vatRate: 14.94, vatAmount: 1.17, total: 9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s8j005igtzf5grywvfr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s8j005igtzf5grywvfr", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "56d822b9-aed6-4191-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1530, vatAmount: 229.5, total: 1759.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s8j005kgtzfu5g7blqi", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 30, unitPrice: 51, vatRate: 15, vatAmount: 229.5, total: 1759.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s8m005mgtzfp1nx28rl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s8m005mgtzfp1nx28rl", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "03eeeaf3-9b00-4a2a-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 326.1, vatAmount: 48.91, total: 375.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s8m005ogtzffjc4kqbw", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 30, unitPrice: 10.87, vatRate: 15, vatAmount: 48.91, total: 375.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s8q005qgtzfn1hn07gc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s8q005qgtzfn1hn07gc", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "7724a52d-def8-4ee6-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 36, vatAmount: 0, total: 36, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s8q005sgtzflhislpt6", itemId: "cmqm43jpv00858z3lj9zsp0ms", quantity: 2, unitPrice: 18, vatRate: 0, vatAmount: 0, total: 36 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s8t005ugtzf5g7zp3f0" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s8t005ugtzf5g7zp3f0", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "884ca51c-a37b-4819-b", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1894.68, vatAmount: 284.2, total: 2178.88, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s8t005wgtzfx1f39rky", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm47s8t005xgtzfuavgr26v", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 36, unitPrice: 16.38, vatRate: 15, vatAmount: 88.45, total: 678.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s95005zgtzfngo2tu4d" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s95005zgtzfngo2tu4d", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "9ac85910-8bd4-4642-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1095.78, vatAmount: 164.36, total: 1260.14, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s950061gtzf411uph0d", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 4, unitPrice: 99.15, vatRate: 15, vatAmount: 59.49, total: 456.09 },
          { id: "cmqm47s950062gtzf3pftgw8z", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm47s950063gtzfdk80d5s4", itemId: "cmqm43jq5008g8z3lgrht2u2a", quantity: 2, unitPrice: 45, vatRate: 15, vatAmount: 13.5, total: 103.5 },
          { id: "cmqm47s950064gtzfdh658vyo", itemId: "cmqm43jq9008i8z3lq8nwk7ny", quantity: 2, unitPrice: 43.48, vatRate: 15, vatAmount: 13.04, total: 100 },
          { id: "cmqm47s950065gtzfxgmj7t9e", itemId: "cmqm43jqc008k8z3l3n1hdrpv", quantity: 1, unitPrice: 85.22, vatRate: 15, vatAmount: 12.78, total: 98 },
          { id: "cmqm47s950066gtzf2mnz971e", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 137, vatRate: 15, vatAmount: 20.55, total: 157.55 },
          { id: "cmqm47s950067gtzfsce5iv7q", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqm47s950068gtzf0cnqxynb", itemId: "cmqm43jqf008m8z3lel3vum9d", quantity: 2, unitPrice: 27, vatRate: 15, vatAmount: 8.1, total: 62.1 },
          { id: "cmqm47s950069gtzf9gj1bpvc", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 148, vatRate: 15, vatAmount: 22.2, total: 170.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s9a006bgtzf6q8jjgye" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s9a006bgtzf6q8jjgye", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "339f2bb9-055f-4404-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 573.9, vatAmount: 86.08, total: 659.99, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s9a006dgtzfwi6ctrrc", itemId: "cmqm43jqp00908z3l7rm7fnr3", quantity: 30, unitPrice: 19.13, vatRate: 15, vatAmount: 86.08, total: 659.99 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s9h006fgtzf2im6tbf7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s9h006fgtzf2im6tbf7", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jqv00968z3lt7u9bct4", invoiceNumber: "c5764e11-8c0a-4154-b", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1540, vatAmount: 231, total: 1771, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s9h006hgtzfs5lphaos", itemId: "cmqm43jqy00988z3lob8hsero", quantity: 1, unitPrice: 1540, vatRate: 15, vatAmount: 231, total: 1771 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s9j006jgtzfud3jy4i5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s9j006jgtzfud3jy4i5", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "401dc83a-a3e1-4990-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 19.83, vatAmount: 2.97, total: 22.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s9j006lgtzf31li6ho8", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.83, vatRate: 14.98, vatAmount: 2.97, total: 22.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s9m006ngtzfemhlrtlp" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s9m006ngtzfemhlrtlp", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "3aa78036-34bb-414c-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 305, vatAmount: 45.75, total: 350.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s9n006pgtzfz46cwgo4", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 305, vatRate: 15, vatAmount: 45.75, total: 350.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s9s006rgtzf7gueic5e" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s9s006rgtzf7gueic5e", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "c25cd86a-38a5-46ca-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s9s006tgtzfyz8l663c", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s9w006vgtzf7oxfs6sm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s9w006vgtzf7oxfs6sm", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "4aa51aec-ccd3-411e-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 38.24, vatAmount: 5.74, total: 43.98, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47s9w006xgtzfvmoi7v71", itemId: "cmqm43jrg009q8z3lmk2y3ua2", quantity: 1, unitPrice: 43.98, vatRate: 15.01, vatAmount: 5.74, total: 43.98 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47s9z006zgtzfdstpmuqk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47s9z006zgtzfdstpmuqk", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "b55c6336-bd8e-4f30-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 4.35, vatAmount: 0.65, total: 5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sa00071gtzfb5lmmnuo", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sa20073gtzfteg8xsr7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sa20073gtzfteg8xsr7", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "b4a039e2-abfc-47c9-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sa20075gtzfw9joa5gl", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sa60077gtzfr90u29vr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sa60077gtzfr90u29vr", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jrw00a48z3lybfhe531", invoiceNumber: "c7f907b0-b13e-457d-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 7.83, vatAmount: 1.17, total: 9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sa60079gtzff3p7ox1w", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 9, vatRate: 14.94, vatAmount: 1.17, total: 9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sac007bgtzfl4n1sugj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sac007bgtzfl4n1sugj", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "f74c2bc8-bf24-48bc-9", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 973.75, vatAmount: 146.06, total: 1119.81, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sac007dgtzfw1gnyov2", itemId: "cmqm43jn2005k8z3llsc7apql", quantity: 1, unitPrice: 68, vatRate: 15, vatAmount: 10.2, total: 78.2 },
          { id: "cmqm47sac007egtzfxylb93kh", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm47sad007fgtzfki0v6o2m", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm47sad007ggtzfpstvozm4", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 135, vatRate: 15, vatAmount: 20.25, total: 155.25 },
          { id: "cmqm47sad007hgtzf7kcsx6xy", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqm47sad007igtzf95mnycqw", itemId: "cmqm43js300aa8z3l90z0h4ge", quantity: 2, unitPrice: 45, vatRate: 15, vatAmount: 13.5, total: 103.5 },
          { id: "cmqm47sad007jgtzflprsimyg", itemId: "cmqm3x7cn00d4u8l2yam7rtf4", quantity: 1, unitPrice: 27, vatRate: 15, vatAmount: 4.05, total: 31.05 },
          { id: "cmqm47sad007kgtzfdefonzhg", itemId: "cmqm43js700ac8z3lys9u0il1", quantity: 2, unitPrice: 30, vatRate: 15, vatAmount: 9, total: 69 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sai007mgtzf53n2q886" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sai007mgtzf53n2q886", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "f4fc2ea1-6948-4685-b", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sai007ogtzf2l1ytsea", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
          { id: "cmqm47sai007pgtzfufqcg5l0", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sal007rgtzfzudj2j5j" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sal007rgtzfzudj2j5j", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "38fee3e2-b16c-4a83-b", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 74.8, vatAmount: 11.22, total: 86.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sal007tgtzf0sacmhdf", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 76.02, vatRate: 15.01, vatAmount: 9.92, total: 76.02 },
          { id: "cmqm47sal007ugtzfmss1tiu6", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47sal007vgtzf05pcfr8a", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sao007xgtzfrfzriit5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sao007xgtzfrfzriit5", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "fe856ef6-9837-4f97-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sao007zgtzfvfmg79pp", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sat0081gtzfb5sq2fad" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sat0081gtzfb5sq2fad", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "0cddf089-27e6-46d5-8", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 92.03, vatAmount: 0, total: 92.03, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sat0083gtzfcsqzcms0", itemId: "cmqm43jsw00b48z3lfncj40s8", quantity: 1, unitPrice: 92.03, vatRate: 0, vatAmount: 0, total: 92.03 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47saz0085gtzfyf5qkxll" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47saz0085gtzfyf5qkxll", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "66cfcdd5-1239-4ea8-8", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 150, vatAmount: 0, total: 150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47saz0087gtzfvg0ob6j9", itemId: "cmqm43jt400ba8z3lgbk4a58q", quantity: 1, unitPrice: 150, vatRate: 0, vatAmount: 0, total: 150 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sb40089gtzfix4afxq9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sb40089gtzfix4afxq9", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3e647638-b2cc-43cb-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1172.75, vatAmount: 175.91, total: 1348.66, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sb4008bgtzfln00ynd2", itemId: "cmqm43jtb00bg8z3ltm7xata4", quantity: 1, unitPrice: 29, vatRate: 15, vatAmount: 4.35, total: 33.35 },
          { id: "cmqm47sb4008cgtzfttuw4vkt", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 2, unitPrice: 135, vatRate: 15, vatAmount: 40.5, total: 310.5 },
          { id: "cmqm47sb4008dgtzfrktcv9cq", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqm47sb4008egtzfnnlbszuj", itemId: "cmqm43jmy005i8z3l9i3digx4", quantity: 2, unitPrice: 46, vatRate: 15, vatAmount: 13.8, total: 105.8 },
          { id: "cmqm47sb4008fgtzfcyhwk5la", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 5, unitPrice: 99.15, vatRate: 15, vatAmount: 74.36, total: 570.11 },
          { id: "cmqm47sb4008ggtzfg9404v4i", itemId: "cmqm43jn5005m8z3lgyuif9ms", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqm47sb4008hgtzfjzdxi230", itemId: "cmqm43jte00bi8z3l4byq8qqo", quantity: 1, unitPrice: 107, vatRate: 15, vatAmount: 16.05, total: 123.05 },
          { id: "cmqm47sb4008igtzfyyeyxa81", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 0.5, unitPrice: 148, vatRate: 15, vatAmount: 11.1, total: 85.1 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sbb008kgtzf5khtab78" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sbb008kgtzf5khtab78", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "660230fc-74ea-474b-b", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 55.58, vatAmount: 8.34, total: 63.92, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sbb008mgtzf0kjmwxcv", itemId: "cmqm43jto00bv8z3luw5l72an", quantity: 1, unitPrice: 63.92, vatRate: 15.01, vatAmount: 8.34, total: 63.92 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sbe008ogtzfihdybb0c" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sbe008ogtzfihdybb0c", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "3995c0c6-05d6-413c-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 434.78, vatAmount: 65.22, total: 500, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sbe008qgtzfixwrfayz", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 1, unitPrice: 500, vatRate: 15, vatAmount: 65.22, total: 500 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sbh008sgtzfdcaa68or" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sbh008sgtzfdcaa68or", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "17cee513-cfbb-44a3-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sbh008ugtzfo7e14f5m", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sbl008wgtzfg7f3lrj7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sbl008wgtzfg7f3lrj7", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "05350a1a-a44f-4b33-b", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sbl008ygtzfr07joe3l", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sbq0090gtzfpor7ruem" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sbq0090gtzfpor7ruem", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "52953e84-8348-41a4-9", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 78.23, vatAmount: 11.74, total: 89.97, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sbq0092gtzf08eourwm", itemId: "cmqm43ju600cd8z3l11pw8hy9", quantity: 1, unitPrice: 89.97, vatRate: 15.01, vatAmount: 11.74, total: 89.97 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sbt0094gtzfwpwfuyx7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sbt0094gtzfwpwfuyx7", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "4084a50c-f38e-40d5-8", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1361.62, vatAmount: 204.24, total: 1565.86, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sbt0096gtzfvjxmb6uf", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 1, unitPrice: 1565.86, vatRate: 15, vatAmount: 204.24, total: 1565.86 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sbx0098gtzf3li3fvda" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sbx0098gtzf3li3fvda", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "37ae8b08-ca25-4b0c-9", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sbx009agtzfsseczw5i", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sc3009cgtzfiegs23at" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sc3009cgtzfiegs23at", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "983dd2b1-f7ba-4f77-9", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2157.3, vatAmount: 323.59, total: 2480.89, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sc3009egtzflcs4irx6", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 90, unitPrice: 13.05, vatRate: 15, vatAmount: 176.17, total: 1350.67 },
          { id: "cmqm47sc3009fgtzfuqx3lr3t", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.38, vatRate: 15, vatAmount: 147.42, total: 1130.22 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sc8009hgtzfxpddsqbl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sc8009hgtzfxpddsqbl", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "9b9110db-2ee0-40c9-8", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sc8009jgtzfav36jjx6", itemId: "cmqm43juu00cw8z3l64x30cd5", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sce009lgtzf2b2pcktf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sce009lgtzf2b2pcktf", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "95b8742a-2abc-4ded-b", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 5123.15, vatAmount: 768.47, total: 5891.62, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sce009ngtzfa6xyo15q", itemId: "cmqm43jv100d28z3lu5jlcfme", quantity: 1, unitPrice: 1580.33, vatRate: 15, vatAmount: 237.05, total: 1817.38 },
          { id: "cmqm47sce009ogtzfaa2s7s2f", itemId: "cmqm43jv400d48z3l9lyvkcju", quantity: 1, unitPrice: 1271, vatRate: 15, vatAmount: 190.65, total: 1461.65 },
          { id: "cmqm47sce009pgtzf1d44et8y", itemId: "cmqm43jv700d68z3l7lj8lwec", quantity: 1, unitPrice: 1209.8, vatRate: 15, vatAmount: 181.47, total: 1391.27 },
          { id: "cmqm47sce009qgtzfb13m8ava", itemId: "cmqm43jvb00d88z3lpbnlfbny", quantity: 1, unitPrice: 1062.02, vatRate: 15, vatAmount: 159.3, total: 1221.32 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sci009sgtzfxf4q84v6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sci009sgtzfxf4q84v6", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "f11f498e-c707-4630-9", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 15, vatAmount: 2.25, total: 17.25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sci009ugtzf98t7n54h", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 15, vatRate: 15, vatAmount: 2.25, total: 17.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47scn009wgtzfomvrhzvj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47scn009wgtzfomvrhzvj", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "a14bdf95-65d6-4bdf-b", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 55.63, vatAmount: 8.35, total: 63.98, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47scn009ygtzf2dzkj4so", itemId: "cmqm43jvq00dn8z3lhvbpgg2d", quantity: 2, unitPrice: 31.99, vatRate: 15.01, vatAmount: 8.35, total: 63.98 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47scr00a0gtzfgf47u5oh" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47scr00a0gtzfgf47u5oh", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jvy00dt8z3lks39x36p", invoiceNumber: "3d70942c-0345-4be4-a", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 770, vatAmount: 115.5, total: 885.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47scr00a2gtzfh7oxq43p", itemId: "cmqm43js300aa8z3l90z0h4ge", quantity: 20, unitPrice: 38.5, vatRate: 15, vatAmount: 115.5, total: 885.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47scv00a4gtzf2vnqj9m2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47scv00a4gtzf2vnqj9m2", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "be2bfcc2-07ec-420f-8", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 504.4, vatAmount: 75.66, total: 580.06, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47scv00a6gtzfhmq2p7hd", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 40, unitPrice: 10.87, vatRate: 15, vatAmount: 65.22, total: 500.02 },
          { id: "cmqm47scv00a7gtzfwqhbzo0r", itemId: "cmqm43jw600dz8z3lwnzlpxy9", quantity: 10, unitPrice: 6.96, vatRate: 15, vatAmount: 10.44, total: 80.04 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sd100a9gtzfacyxm4t3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sd100a9gtzfacyxm4t3", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "06532239-a378-490b-b", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 160, vatAmount: 0, total: 160, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sd100abgtzfjykwwwal", itemId: "cmqm43jwf00e68z3lfm0n1xkn", quantity: 1, unitPrice: 150, vatRate: 0, vatAmount: 0, total: 150 },
          { id: "cmqm47sd100acgtzfkwjvuorg", itemId: "cmqm43jwf00e68z3lfm0n1xkn", quantity: 1, unitPrice: 10, vatRate: 0, vatAmount: 0, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sd700aegtzfkfq5ue47" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sd700aegtzfkfq5ue47", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7j300kou8l24l31p1g8", invoiceNumber: "e13f0eff-19e5-420e-b", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 104.35, vatAmount: 15.65, total: 120, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sd700aggtzfvwcp24o9", itemId: "cmqm43jwn00ed8z3lbkxizhb5", quantity: 1, unitPrice: 104.35, vatRate: 15, vatAmount: 15.65, total: 120 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sdc00aigtzfdaxf1aum" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sdc00aigtzfdaxf1aum", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7r200tyu8l22arw1rzb", invoiceNumber: "6ffa213c-2ca4-4da8-9", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3725, vatAmount: 558.75, total: 4283.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sdc00akgtzf8hzszcvx", itemId: "cmqm43jwu00ej8z3l5y2nh4qn", quantity: 1, unitPrice: 4283.75, vatRate: 15, vatAmount: 558.75, total: 4283.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sdg00amgtzfwanp2hxw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sdg00amgtzfwanp2hxw", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "84d9260e-e7f6-4181-8", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 19.83, vatAmount: 2.97, total: 22.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sdg00aogtzf2ry3j3hc", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.83, vatRate: 14.98, vatAmount: 2.97, total: 22.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sdl00aqgtzffpjtf1yy" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sdl00aqgtzffpjtf1yy", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7j300kou8l24l31p1g8", invoiceNumber: "137a5b77-3418-4c9e-a", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 309.57, vatAmount: 46.43, total: 356, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sdl00asgtzfx0maxxgy", itemId: "cmqm43jx400et8z3l3wkgzumg", quantity: 1, unitPrice: 96, vatRate: 15, vatAmount: 12.52, total: 96 },
          { id: "cmqm47sdl00atgtzf4lrxm2vd", itemId: "cmqm43jx800ev8z3lueiahpqe", quantity: 1, unitPrice: 260, vatRate: 15, vatAmount: 33.91, total: 260 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sdp00avgtzfqva106s6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sdp00avgtzfqva106s6", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "a017665d-31db-47a6-8", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 427.83, vatAmount: 64.17, total: 492, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sdp00axgtzfgt1v3oa8", itemId: "cmqm43jxh00f28z3l2q7pgqqv", quantity: 1, unitPrice: 492, vatRate: 15, vatAmount: 64.17, total: 492 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sds00azgtzf8nx238gr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sds00azgtzf8nx238gr", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "751c66fe-ed91-4c48-9", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sds00b1gtzfrp88info", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm47sds00b2gtzfusdykwvt", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sdz00b4gtzfnmkxfy4j" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sdz00b4gtzfnmkxfy4j", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "43d753f0-3181-41cb-b", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1020, vatAmount: 153, total: 1173, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sdz00b6gtzfsxhpm863", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 20, unitPrice: 51, vatRate: 15, vatAmount: 153, total: 1173 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47se200b8gtzf2yxvlskr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47se200b8gtzf2yxvlskr", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "819301ed-cce3-4ae1-9", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47se200bagtzfo3eyayrx", itemId: "cmqm43juu00cw8z3l64x30cd5", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47se500bcgtzfhwptrmne" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47se500bcgtzfhwptrmne", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "d83187b6-566f-4a23-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 326.1, vatAmount: 48.91, total: 375.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47se500begtzfvn8yvthp", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 30, unitPrice: 10.87, vatRate: 15, vatAmount: 48.91, total: 375.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47se800bggtzfsomkn3mg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47se800bggtzfsomkn3mg", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "ede7c171-5149-4d7b-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 3.48, vatAmount: 0.52, total: 4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47se800bigtzfalbpdphg", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.52, total: 4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47seb00bkgtzfbrs7nu1h" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47seb00bkgtzfbrs7nu1h", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "2489afba-faea-45ad-a", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 573.9, vatAmount: 86.08, total: 659.99, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47seb00bmgtzfqvoxwwb2", itemId: "cmqm43jqp00908z3l7rm7fnr3", quantity: 30, unitPrice: 19.13, vatRate: 15, vatAmount: 86.08, total: 659.99 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47see00bogtzfocwo3qrm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47see00bogtzfocwo3qrm", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "93e85b8d-fc82-4d64-a", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1894.68, vatAmount: 284.2, total: 2178.88, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47see00bqgtzfjpytnvt7", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm47see00brgtzfz04xkqrb", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 36, unitPrice: 16.38, vatRate: 15, vatAmount: 88.45, total: 678.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47seh00btgtzfq1qev4jm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47seh00btgtzfq1qev4jm", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "cf602995-4ac5-4b66-9", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 17.24, vatAmount: 2.59, total: 19.83, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47seh00bvgtzf7ynmksh2", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 19.83, vatRate: 15.02, vatAmount: 2.59, total: 19.83 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sek00bxgtzfvja8xpeu" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sek00bxgtzfvja8xpeu", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "ab39bf59-9caa-431c-a", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 68.7, vatAmount: 10.3, total: 79, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sek00bzgtzftvuae44n", itemId: "cmqm43ju600cd8z3l11pw8hy9", quantity: 1, unitPrice: 79, vatRate: 14.99, vatAmount: 10.3, total: 79 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47seq00c1gtzft6kz8a8o" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47seq00c1gtzft6kz8a8o", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jle00458z3lzik8e5od", invoiceNumber: "459f2fa4-1796-4e53-a", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1275, vatAmount: 191.25, total: 1466.25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47seq00c3gtzfjcshreyc", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 25, unitPrice: 51, vatRate: 15, vatAmount: 191.25, total: 1466.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sex00c5gtzfyivdbs0t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sex00c5gtzfyivdbs0t", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3f8858ca-6cb7-4743-b", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1130.63, vatAmount: 169.59, total: 1300.22, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sex00c7gtzfvapcmafp", itemId: "cmqm43jyp00ge8z3lm6zfs7ak", quantity: 1, unitPrice: 1130.63, vatRate: 15, vatAmount: 169.59, total: 1300.22 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sf100c9gtzfla75iebl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sf100c9gtzfla75iebl", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "ec952eed-c78e-4abf-9", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1601.46, vatAmount: 240.22, total: 1841.68, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sf100cbgtzfac8ry8x4", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
          { id: "cmqm47sf100ccgtzfa14sfy8w", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 70, unitPrice: 13.05, vatRate: 15, vatAmount: 137.03, total: 1050.53 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sf400cegtzffo1dda3a" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sf400cegtzffo1dda3a", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "6e946ee9-f423-45d2-9", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sf400cggtzfl2oqgnas", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sf700cigtzf3govxun3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sf700cigtzf3govxun3", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "8d82c230-f92f-4803-b", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 18.22, vatAmount: 2.73, total: 20.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sf700ckgtzf0hm1ut59", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 18.22, vatRate: 14.98, vatAmount: 2.73, total: 20.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sfa00cmgtzfnqc9nhax" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sfa00cmgtzfnqc9nhax", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "91eb9364-66cd-4044-b", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sfa00cogtzfkxfnvkkn", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47sfb00cpgtzf4mga6qp8", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sfd00crgtzf3ad21v6c" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sfd00crgtzf3ad21v6c", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "b6816859-11f8-45cc-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 16.83, vatAmount: 2.52, total: 19.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sfd00ctgtzf3lrta0u7", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 16.83, vatRate: 14.97, vatAmount: 2.52, total: 19.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sfk00cvgtzfpshzsoxw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sfk00cvgtzfpshzsoxw", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "d4c9f598-c5e1-467f-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 217.4, vatAmount: 32.61, total: 250.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sfk00cxgtzf9jawenal", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 20, unitPrice: 10.87, vatRate: 15, vatAmount: 32.61, total: 250.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sfo00czgtzfor0tjbyi" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sfo00czgtzfor0tjbyi", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43joc006w8z3l9sezfou2", invoiceNumber: "6684a8bf-e256-45fd-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 161, vatAmount: 24.15, total: 185.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sfo00d1gtzfmc1pqgj4", itemId: "cmqm43jog006y8z3l3hckxwqq", quantity: 1, unitPrice: 161, vatRate: 15, vatAmount: 24.15, total: 185.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sfq00d3gtzfhxxtt3mv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sfq00d3gtzfhxxtt3mv", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "183ae2ad-bc15-4c28-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 13.22, vatAmount: 1.98, total: 15.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sfq00d5gtzfo5wp6ove", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 13.22, vatRate: 14.98, vatAmount: 1.98, total: 15.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sfu00d7gtzf7ylqzrwq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sfu00d7gtzf7ylqzrwq", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "cba7057c-2519-4628-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 10, vatAmount: 1.5, total: 11.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sfu00d9gtzf2pn9v2w1", itemId: "cmqm43jwf00e68z3lfm0n1xkn", quantity: 1, unitPrice: 10, vatRate: 15, vatAmount: 1.5, total: 11.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sfx00dbgtzf5c6r5dq2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sfx00dbgtzf5c6r5dq2", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "38a398ef-bea6-4b0d-8", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sfx00ddgtzf12userkr", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sg100dfgtzfj3tv84hw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sg100dfgtzfj3tv84hw", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "2c8cee09-e31d-48de-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 849.65, vatAmount: 127.45, total: 977.1, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sg100dhgtzfwm1r535f", itemId: "cmqm43jzy00hq8z3lvvfdn1i6", quantity: 1, unitPrice: 849.65, vatRate: 15, vatAmount: 127.45, total: 977.1 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sg400djgtzfknoufude" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sg400djgtzfknoufude", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "d03a5c9e-5e55-4e19-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1045.62, vatAmount: 156.85, total: 1202.47, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sg400dlgtzfvx37c0m9", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 24, unitPrice: 16.38, vatRate: 15, vatAmount: 58.97, total: 452.09 },
          { id: "cmqm47sg400dmgtzf5v6yr50e", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 50, unitPrice: 13.05, vatRate: 15, vatAmount: 97.88, total: 750.38 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sgb00dogtzfuwdmlmdf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sgb00dogtzfuwdmlmdf", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "ba763c8d-6a56-47fd-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 6, vatAmount: 0, total: 6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sgc00dqgtzff1skabxa", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 6, vatRate: 0, vatAmount: 0, total: 6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sge00dsgtzf995velrk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sge00dsgtzf995velrk", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "6c6631b1-652f-4e07-8", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sge00dugtzfsxijsz2e", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sgh00dwgtzfksrui89b" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sgh00dwgtzfksrui89b", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "0a9d528e-5052-4816-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 69.57, vatAmount: 10.43, total: 80, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sgi00dygtzfb7jy31or", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47sgi00dzgtzfne4xaqon", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 15, vatAmount: 9.13, total: 70 },
          { id: "cmqm47sgi00e0gtzfdazxsmok", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sgn00e2gtzf3yxf1s16" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sgn00e2gtzf3yxf1s16", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "717ce47f-9401-4e87-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sgn00e4gtzfv7c5ypif", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sgv00e6gtzf9o0351y3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sgv00e6gtzf9o0351y3", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "406bfe3e-2a8d-4fa2-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 100, vatAmount: 0, total: 100, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sgv00e8gtzfbbbm991b", itemId: "cmqm43k0l00ij8z3l7wo2jlig", quantity: 1, unitPrice: 100, vatRate: 0, vatAmount: 0, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sh200eagtzf74q18rp0" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sh200eagtzf74q18rp0", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43k0u00ip8z3ltygl5yfu", invoiceNumber: "f790f8f0-a9df-4215-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 126.09, vatAmount: 18.91, total: 145, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sh200ecgtzfkfldrfj3", itemId: "cmqm43k0x00ir8z3lo3ukhxv2", quantity: 1, unitPrice: 145, vatRate: 15, vatAmount: 18.91, total: 145 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sh500eegtzfa2u6y1sc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sh500eegtzfa2u6y1sc", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "27a7e1ed-dcc5-4ef3-b", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 13.05, vatAmount: 1.95, total: 15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sh500eggtzfqu6y1v7q", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47sh500ehgtzfot6851m6", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
          { id: "cmqm47sh500eigtzfnanm4xpk", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 5, vatRate: 14.94, vatAmount: 0.65, total: 5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47shc00ekgtzfq8559z3g" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47shc00ekgtzfq8559z3g", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "8226fe50-973c-4df7-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 977.33, vatAmount: 146.6, total: 1123.93, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47shc00emgtzfy566jx6l", itemId: "cmqm43k1500j38z3l3c45gvmg", quantity: 1, unitPrice: 977.33, vatRate: 15, vatAmount: 146.6, total: 1123.93 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47shf00eogtzfnobeaerl" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47shf00eogtzfnobeaerl", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "fe4fcf84-640e-49a0-b", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 687.96, vatAmount: 103.19, total: 791.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47shg00eqgtzffc9b2bkm", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47shk00esgtzfmw47h818" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47shk00esgtzfmw47h818", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "e3fe8681-40d0-4bb8-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 660.61, vatAmount: 99.09, total: 759.7, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47shk00eugtzfhylkmvng", itemId: "cmqm43jqp00908z3l7rm7fnr3", quantity: 30, unitPrice: 21.99, vatRate: 15, vatAmount: 86.05, total: 659.7 },
          { id: "cmqm47shk00evgtzfwp554jtq", itemId: "cmqm43k1f00jd8z3lc5ow86zx", quantity: 10, unitPrice: 10, vatRate: 15, vatAmount: 13.04, total: 100 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47shn00exgtzfl5slewy4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47shn00exgtzfl5slewy4", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "8ee66162-f3ae-4cb0-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 226, vatAmount: 33.9, total: 259.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sho00ezgtzfihwiprny", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 226, vatRate: 15, vatAmount: 33.9, total: 259.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47shq00f1gtzfqiz68ah5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47shq00f1gtzfqiz68ah5", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43k0u00ip8z3ltygl5yfu", invoiceNumber: "ea265984-7eba-4bb5-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47shq00f3gtzf8u411t4s", itemId: "cmqm43k0x00ir8z3lo3ukhxv2", quantity: 1, unitPrice: 10, vatRate: 14.94, vatAmount: 1.3, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sht00f5gtzff033psmh" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sht00f5gtzff033psmh", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "8ba4fc33-e310-4f93-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 65.22, vatAmount: 9.78, total: 75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sht00f7gtzfmrzxdfcf", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 75, vatRate: 15, vatAmount: 9.78, total: 75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47shy00f9gtzf143m50jn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47shy00f9gtzf143m50jn", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "2b2cfa12-edc2-46cb-b", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1824, vatAmount: 273.6, total: 2097.6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47shy00fbgtzf5qwuqwom", itemId: "cmqm3x7au00blu8l2eii4g041", quantity: 57, unitPrice: 32, vatRate: 15, vatAmount: 273.6, total: 2097.6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47si300fdgtzfsdnw36c4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47si300fdgtzfsdnw36c4", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "b2e52f46-9f7d-4371-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47si300ffgtzf9dlymbh5", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47si700fhgtzfnaslik2k" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47si700fhgtzfnaslik2k", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "281d9a79-4974-4744-b", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 304.35, vatAmount: 45.65, total: 350, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47si700fjgtzfwq7cyzlp", itemId: "cmqm43jqc008k8z3l3n1hdrpv", quantity: 1, unitPrice: 147.83, vatRate: 15, vatAmount: 22.17, total: 170 },
          { id: "cmqm47si700fkgtzf0gzfkh67", itemId: "cmqm43k2300k48z3lrl0m3rw4", quantity: 1, unitPrice: 156.52, vatRate: 15, vatAmount: 23.48, total: 180 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sib00fmgtzffzugln39" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sib00fmgtzffzugln39", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "8953a784-a599-46f6-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 434.8, vatAmount: 65.22, total: 500.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sib00fogtzfyadubyie", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 40, unitPrice: 10.87, vatRate: 15, vatAmount: 65.22, total: 500.02 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sie00fqgtzfkbg0pqrn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sie00fqgtzfkbg0pqrn", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "b54a06fa-d7fa-4b9f-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1000, vatAmount: 150, total: 1150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sie00fsgtzfo7btiyis", itemId: "cmqm43jli00478z3l4lt0kjcn", quantity: 20, unitPrice: 57.5, vatRate: 15, vatAmount: 150, total: 1150 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sih00fugtzf2oivllli" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sih00fugtzf2oivllli", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "42b225b7-7d06-4fda-b", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1992.96, vatAmount: 298.94, total: 2291.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sih00fwgtzfaaii8tbb", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqm47sih00fxgtzf04oh1d5d", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 42, unitPrice: 16.38, vatRate: 15, vatAmount: 103.19, total: 791.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sik00fzgtzfkmygaq5t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sik00fzgtzfkmygaq5t", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x7hg00ipu8l26bfbwtl8", invoiceNumber: "ee400873-d4b7-4249-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1.74, vatAmount: 0.26, total: 2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sik00g1gtzfe1wbmgjx", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 1.74, vatRate: 14.94, vatAmount: 0.26, total: 2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sip00g3gtzftiynid4c" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sip00g3gtzftiynid4c", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "06a6db0f-d57d-4bde-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1061, vatAmount: 159.15, total: 1220.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sip00g5gtzfoy0kb375", itemId: "cmqm43k2n00ks8z3lzqsnt1cz", quantity: 1, unitPrice: 1061, vatRate: 15, vatAmount: 159.15, total: 1220.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47siu00g7gtzfkcjmk22u" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47siu00g7gtzfkcjmk22u", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "305c001b-f957-4162-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5, vatAmount: 0.75, total: 5.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47siu00g9gtzf1ou53xm5", itemId: "cmqm43k2s00ky8z3lb6n8qkfi", quantity: 1, unitPrice: 5, vatRate: 15, vatAmount: 0.75, total: 5.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47siy00gbgtzfjgagyom3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47siy00gbgtzfjgagyom3", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "15bb2fbf-c30a-456c-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 69.48, vatAmount: 10.42, total: 79.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47siy00gdgtzfixewzkbm", itemId: "cmqm43k2y00l48z3ltkhvdeq5", quantity: 1, unitPrice: 79.9, vatRate: 15, vatAmount: 10.42, total: 79.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sj100gfgtzf3qle3df5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sj100gfgtzf3qle3df5", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "adcdd831-d56a-44b5-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 95.83, vatAmount: 14.37, total: 110.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sj100ghgtzf13tpbki1", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 110.2, vatRate: 15, vatAmount: 14.37, total: 110.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sj400gjgtzfc33tanrm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sj400gjgtzfc33tanrm", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "412ba580-a88f-4dcf-b", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 250, vatAmount: 0, total: 250, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sj400glgtzfs2wx64t6", itemId: "cmqm43jt400ba8z3lgbk4a58q", quantity: 1, unitPrice: 250, vatRate: 0, vatAmount: 0, total: 250 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sj700gngtzf4j98qo7f" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sj700gngtzf4j98qo7f", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "0be48d17-48ec-4e1e-b", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8.7, vatAmount: 1.3, total: 10, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sj700gpgtzfimwx4edq", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 2, unitPrice: 5, vatRate: 14.94, vatAmount: 1.3, total: 10 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sja00grgtzftzhzec2i" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sja00grgtzftzhzec2i", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "fb10561e-ea52-49ae-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "NON_TAX", paymentMethod: "CASH", subtotal: 42, vatAmount: 0, total: 42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sja00gtgtzfle7bqr0a", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 42, vatRate: 0, vatAmount: 0, total: 42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sjf00gvgtzfotxgi8z8" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sjf00gvgtzfotxgi8z8", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "3758312f-c25d-47b7-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 946.58, vatAmount: 141.99, total: 1088.57, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sjf00gxgtzfcbwpevur", itemId: "cmqm43k3k00lq8z3llztmjoql", quantity: 1, unitPrice: 946.58, vatRate: 15, vatAmount: 141.99, total: 1088.57 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sji00gzgtzfmvuhat5l" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sji00gzgtzfmvuhat5l", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "5e5381c9-c4f5-4676-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 185, vatAmount: 27.75, total: 212.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sji00h1gtzfm5l1q4dw", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 185, vatRate: 15, vatAmount: 27.75, total: 212.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sjn00h3gtzfvcia5vs4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sjn00h3gtzfvcia5vs4", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jk900318z3lurdbxxe5", invoiceNumber: "cbd8a54e-5a86-455f-8", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 20.83, vatAmount: 3.12, total: 23.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sjo00h5gtzfzeo6wh4k", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 23.95, vatRate: 14.98, vatAmount: 3.12, total: 23.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sjr00h7gtzf7m91hg9f" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sjr00h7gtzf7m91hg9f", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jnq00698z3luuwraec4", invoiceNumber: "b8d73f82-5b75-4b6c-8", invoiceDate: new Date("2026-06-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 434.8, vatAmount: 65.22, total: 500.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sjr00h9gtzfnq6c9wu4", itemId: "cmqm43jnt006b8z3lnbr6p9d6", quantity: 40, unitPrice: 10.87, vatRate: 15, vatAmount: 65.22, total: 500.02 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqm47sju00hbgtzfw7eksmco" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqm47sju00hbgtzfw7eksmco", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", supplierId: "cmqm43jvn00dl8z3llxb4ware", invoiceNumber: "6a02963e-16a2-465a-9", invoiceDate: new Date("2026-06-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 36.5, vatAmount: 5.48, total: 41.98, createdBy: 'migration',
        lines: { create: [
          { id: "cmqm47sju00hdgtzffmhqdy6c", itemId: "cmqm43k2y00l48z3ltkhvdeq5", quantity: 1, unitPrice: 41.98, vatRate: 15.01, vatAmount: 5.48, total: 41.98 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupscm000113qyw86jxd0r" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupscm000113qyw86jxd0r", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "4932d095-8238-421e-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 6839.8, vatAmount: 1025.98, total: 7865.78, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupscm000313qy3aakwqx7", itemId: "cmqm3x73w004zu8l25tipfu37", quantity: 1, unitPrice: 56.53, vatRate: 15, vatAmount: 8.48, total: 65.01 },
          { id: "cmqmupscm000413qyvv9y78ra", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 30, unitPrice: 99.15, vatRate: 15, vatAmount: 446.18, total: 3420.68 },
          { id: "cmqmupscm000513qyzkukbrfi", itemId: "cmqm3x72j0041u8l2p2x7gndc", quantity: 2, unitPrice: 50, vatRate: 15, vatAmount: 15, total: 115 },
          { id: "cmqmupscm000613qylovgqgpi", itemId: "cmqm3x7460057u8l27n3zqtqu", quantity: 2, unitPrice: 105.22, vatRate: 15, vatAmount: 31.57, total: 242.01 },
          { id: "cmqmupscm000713qy8yv9qmtb", itemId: "cmqm3x7l500n1u8l2lq0by91w", quantity: 2, unitPrice: 107, vatRate: 15, vatAmount: 32.1, total: 246.1 },
          { id: "cmqmupscm000813qye1pyjwz0", itemId: "cmqm3x73y0051u8l2isuonrqc", quantity: 1, unitPrice: 55, vatRate: 15, vatAmount: 8.25, total: 63.25 },
          { id: "cmqmupscm000913qyjuj4gwpz", itemId: "cmqm3x73t004xu8l28mc450ss", quantity: 1, unitPrice: 460, vatRate: 15, vatAmount: 69, total: 529 },
          { id: "cmqmupscm000a13qywy5m8rqm", itemId: "cmqm3x72s0047u8l2kjvfd299", quantity: 2, unitPrice: 46.09, vatRate: 15, vatAmount: 13.83, total: 106.01 },
          { id: "cmqmupscm000b13qyrgnnldld", itemId: "cmqm3x738004hu8l2kvfdcp71", quantity: 2, unitPrice: 12, vatRate: 15, vatAmount: 3.6, total: 27.6 },
          { id: "cmqmupscn000c13qy7alsihpu", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 148, vatRate: 15, vatAmount: 22.2, total: 170.2 },
          { id: "cmqmupscn000d13qydvtbym5e", itemId: "cmqm3x7430055u8l2arnjbhjj", quantity: 4, unitPrice: 67, vatRate: 15, vatAmount: 40.2, total: 308.2 },
          { id: "cmqmupscn000e13qyy9zytsf3", itemId: "cmqm3x7l800n3u8l2bhmcd473", quantity: 8, unitPrice: 130, vatRate: 15, vatAmount: 156, total: 1196 },
          { id: "cmqmupscn000f13qy4ilf72oj", itemId: "cmqm3x7l000mxu8l2n34s3lny", quantity: 2, unitPrice: 21.74, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqmupscn000g13qyex7igw5a", itemId: "cmqm3x7kv00mtu8l2jdvyjw4j", quantity: 0.5, unitPrice: 400, vatRate: 15, vatAmount: 30, total: 230 },
          { id: "cmqmupscn000h13qymegksz5a", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 10, unitPrice: 50.44, vatRate: 15, vatAmount: 75.66, total: 580.06 },
          { id: "cmqmupscn000i13qytxo5fgu9", itemId: "cmqm3x72p0045u8l22g9qdtv5", quantity: 3, unitPrice: 100, vatRate: 15, vatAmount: 45, total: 345 },
          { id: "cmqmupscn000j13qy2c67r0qq", itemId: "cmqm3x7ks00mru8l2z30kpetw", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqmupscn000k13qyov0neola", itemId: "cmqm3x7lg00n9u8l21h3ybhwm", quantity: 1, unitPrice: 42, vatRate: 15, vatAmount: 6.3, total: 48.3 },
          { id: "cmqmupscn000l13qyiuvej0d0", itemId: "cmqmuo7rg0001z47ipuq91myk", quantity: 1, unitPrice: 22, vatRate: 15, vatAmount: 3.3, total: 25.3 },
          { id: "cmqmupscn000m13qyqws8fj8a", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 38.27, vatRate: 15, vatAmount: 5.74, total: 44.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupscz000o13qy4kmbatri" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupscz000o13qy4kmbatri", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "a60a412d-1364-4ab8-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3820.5, vatAmount: 573.08, total: 4393.58, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsd0000q13qyrtkuu4bi", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.35, vatRate: 15, vatAmount: 220.73, total: 1692.23 },
          { id: "cmqmupsd0000r13qyxmmd3kdc", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 180, unitPrice: 13.05, vatRate: 15, vatAmount: 352.35, total: 2701.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsd3000t13qyb6u7hdgc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsd3000t13qyb6u7hdgc", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "9b4e56e2-da3d-4cbe-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 143.91, vatAmount: 21.58, total: 165.49, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsd4000v13qyj6y6zvut", itemId: "cmqmuo7s30007z47i0vz4h9qg", quantity: 1, unitPrice: 70, vatRate: 15, vatAmount: 10.5, total: 80.5 },
          { id: "cmqmupsd4000w13qyszzuthp3", itemId: "cmqmuo7s50009z47i4jwijj5y", quantity: 1, unitPrice: 43.48, vatRate: 15, vatAmount: 6.52, total: 50 },
          { id: "cmqmupsd4000x13qy63xaigco", itemId: "cmqmuo7s7000bz47i3cne2e6c", quantity: 1, unitPrice: 30.43, vatRate: 15, vatAmount: 4.56, total: 34.99 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsd7000z13qyvkyrwg11" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsd7000z13qyvkyrwg11", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "30799eae-ff4d-4c46-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2304, vatAmount: 345.6, total: 2649.6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsd7001113qypi8qxag9", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 192, unitPrice: 12, vatRate: 15, vatAmount: 345.6, total: 2649.6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsda001313qyp5ndfsmj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsda001313qyp5ndfsmj", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "4c83f8d1-828e-4108-9", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 587.5, vatAmount: 88.13, total: 675.63, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsda001513qyy5gz5spa", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 50, unitPrice: 11.75, vatRate: 15, vatAmount: 88.13, total: 675.63 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsdd001713qy0gp9ij0z" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsdd001713qy0gp9ij0z", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "ffb5ec35-1523-418c-9", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 115, vatAmount: 15, total: 130, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsde001913qyjbaoownl", itemId: "cmqm3x7710088u8l2rrlzplkq", quantity: 1, unitPrice: 115, vatRate: 13, vatAmount: 15, total: 130 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsdh001b13qyt3m4dc2g" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsdh001b13qyt3m4dc2g", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "b1efc804-45ab-46d9-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 3300, vatAmount: 0, total: 3300, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsdh001d13qyr1h615b3", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 2, unitPrice: 1650, vatRate: 0, vatAmount: 0, total: 3300 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsdl001f13qy7z8rynvz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsdl001f13qy7z8rynvz", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "72cc3645-cbaa-4b40-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1193, vatAmount: 178.95, total: 1371.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsdl001h13qy4p8exuzj", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1193, vatRate: 15, vatAmount: 178.95, total: 1371.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsdo001j13qy4qxvmb3b" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsdo001j13qy4qxvmb3b", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "b9c53d16-635d-43c1-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 123.2, vatAmount: 18.48, total: 141.68, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsdo001l13qyk915xusp", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 61.6, vatRate: 15, vatAmount: 18.48, total: 141.68 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsdr001n13qy9xllg8yt" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsdr001n13qy9xllg8yt", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x777008eu8l27khngb85", invoiceNumber: "80ea3243-855a-4ba6-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 4751.55, vatAmount: 619.77, total: 5371.32, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsdr001p13qy26f7dypp", itemId: "cmqmuo7sg000rz47iruhqgbv6", quantity: 1, unitPrice: 4751.55, vatRate: 13, vatAmount: 619.77, total: 5371.32 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsdu001r13qyv0wgiq7g" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsdu001r13qyv0wgiq7g", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "2a2ba947-2b8e-4ba9-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2115, vatAmount: 317.25, total: 2432.25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsdu001t13qya30u1xpx", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 180, unitPrice: 11.75, vatRate: 15, vatAmount: 317.25, total: 2432.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsdx001v13qy4baoznvd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsdx001v13qy4baoznvd", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "59394559-5233-4347-a", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4475.7, vatAmount: 671.35, total: 5147.05, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsdx001x13qyduictdy5", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
          { id: "cmqmupsdx001y13qyfbtsw8gm", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 230, unitPrice: 13.05, vatRate: 15, vatAmount: 450.22, total: 3451.72 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupse0002013qyjngzoebq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupse0002013qyjngzoebq", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x79o00afu8l2tvhcu3vi", invoiceNumber: "ace10a0d-c6b7-4186-a", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 12381.9, vatAmount: 1615.03, total: 13996.93, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupse0002213qyk1hixmh9", itemId: "cmqmuo7sl000zz47ibnuhydxq", quantity: 1, unitPrice: 12381.9, vatRate: 13, vatAmount: 1615.03, total: 13996.93 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupse3002413qyhzyxosxz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupse3002413qyhzyxosxz", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "ecd8239f-b11c-40a5-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 174.06, vatAmount: 26.11, total: 200.17, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupse3002613qys2nx5acy", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
          { id: "cmqmupse3002713qypx9wdpo1", itemId: "cmqm3x7600077u8l21olb9tsw", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupse6002913qy8y6ecwz1" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupse6002913qy8y6ecwz1", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "32e0cb2d-904c-4eb0-9", invoiceDate: new Date("2026-06-02T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3312, vatAmount: 496.8, total: 3808.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupse6002b13qyy7pmsvwe", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 276, unitPrice: 12, vatRate: 15, vatAmount: 496.8, total: 3808.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsea002d13qykeogjntm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsea002d13qykeogjntm", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "d964a8c6-f8f7-469d-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1056, vatAmount: 158.4, total: 1214.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsea002f13qyqcahd53a", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 88, unitPrice: 12, vatRate: 15, vatAmount: 158.4, total: 1214.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsed002h13qycfhyt2tx" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsed002h13qycfhyt2tx", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "7e207f1a-af11-4f36-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4536, vatAmount: 680.4, total: 5216.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsed002j13qyvgzzunlt", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 378, unitPrice: 12, vatRate: 15, vatAmount: 680.4, total: 5216.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsef002l13qy4qowmmrn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsef002l13qy4qowmmrn", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x76k007tu8l2ahspyra6", invoiceNumber: "2e2296f7-f026-4896-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 180, vatAmount: 23.48, total: 203.48, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsef002n13qy7ez8b381", itemId: "cmqm3x76n007vu8l2fumstav2", quantity: 1, unitPrice: 180, vatRate: 13, vatAmount: 23.48, total: 203.48 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsei002p13qy71cwou6i" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsei002p13qy71cwou6i", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "448dd7bd-26d9-45ec-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1762.5, vatAmount: 264.38, total: 2026.88, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsei002r13qyuhbz1dr5", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 150, unitPrice: 11.75, vatRate: 15, vatAmount: 264.38, total: 2026.88 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsel002t13qy8wnftteu" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsel002t13qy8wnftteu", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "0f27aae4-b523-4705-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1705, vatAmount: 255.75, total: 1960.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsel002v13qyhqc8unj0", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1705, vatRate: 15, vatAmount: 255.75, total: 1960.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsen002x13qyqgwjnbn0" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsen002x13qyqgwjnbn0", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "f627e57d-2779-43f9-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4111.8, vatAmount: 616.76, total: 4728.56, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsen002z13qysugtcoxx", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 30, unitPrice: 14.19, vatRate: 15, vatAmount: 63.85, total: 489.55 },
          { id: "cmqmupsen003013qy2dkscmkz", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 170, unitPrice: 13.05, vatRate: 15, vatAmount: 332.77, total: 2551.27 },
          { id: "cmqmupsen003113qy7h2dinkv", itemId: "cmqm3x7qh00t7u8l2l8tlzgke", quantity: 6, unitPrice: 15.28, vatRate: 15, vatAmount: 13.75, total: 105.43 },
          { id: "cmqmupsen003213qywze2vq6z", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 84, unitPrice: 16.38, vatRate: 15, vatAmount: 206.39, total: 1582.31 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupseq003413qyd26fdic6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupseq003413qyd26fdic6", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "20850594-4ba8-44b4-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 558, vatAmount: 72.78, total: 630.78, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupseq003613qy3ruggd96", itemId: "cmqmuo7su001jz47ivw8m6pd9", quantity: 1, unitPrice: 558, vatRate: 13, vatAmount: 72.78, total: 630.78 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupset003813qykmb54kwm" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupset003813qykmb54kwm", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "21980146-7015-42e9-9", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 650, vatAmount: 84.76, total: 734.76, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupset003a13qyi0reoyrz", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmupset003b13qy9td7qetp", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 13, vatAmount: 13.04, total: 113.04 },
          { id: "cmqmupset003c13qyjx1bxje7", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmupset003d13qyzs9b0gt4", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 13, vatAmount: 13.04, total: 113.04 },
          { id: "cmqmupset003e13qyczf7gfdr", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmupset003f13qyfsnbzyrc", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmupset003g13qyjiuwr1lr", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 13, vatAmount: 13.04, total: 113.04 },
          { id: "cmqmupset003h13qywtlxuqqb", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmupset003i13qyvqr2xmj4", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 100, vatRate: 13, vatAmount: 13.04, total: 113.04 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsey003k13qy7h6mwkw5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsey003k13qy7h6mwkw5", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "78adfb3c-da7f-4305-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2400, vatAmount: 360, total: 2760, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsey003m13qy6isczzsz", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 12, vatRate: 15, vatAmount: 360, total: 2760 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsf0003o13qyjlp6zq8r" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsf0003o13qyjlp6zq8r", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "a35a7042-5409-4cc3-8", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1760, vatAmount: 264, total: 2024, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsf0003q13qydyk25tgi", itemId: "cmqm3x7au00blu8l2eii4g041", quantity: 55, unitPrice: 32, vatRate: 15, vatAmount: 264, total: 2024 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsf3003s13qykr6qbr5f" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsf3003s13qykr6qbr5f", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "e22043dd-9807-4f05-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1938.75, vatAmount: 290.81, total: 2229.56, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsf3003u13qyyukufxaa", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 165, unitPrice: 11.75, vatRate: 15, vatAmount: 290.81, total: 2229.56 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsf6003w13qy38kdokha" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsf6003w13qy38kdokha", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "0a4464d7-d33d-4eb0-b", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1471.5, vatAmount: 220.73, total: 1692.23, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsf6003y13qytqjv1uys", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.35, vatRate: 15, vatAmount: 220.73, total: 1692.23 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsf9004013qybddkx3yu" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsf9004013qybddkx3yu", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "e1d945a3-2bf3-449b-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2204.4, vatAmount: 330.65, total: 2535.05, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsf9004213qydbnjs0ei", itemId: "cmqm3x78g009iu8l2a5l6u2jq", quantity: 30, unitPrice: 10.15, vatRate: 15, vatAmount: 45.67, total: 350.17 },
          { id: "cmqmupsf9004313qyskrh94jl", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
          { id: "cmqmupsf9004413qyclsm2m4a", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 30, unitPrice: 14.19, vatRate: 15, vatAmount: 63.85, total: 489.55 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsfc004613qystvrus1h" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsfc004613qystvrus1h", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "a5f615da-965b-4f50-b", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1539.5, vatAmount: 230.92, total: 1770.42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsfc004813qyxisa9jzo", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1539.5, vatRate: 15, vatAmount: 230.92, total: 1770.42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsfg004a13qy4m7g4srv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsfg004a13qy4m7g4srv", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x7a600awu8l2y2lnyem8", invoiceNumber: "6f9441e7-7e16-44a5-9", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1100.25, vatAmount: 143.51, total: 1243.76, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsfg004c13qyra326xpa", itemId: "cmqm3x7kv00mtu8l2jdvyjw4j", quantity: 1, unitPrice: 1100.25, vatRate: 13, vatAmount: 143.51, total: 1243.76 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsfj004e13qyvnadmace" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsfj004e13qyvnadmace", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "2abe6646-3e08-461b-a", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 147.5, vatAmount: 22.12, total: 169.62, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsfj004g13qy5gv3bhli", itemId: "cmqm3x76e007hu8l248vh3dh7", quantity: 16, unitPrice: 4.73, vatRate: 15, vatAmount: 11.35, total: 87.03 },
          { id: "cmqmupsfj004h13qywydydkqf", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsfm004j13qy2v4y2hpy" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsfm004j13qy2v4y2hpy", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "55afb4f9-9f5b-445b-8", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4728, vatAmount: 709.2, total: 5437.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsfm004l13qyewstx1jg", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 394, unitPrice: 12, vatRate: 15, vatAmount: 709.2, total: 5437.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsfp004n13qyfepxywc2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsfp004n13qyfepxywc2", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "c35046ad-c4f9-428a-a", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1899.9, vatAmount: 284.98, total: 2184.88, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsfp004p13qyrqxv3lwl", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
          { id: "cmqmupsfp004q13qyhxla5kzb", itemId: "cmqm3x7ii00jwu8l2g2go64qq", quantity: 30, unitPrice: 14.19, vatRate: 15, vatAmount: 63.85, total: 489.55 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsft004s13qyvx4673k4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsft004s13qyvx4673k4", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x7ej00f0u8l2xc3s1dkc", invoiceNumber: "8de07ea0-2197-41b9-b", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 11087, vatAmount: 1663.05, total: 12750.05, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsft004u13qy95sgqyg0", itemId: "cmqm3x7em00f2u8l2qkj95mfe", quantity: 50, unitPrice: 221.74, vatRate: 15, vatAmount: 1663.05, total: 12750.05 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsfw004w13qyufljffnc" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsfw004w13qyufljffnc", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "e7eb0cf3-b033-4eb3-a", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 450, vatAmount: 58.7, total: 508.7, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsfw004y13qygxukc0ub", itemId: "cmqmuo7t7002bz47i8juxcz7i", quantity: 1, unitPrice: 450, vatRate: 13, vatAmount: 58.7, total: 508.7 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsfz005013qy3o3kfoi0" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsfz005013qy3o3kfoi0", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x72e003xu8l2nijefayv", invoiceNumber: "22707fca-6c0d-4d7b-a", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 42, vatAmount: 6.3, total: 48.3, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsfz005213qy7rf01ggk", itemId: "cmqm3x73m004ru8l2qr2it4hh", quantity: 1, unitPrice: 42, vatRate: 15, vatAmount: 6.3, total: 48.3 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsg2005413qyb9ynvf8x" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsg2005413qyb9ynvf8x", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "399f8862-fd6d-49cd-a", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2937.5, vatAmount: 440.63, total: 3378.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsg2005613qyo3nnx4s1", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 250, unitPrice: 11.75, vatRate: 15, vatAmount: 440.63, total: 3378.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsg6005813qyo2o2mpc8" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsg6005813qyo2o2mpc8", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "673b6234-5870-4180-a", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1870, vatAmount: 280.5, total: 2150.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsg6005a13qypaenpcqc", itemId: "cmqmuo7tb002jz47i1sskyyg1", quantity: 22, unitPrice: 85, vatRate: 15, vatAmount: 280.5, total: 2150.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsg8005c13qy70rssvgd" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsg8005c13qy70rssvgd", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "c3af2d69-0099-4900-b", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 869.5, vatAmount: 130.42, total: 999.92, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsg8005e13qyw2a7lei9", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 869.5, vatRate: 15, vatAmount: 130.42, total: 999.92 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgb005g13qye5xvgtvz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgb005g13qye5xvgtvz", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "4beab10f-0ab1-4089-9", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 5664, vatAmount: 849.6, total: 6513.6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgb005i13qyue8r7wgs", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 472, unitPrice: 12, vatRate: 15, vatAmount: 849.6, total: 6513.6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgd005k13qyjty4mzs3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgd005k13qyjty4mzs3", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "3467c8f7-97d4-438b-9", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 173.91, vatAmount: 26.09, total: 200, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgd005m13qyr0czll3l", itemId: "cmqmuo7tf002rz47iqc9ccpbq", quantity: 1, unitPrice: 34.78, vatRate: 15, vatAmount: 5.22, total: 40 },
          { id: "cmqmupsgd005n13qye6vhx0s4", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 139.13, vatRate: 15, vatAmount: 20.87, total: 160 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgg005p13qykrzyx3mq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgg005p13qykrzyx3mq", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "ff484929-a0ec-4b2a-a", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2746.2, vatAmount: 411.93, total: 3158.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgg005r13qy4n9aqd5j", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
          { id: "cmqmupsgg005s13qy1mv6lzjw", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 60, unitPrice: 16.38, vatRate: 15, vatAmount: 147.42, total: 1130.22 },
          { id: "cmqmupsgg005t13qy9apeilkf", itemId: "cmqm3x7qh00t7u8l2l8tlzgke", quantity: 30, unitPrice: 15.28, vatRate: 15, vatAmount: 68.76, total: 527.16 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgj005v13qy3jgn089j" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgj005v13qy3jgn089j", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "f7278230-d88a-4511-b", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1761, vatAmount: 264.15, total: 2025.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgj005x13qyikuv3vdr", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 150, unitPrice: 11.74, vatRate: 15, vatAmount: 264.15, total: 2025.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgm005z13qy7tbze5bf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgm005z13qy7tbze5bf", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x71i0033u8l2qndh0z6r", invoiceNumber: "c1141152-c56b-499d-8", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 130, vatAmount: 16.95, total: 146.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgm006113qyrmadw5n4", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmupsgm006213qyg9sw4xps", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 80, vatRate: 13, vatAmount: 10.43, total: 90.43 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgp006413qyktg1eawj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgp006413qyktg1eawj", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x74r0066u8l2y3fvw100", invoiceNumber: "f7c31fa9-dcdd-4dfd-9", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 50, vatAmount: 7.5, total: 57.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgp006613qy93xpgamt", itemId: "cmqmuo7tk0031z47iri0zepb4", quantity: 1, unitPrice: 50, vatRate: 15, vatAmount: 7.5, total: 57.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgs006813qy2hn3l30s" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgs006813qy2hn3l30s", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "d7c0b9c0-a6f2-4e17-b", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 48, vatAmount: 6.26, total: 54.26, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgs006a13qy9uqhfxnp", itemId: "cmqmuo7tm0035z47it60p5grf", quantity: 1, unitPrice: 48, vatRate: 13, vatAmount: 6.26, total: 54.26 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgv006c13qypnbnvx89" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgv006c13qypnbnvx89", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x79o00afu8l2tvhcu3vi", invoiceNumber: "7be04f7f-320e-4b4a-a", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 170, vatAmount: 25.5, total: 195.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgv006e13qykfuopbpp", itemId: "cmqm3x7d100deu8l2ikp46g9z", quantity: 1, unitPrice: 170, vatRate: 15, vatAmount: 25.5, total: 195.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgx006g13qyhgf979f7" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgx006g13qyhgf979f7", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "e1168f0f-1d45-4956-a", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3600, vatAmount: 540, total: 4140, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsgx006i13qyhhsf94tb", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 12, vatRate: 15, vatAmount: 540, total: 4140 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsgz006k13qy9rygtiv4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsgz006k13qy9rygtiv4", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "261a7059-ea31-4160-8", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 254.84, vatAmount: 38.23, total: 293.07, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsh0006m13qyyc7dua2i", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 72, unitPrice: 1.42, vatRate: 15, vatAmount: 15.34, total: 117.58 },
          { id: "cmqmupsh0006n13qymhucp7u5", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 61.6, vatRate: 15, vatAmount: 9.24, total: 70.84 },
          { id: "cmqmupsh0006o13qy3klkwumu", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 10, unitPrice: 9.1, vatRate: 15, vatAmount: 13.65, total: 104.65 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsh2006q13qyzux8wpm2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsh2006q13qyzux8wpm2", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "18d90091-c13a-4750-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 3270.6, vatAmount: 490.59, total: 3761.19, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsh2006s13qyb9gmtlvf", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 120, unitPrice: 16.38, vatRate: 15, vatAmount: 294.84, total: 2260.44 },
          { id: "cmqmupsh2006t13qy0v0m30up", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 100, unitPrice: 13.05, vatRate: 15, vatAmount: 195.75, total: 1500.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsh5006v13qy5nw088qt" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsh5006v13qy5nw088qt", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "93b539a8-8da5-4c19-8", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1205, vatAmount: 180.75, total: 1385.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsh5006x13qywqwdoi4m", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1205, vatRate: 15, vatAmount: 180.75, total: 1385.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsh7006z13qyp9vo9lso" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsh7006z13qyp9vo9lso", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x7hw00j5u8l2kc4np869", invoiceNumber: "d47a3089-a696-4e79-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1750, vatAmount: 228.26, total: 1978.26, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsh8007113qyi921kd4a", itemId: "cmqm3x7i100j9u8l2j49eh3kr", quantity: 50, unitPrice: 35, vatRate: 13, vatAmount: 228.26, total: 1978.26 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshb007313qyzlt4mhes" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshb007313qyzlt4mhes", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "efc0b341-2917-406e-b", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1008, vatAmount: 151.2, total: 1159.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshb007513qyb3t26fjx", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 84, unitPrice: 12, vatRate: 15, vatAmount: 151.2, total: 1159.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshd007713qy1nouxobq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshd007713qy1nouxobq", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "3c5f7e51-b03d-4b40-8", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 362.42, vatAmount: 54.35, total: 416.77, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshd007913qy2zt77t4e", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 35, unitPrice: 2.3, vatRate: 15, vatAmount: 12.07, total: 92.57 },
          { id: "cmqmupshd007a13qyf2ifsr97", itemId: "cmqm3x766007bu8l2a3npvau0", quantity: 6, unitPrice: 11.97, vatRate: 15, vatAmount: 10.77, total: 82.59 },
          { id: "cmqmupshd007b13qyh36nvclu", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 1, unitPrice: 61.6, vatRate: 15, vatAmount: 9.24, total: 70.84 },
          { id: "cmqmupshd007c13qy3ts1ydae", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 30, unitPrice: 1.65, vatRate: 15, vatAmount: 7.42, total: 56.92 },
          { id: "cmqmupshd007d13qypa30fhho", itemId: "cmqm3x768007du8l2xckdpsg8", quantity: 60, unitPrice: 1.65, vatRate: 15, vatAmount: 14.85, total: 113.85 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshg007f13qyquvg85jp" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshg007f13qyquvg85jp", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "0f7e1105-f65a-435e-9", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2385, vatAmount: 357.76, total: 2742.76, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshh007h13qy5kqxgv1c", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 70, unitPrice: 13.05, vatRate: 15, vatAmount: 137.03, total: 1050.53 },
          { id: "cmqmupshh007i13qyrto4krey", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.35, vatRate: 15, vatAmount: 220.73, total: 1692.23 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshj007k13qyqwa0pob9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshj007k13qyqwa0pob9", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "d76fdbd5-cdb6-4efd-a", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 5655, vatAmount: 848.25, total: 6503.25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshj007m13qyp3kfzfno", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 500, unitPrice: 11.31, vatRate: 15, vatAmount: 848.25, total: 6503.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshm007o13qygphuq29d" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshm007o13qygphuq29d", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "fc212987-de4c-4765-a", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1620.5, vatAmount: 243.07, total: 1863.57, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshm007q13qy37u51jyq", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 1620.5, vatRate: 15, vatAmount: 243.07, total: 1863.57 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsho007s13qyrmo4v1ix" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsho007s13qyrmo4v1ix", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "566c13f0-205b-44ac-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 162.4, vatAmount: 24.35, total: 186.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsho007u13qythi2nf71", itemId: "cmqm3x7630079u8l2pk1fehc5", quantity: 9, unitPrice: 9.1, vatRate: 15, vatAmount: 12.28, total: 94.18 },
          { id: "cmqmupsho007v13qy93yfibkm", itemId: "cmqm3x791009yu8l2pzbpdg8b", quantity: 35, unitPrice: 2.3, vatRate: 15, vatAmount: 12.07, total: 92.57 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshr007x13qybvwes439" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshr007x13qybvwes439", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "8f75017f-bf92-4dfa-8", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 90, vatAmount: 11.74, total: 101.74, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshr007z13qyvnbs2ms6", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 90, vatRate: 13, vatAmount: 11.74, total: 101.74 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshv008113qylzcei86m" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshv008113qylzcei86m", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "619c391c-64d2-4cb3-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1474.2, vatAmount: 221.13, total: 1695.33, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshv008313qy9mc39igz", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupshx008513qy7did3568" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupshx008513qy7did3568", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "559127f6-f4f4-4fce-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 216.2, vatAmount: 28.2, total: 244.4, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupshx008713qy2020h2x9", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 162.15, vatRate: 13, vatAmount: 21.15, total: 183.3 },
          { id: "cmqmupshx008813qyr9kpv003", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 54.05, vatRate: 13, vatAmount: 7.05, total: 61.1 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsi0008a13qy1itcsnu4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsi0008a13qy1itcsnu4", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "ffba55c2-13f2-4c28-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 3393, vatAmount: 508.95, total: 3901.95, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsi0008c13qyak1kx42z", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 300, unitPrice: 11.31, vatRate: 15, vatAmount: 508.95, total: 3901.95 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsi3008e13qyzav8swnw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsi3008e13qyzav8swnw", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "e15aff14-0f77-450f-8", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 750, vatAmount: 0, total: 750, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsi3008g13qyerc3z0s9", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 170, vatRate: 0, vatAmount: 0, total: 170 },
          { id: "cmqmupsi3008h13qy051uy20n", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 500, vatRate: 0, vatAmount: 0, total: 500 },
          { id: "cmqmupsi3008i13qyxm5f5rhz", itemId: "cmqm3x7ns00q4u8l2ysiczltp", quantity: 1, unitPrice: 80, vatRate: 0, vatAmount: 0, total: 80 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsi6008k13qynmi6budy" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsi6008k13qynmi6budy", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "702de939-43b2-474d-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4464, vatAmount: 669.6, total: 5133.6, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsi6008m13qyp430s202", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 372, unitPrice: 12, vatRate: 15, vatAmount: 669.6, total: 5133.6 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsi9008o13qynozlrnop" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsi9008o13qynozlrnop", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "1ecf33f4-392c-4ee2-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1474.2, vatAmount: 221.13, total: 1695.33, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsi9008q13qy15f0cdcy", itemId: "cmqm3x757006iu8l2aodtn606", quantity: 90, unitPrice: 16.38, vatRate: 15, vatAmount: 221.13, total: 1695.33 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsic008s13qygx6eju1p" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsic008s13qygx6eju1p", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x7ff00g2u8l24yfu9l09", invoiceNumber: "eedf50b6-4a89-425a-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 86, vatAmount: 12.9, total: 98.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsic008u13qya9zskqe5", itemId: "cmqm3x7fi00g4u8l2mmi8yq7f", quantity: 1, unitPrice: 86, vatRate: 15, vatAmount: 12.9, total: 98.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsie008w13qyygpjxesx" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsie008w13qyygpjxesx", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "c9114909-c331-4b5a-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2827.5, vatAmount: 424.13, total: 3251.63, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsie008y13qys964a381", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 250, unitPrice: 11.31, vatRate: 15, vatAmount: 424.13, total: 3251.63 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsii009013qyp8jarh6t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsii009013qyp8jarh6t", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x7ff00g2u8l24yfu9l09", invoiceNumber: "c3268480-6e83-4d12-b", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 430, vatAmount: 64.5, total: 494.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsii009213qymccfyjk9", itemId: "cmqm3x7fi00g4u8l2mmi8yq7f", quantity: 1, unitPrice: 430, vatRate: 15, vatAmount: 64.5, total: 494.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsil009413qykh710hqq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsil009413qykh710hqq", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "7052c5b4-d4ba-4d64-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 174.53, vatAmount: 22.76, total: 197.29, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsil009613qye49rhpv8", itemId: "cmqmuo7u6004hz47icmn88tds", quantity: 1, unitPrice: 174.53, vatRate: 13, vatAmount: 22.76, total: 197.29 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsin009813qym4lrrnyo" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsin009813qym4lrrnyo", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x75o006zu8l2h0oabe1z", invoiceNumber: "28b3f356-a985-4773-a", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 4752, vatAmount: 712.8, total: 5464.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsio009a13qyyypiio9b", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 396, unitPrice: 12, vatRate: 15, vatAmount: 712.8, total: 5464.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmupsiq009c13qyelbs9wpf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmupsiq009c13qyelbs9wpf", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", supplierId: "cmqm3x78b009eu8l201vi9mad", invoiceNumber: "73eddd70-11e7-4ff6-b", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2600, vatAmount: 339.13, total: 2939.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmupsiq009e13qy6egq0n3d", itemId: "cmqm3x753006gu8l2xnyr3dh9", quantity: 200, unitPrice: 13, vatRate: 13, vatAmount: 339.13, total: 2939.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhsv0001ysv1fi9wtflk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhsv0001ysv1fi9wtflk", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "186051a4-3ef6-4e51-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 61.7, vatAmount: 9.26, total: 70.96, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhsv0003ysv1iirzvzbs", itemId: "cmqm43k2y00l48z3ltkhvdeq5", quantity: 1, unitPrice: 61.7, vatRate: 15, vatAmount: 9.26, total: 70.96 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhtj000fysv1uzuaxfk5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhtj000fysv1uzuaxfk5", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "e88ea338-32b4-40eb-a", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 872.4, vatAmount: 130.86, total: 1003.26, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhtj000hysv1qo81zp0r", itemId: "cmqmuuhta0007ysv1wiu4aojf", quantity: 1, unitPrice: 69, vatRate: 15, vatAmount: 10.35, total: 79.35 },
          { id: "cmqmuuhtj000iysv1fttk9vjy", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 4, unitPrice: 52, vatRate: 15, vatAmount: 31.2, total: 239.2 },
          { id: "cmqmuuhtj000jysv11r9p5hj1", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 137, vatRate: 15, vatAmount: 20.55, total: 157.55 },
          { id: "cmqmuuhtj000kysv18xfh39bg", itemId: "cmqm43jmy005i8z3l9i3digx4", quantity: 2, unitPrice: 46, vatRate: 15, vatAmount: 13.8, total: 105.8 },
          { id: "cmqmuuhtj000lysv19m3enibw", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqmuuhtj000mysv1ukyrjvia", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqmuuhtj000nysv1b847w6sg", itemId: "cmqmuuhtd0009ysv1m0w3ayq7", quantity: 1, unitPrice: 52.2, vatRate: 15, vatAmount: 7.83, total: 60.03 },
          { id: "cmqmuuhtj000oysv139b9ipbm", itemId: "cmqmuuhtf000bysv150ulkwsp", quantity: 2, unitPrice: 26, vatRate: 15, vatAmount: 7.8, total: 59.8 },
          { id: "cmqmuuhtj000pysv10w6tda9i", itemId: "cmqm43jn5005m8z3lgyuif9ms", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqmuuhtj000qysv1vcr9reo7", itemId: "cmqm3x7mh00oru8l2d803xbek", quantity: 1, unitPrice: 65, vatRate: 15, vatAmount: 9.75, total: 74.75 },
          { id: "cmqmuuhtj000rysv1og5tx8xr", itemId: "cmqmuuhth000dysv1wksp9x58", quantity: 4, unitPrice: 13.05, vatRate: 15, vatAmount: 7.83, total: 60.03 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhto000tysv1dj3y04qy" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhto000tysv1dj3y04qy", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "e5444d55-075f-4820-9", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 212.85, vatAmount: 27.76, total: 240.61, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhto000vysv15fve3w81", itemId: "cmqm43k2y00l48z3ltkhvdeq5", quantity: 1, unitPrice: 212.85, vatRate: 13, vatAmount: 27.76, total: 240.61 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhtt000zysv1lrzoq5lg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhtt000zysv1lrzoq5lg", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "00649ef2-b9a2-4636-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 152.17, vatAmount: 22.83, total: 175, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhtt0011ysv11epv0g7b", itemId: "cmqmuuhtr000xysv1j1r171gx", quantity: 1, unitPrice: 152.17, vatRate: 15, vatAmount: 22.83, total: 175 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhtx0015ysv1dnd8ltz0" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhtx0015ysv1dnd8ltz0", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "e8174ba2-769d-4436-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 61, vatAmount: 9.15, total: 70.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhtx0017ysv1jobcqsh8", itemId: "cmqmuuhtv0013ysv18wyadrt5", quantity: 1, unitPrice: 61, vatRate: 15, vatAmount: 9.15, total: 70.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhu1001bysv1cropkqxj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhu1001bysv1cropkqxj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "26caf464-2c6e-40f1-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 879.6, vatAmount: 114.73, total: 994.33, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhu2001dysv1ytz0zeds", itemId: "cmqmuuhu00019ysv1h75sot6c", quantity: 40, unitPrice: 21.99, vatRate: 13, vatAmount: 114.73, total: 994.33 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhu7001hysv1uidzxsu5" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhu7001hysv1uidzxsu5", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "d25b76d6-ca32-4a10-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 270, vatAmount: 35.21, total: 305.21, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhu7001jysv1ms1n2ot2", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 13, vatAmount: 9.13, total: 79.13 },
          { id: "cmqmuuhu7001kysv1q9w9hiqi", itemId: "cmqmuuhu4001fysv1u0c4blhc", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmuuhu7001lysv1woof9vaq", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmuuhu7001mysv1wekq5nuj", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmuuhu7001nysv1sn8p21lk", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhuj0021ysv1sft92csj" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhuj0021ysv1sft92csj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "388d4c3e-17c4-4514-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 150, vatAmount: 0, total: 150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhuj0023ysv1ykiyxdka", itemId: "cmqmuuhua001pysv1ky1v3t2f", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
          { id: "cmqmuuhuj0024ysv1wixpnk2e", itemId: "cmqmuuhuc001rysv1nez01awv", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
          { id: "cmqmuuhuj0025ysv1g3ifschq", itemId: "cmqmuuhud001tysv19ng5qad1", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
          { id: "cmqmuuhuj0026ysv1y1t2ui8v", itemId: "cmqmuuhuf001vysv1z1mkoa1x", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
          { id: "cmqmuuhuj0027ysv1l0q1affv", itemId: "cmqmuuhug001xysv1puqxrsjr", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
          { id: "cmqmuuhuj0028ysv1myueerk3", itemId: "cmqmuuhuh001zysv1w9dve0u2", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhuq002eysv1lrfmt266" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhuq002eysv1lrfmt266", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuhum002aysv1co5zec71", invoiceNumber: "0ca734d8-69b0-4e85-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 140, vatAmount: 18.26, total: 158.26, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhuq002gysv1akkyg4hg", itemId: "cmqmuuhun002cysv1jhz1wrw2", quantity: 1, unitPrice: 140, vatRate: 13, vatAmount: 18.26, total: 158.26 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhut002iysv1t62latm6" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhut002iysv1t62latm6", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "f7386312-ce32-4e93-8", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 800, vatAmount: 0, total: 800, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhut002kysv140a2p2jj", itemId: "cmqm3x7bd00c4u8l25vgveczl", quantity: 1, unitPrice: 800, vatRate: 0, vatAmount: 0, total: 800 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhuw002mysv1ha1hmy5h" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhuw002mysv1ha1hmy5h", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "dd446ddb-fe8c-4122-b", invoiceDate: new Date("2026-06-01T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 280, vatAmount: 42, total: 322, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhuw002oysv1k9mpvkb6", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 280, vatRate: 15, vatAmount: 42, total: 322 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhuy002qysv1ds63rici" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhuy002qysv1ds63rici", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "96a022b0-e4aa-4b35-9", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 1728, vatAmount: 259.2, total: 1987.2, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhuy002sysv1zn6bnq5k", itemId: "cmqm3x7au00blu8l2eii4g041", quantity: 54, unitPrice: 32, vatRate: 15, vatAmount: 259.2, total: 1987.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhv60030ysv1c2763z17" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhv60030ysv1c2763z17", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "ae112dde-0b6e-4601-b", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 910.5, vatAmount: 136.58, total: 1047.08, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhv60032ysv10hrtwywb", itemId: "cmqm43js700ac8z3lys9u0il1", quantity: 1, unitPrice: 150, vatRate: 15, vatAmount: 22.5, total: 172.5 },
          { id: "cmqmuuhv60033ysv1zxujgvss", itemId: "cmqm43jmy005i8z3l9i3digx4", quantity: 2, unitPrice: 46, vatRate: 15, vatAmount: 13.8, total: 105.8 },
          { id: "cmqmuuhv60034ysv1eyfb2qun", itemId: "cmqmuuhv1002uysv1b5gfjew7", quantity: 1, unitPrice: 36.55, vatRate: 15, vatAmount: 5.48, total: 42.03 },
          { id: "cmqmuuhv60035ysv10m1696g6", itemId: "cmqmuuhv2002wysv1ijhgcknx", quantity: 1, unitPrice: 15.65, vatRate: 15, vatAmount: 2.35, total: 18 },
          { id: "cmqmuuhv60036ysv1qk7x7hmh", itemId: "cmqm43jtb00bg8z3ltm7xata4", quantity: 1, unitPrice: 29, vatRate: 15, vatAmount: 4.35, total: 33.35 },
          { id: "cmqmuuhv60037ysv1i7y5lm37", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqmuuhv60038ysv1mznmf99b", itemId: "cmqm3x7430055u8l2arnjbhjj", quantity: 1, unitPrice: 67, vatRate: 15, vatAmount: 10.05, total: 77.05 },
          { id: "cmqmuuhv60039ysv1n38mmxg0", itemId: "cmqmuuhv4002yysv186jqmx3c", quantity: 2, unitPrice: 54, vatRate: 15, vatAmount: 16.2, total: 124.2 },
          { id: "cmqmuuhv6003aysv1n7f2qew0", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 2, unitPrice: 99.15, vatRate: 15, vatAmount: 29.75, total: 228.05 },
          { id: "cmqmuuhv6003bysv1riom1jwm", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 3, unitPrice: 52, vatRate: 15, vatAmount: 23.4, total: 179.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhvj003nysv1kn4xkdwo" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhvj003nysv1kn4xkdwo", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "40491bff-6a68-4858-8", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1005.5, vatAmount: 150.83, total: 1156.33, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhvj003pysv1mupr0oie", itemId: "cmqmuuhva003dysv1v59eoqg1", quantity: 5, unitPrice: 15.22, vatRate: 15, vatAmount: 11.42, total: 87.52 },
          { id: "cmqmuuhvj003qysv12ifwdi2t", itemId: "cmqmuuhvc003fysv107qwue43", quantity: 1, unitPrice: 213, vatRate: 15, vatAmount: 31.95, total: 244.95 },
          { id: "cmqmuuhvj003rysv1b7mrwim7", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 2, unitPrice: 99.15, vatRate: 15, vatAmount: 29.75, total: 228.05 },
          { id: "cmqmuuhvj003sysv1a1fju8iy", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 1, unitPrice: 29, vatRate: 15, vatAmount: 4.35, total: 33.35 },
          { id: "cmqmuuhvj003tysv16j9d3m76", itemId: "cmqmuuhve003hysv1o4rqwgcp", quantity: 2, unitPrice: 10, vatRate: 15, vatAmount: 3, total: 23 },
          { id: "cmqmuuhvj003uysv1psobz2ji", itemId: "cmqmuuhvf003jysv17w0b62cr", quantity: 1, unitPrice: 85, vatRate: 15, vatAmount: 12.75, total: 97.75 },
          { id: "cmqmuuhvj003vysv1xxezizv8", itemId: "cmqm43jna005q8z3li3d3s1l8", quantity: 1, unitPrice: 95, vatRate: 15, vatAmount: 14.25, total: 109.25 },
          { id: "cmqmuuhvj003wysv1r89szbry", itemId: "cmqmuuhvh003lysv19kh2gnq6", quantity: 1, unitPrice: 133.1, vatRate: 15, vatAmount: 19.96, total: 153.06 },
          { id: "cmqmuuhvj003xysv1m8xo98yo", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 3, unitPrice: 52, vatRate: 15, vatAmount: 23.4, total: 179.4 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhvq0043ysv13nslxvft" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhvq0043ysv13nslxvft", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuhvm003zysv1s33k6drh", invoiceNumber: "8eb2d7d9-5e3e-4048-a", invoiceDate: new Date("2026-06-03T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 800, vatAmount: 0, total: 800, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhvq0045ysv1yugg91ey", itemId: "cmqmuuhvo0041ysv19sbmkb7c", quantity: 10, unitPrice: 80, vatRate: 0, vatAmount: 0, total: 800 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhw0004hysv1ma3pic7i" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhw0004hysv1ma3pic7i", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "25a4cc54-11f3-43a0-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1840.08, vatAmount: 276.01, total: 2116.09, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhw1004jysv1wyhregzz", itemId: "cmqm3x7430055u8l2arnjbhjj", quantity: 1, unitPrice: 67, vatRate: 15, vatAmount: 10.05, total: 77.05 },
          { id: "cmqmuuhw1004kysv1tr456tcg", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 2, unitPrice: 135, vatRate: 15, vatAmount: 40.5, total: 310.5 },
          { id: "cmqmuuhw1004lysv17zwvyy5e", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 3, unitPrice: 99.15, vatRate: 15, vatAmount: 44.62, total: 342.07 },
          { id: "cmqmuuhw1004mysv1zxb4gyyb", itemId: "cmqm43jn5005m8z3lgyuif9ms", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqmuuhw1004nysv1qqhmlg85", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 8, unitPrice: 52, vatRate: 15, vatAmount: 62.4, total: 478.4 },
          { id: "cmqmuuhw1004oysv1kdfjzb9w", itemId: "cmqmuuhv4002yysv186jqmx3c", quantity: 2, unitPrice: 54, vatRate: 15, vatAmount: 16.2, total: 124.2 },
          { id: "cmqmuuhw1004pysv1i0rql1hv", itemId: "cmqmuuhvs0047ysv1f6frz9ae", quantity: 1, unitPrice: 18, vatRate: 15, vatAmount: 2.7, total: 20.7 },
          { id: "cmqmuuhw1004qysv1c5tcjnsc", itemId: "cmqmuuhvu0049ysv1obhgw2lh", quantity: 1, unitPrice: 105, vatRate: 15, vatAmount: 15.75, total: 120.75 },
          { id: "cmqmuuhw1004rysv1yzantgkt", itemId: "cmqmuuhvv004bysv1h6kd3t75", quantity: 1, unitPrice: 24.35, vatRate: 15, vatAmount: 3.65, total: 28 },
          { id: "cmqmuuhw1004sysv17vmwq1k3", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqmuuhw1004tysv1f1beqlnz", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 3, unitPrice: 29, vatRate: 15, vatAmount: 13.05, total: 100.05 },
          { id: "cmqmuuhw1004uysv13al9jjfx", itemId: "cmqm3x7mh00oru8l2d803xbek", quantity: 2, unitPrice: 65, vatRate: 15, vatAmount: 19.5, total: 149.5 },
          { id: "cmqmuuhw1004vysv1farpwi8h", itemId: "cmqmuuhvx004dysv146ke3lkm", quantity: 2, unitPrice: 19.14, vatRate: 15, vatAmount: 5.74, total: 44.02 },
          { id: "cmqmuuhw1004wysv1n3d0lc5x", itemId: "cmqmuuhvy004fysv1ti9gdgk3", quantity: 1, unitPrice: 18, vatRate: 15, vatAmount: 2.7, total: 20.7 },
          { id: "cmqmuuhw1004xysv1g026rlky", itemId: "cmqmuuhtf000bysv150ulkwsp", quantity: 1, unitPrice: 26, vatRate: 15, vatAmount: 3.9, total: 29.9 },
          { id: "cmqmuuhw1004yysv174myy6z6", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 148, vatRate: 15, vatAmount: 22.2, total: 170.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhw60050ysv1tip6mbhn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhw60050ysv1tip6mbhn", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "43eccf0f-785b-48f2-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 505, vatAmount: 75.75, total: 580.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhw60052ysv1k2nspuch", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 505, vatRate: 15, vatAmount: 75.75, total: 580.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhw80054ysv164sw1ov9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhw80054ysv164sw1ov9", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x750006eu8l2ee9jmddf", invoiceNumber: "dd662761-da22-48ba-a", invoiceDate: new Date("2026-06-04T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 123.2, vatAmount: 18.48, total: 141.68, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhw80056ysv1f8msfvy3", itemId: "cmqm3x76b007fu8l2ftf08z83", quantity: 2, unitPrice: 61.6, vatRate: 15, vatAmount: 18.48, total: 141.68 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhwb0058ysv1a26p09j9" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhwb0058ysv1a26p09j9", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "6e379920-9c80-42be-9", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 4, vatAmount: 0.52, total: 4.52, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhwb005aysv1z9ea5prr", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 4, vatRate: 13, vatAmount: 0.52, total: 4.52 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhwf005eysv1t9v2xues" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhwf005eysv1t9v2xues", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuhwd005cysv1c72xpr4n", invoiceNumber: "e5a77b17-e968-4203-b", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 9, vatAmount: 1.35, total: 10.35, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhwf005gysv1vp2fy6b8", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 9, vatRate: 15, vatAmount: 1.35, total: 10.35 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhwh005iysv1a7346b6t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhwh005iysv1a7346b6t", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "2673d16c-c25c-4d7f-a", invoiceDate: new Date("2026-06-05T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 230, vatAmount: 34.5, total: 264.5, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhwh005kysv175o39lhm", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 230, vatRate: 15, vatAmount: 34.5, total: 264.5 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhwt005wysv15xx52khv" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhwt005wysv15xx52khv", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "56b83669-db37-4d0d-b", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1153.52, vatAmount: 173.02, total: 1326.54, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhwt005yysv1m867apsc", itemId: "cmqmuuhwk005mysv1a7baj3gr", quantity: 1, unitPrice: 85.22, vatRate: 15, vatAmount: 12.78, total: 98 },
          { id: "cmqmuuhwt005zysv1un3ajri2", itemId: "cmqm43jte00bi8z3l4byq8qqo", quantity: 1, unitPrice: 107, vatRate: 15, vatAmount: 16.05, total: 123.05 },
          { id: "cmqmuuhwt0060ysv1fr55qw8z", itemId: "cmqmuuhwl005oysv10841xu49", quantity: 1, unitPrice: 26, vatRate: 15, vatAmount: 3.9, total: 29.9 },
          { id: "cmqmuuhwt0061ysv1pvinderr", itemId: "cmqm43jqf008m8z3lel3vum9d", quantity: 1, unitPrice: 27, vatRate: 15, vatAmount: 4.05, total: 31.05 },
          { id: "cmqmuuhwt0062ysv1tkraehyp", itemId: "cmqmuuhva003dysv1v59eoqg1", quantity: 5, unitPrice: 15.22, vatRate: 15, vatAmount: 11.42, total: 87.52 },
          { id: "cmqmuuhwt0063ysv1kza1ghf0", itemId: "cmqmuuhwn005qysv195d1nfrf", quantity: 1, unitPrice: 217, vatRate: 15, vatAmount: 32.55, total: 249.55 },
          { id: "cmqmuuhwt0064ysv168ula6wx", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 3, unitPrice: 52, vatRate: 15, vatAmount: 23.4, total: 179.4 },
          { id: "cmqmuuhwt0065ysv1kogpvzsv", itemId: "cmqmuuhv1002uysv1b5gfjew7", quantity: 1, unitPrice: 36.55, vatRate: 15, vatAmount: 5.48, total: 42.03 },
          { id: "cmqmuuhwt0066ysv19ezjfxxn", itemId: "cmqmuuhwo005sysv1ygtsv5ud", quantity: 1, unitPrice: 9, vatRate: 15, vatAmount: 1.35, total: 10.35 },
          { id: "cmqmuuhwt0067ysv1mfmtj8sb", itemId: "cmqm43jqf008m8z3lel3vum9d", quantity: 1, unitPrice: 21, vatRate: 15, vatAmount: 3.15, total: 24.15 },
          { id: "cmqmuuhwt0068ysv1c7sevdrx", itemId: "cmqmuuhv4002yysv186jqmx3c", quantity: 2, unitPrice: 54, vatRate: 15, vatAmount: 16.2, total: 124.2 },
          { id: "cmqmuuhwt0069ysv163s3xrbr", itemId: "cmqmuuhwr005uysv1fopuguao", quantity: 1, unitPrice: 50.5, vatRate: 15, vatAmount: 7.57, total: 58.07 },
          { id: "cmqmuuhwt006aysv16s0p1oo9", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 135, vatRate: 15, vatAmount: 20.25, total: 155.25 },
          { id: "cmqmuuhwt006bysv1a55hffe4", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 1, unitPrice: 99.15, vatRate: 15, vatAmount: 14.87, total: 114.02 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhww006dysv1a3pvdqtq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhww006dysv1a3pvdqtq", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "446940e2-bf29-495e-a", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 217.5, vatAmount: 32.63, total: 250.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhwx006fysv19wrjmhdh", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 217.5, vatRate: 15, vatAmount: 32.63, total: 250.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhwz006hysv107bm28k8" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhwz006hysv107bm28k8", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "9841ec5a-2a9f-4d72-9", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 50, vatAmount: 6.52, total: 56.52, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhwz006jysv1vjmk6rvh", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhx2006lysv1zuq2op15" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhx2006lysv1zuq2op15", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "23584591-c443-4ff0-9", invoiceDate: new Date("2026-06-06T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhx2006nysv1pm7jmw8s", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhx9006tysv1zbcmmlae" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhx9006tysv1zbcmmlae", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "a277fea9-7464-4f11-a", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1295.73, vatAmount: 194.35, total: 1490.08, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhx9006vysv1pz4oy3ie", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 135, vatRate: 15, vatAmount: 20.25, total: 155.25 },
          { id: "cmqmuuhx9006wysv1v3mrmln2", itemId: "cmqm43jmy005i8z3l9i3digx4", quantity: 2, unitPrice: 46, vatRate: 15, vatAmount: 13.8, total: 105.8 },
          { id: "cmqmuuhx9006xysv15wdqlg3i", itemId: "cmqm43jj500258z3lgna76eu2", quantity: 1, unitPrice: 40, vatRate: 15, vatAmount: 6, total: 46 },
          { id: "cmqmuuhx9006yysv1vsce7nj8", itemId: "cmqmuuhx5006pysv11ewmf985", quantity: 1, unitPrice: 247.83, vatRate: 15, vatAmount: 37.17, total: 285 },
          { id: "cmqmuuhx9006zysv1094o9160", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 1, unitPrice: 29, vatRate: 15, vatAmount: 4.35, total: 33.35 },
          { id: "cmqmuuhx90070ysv13nmjioxs", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 145.75, vatRate: 15, vatAmount: 21.86, total: 167.61 },
          { id: "cmqmuuhx90071ysv121tjczxy", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 3, unitPrice: 54, vatRate: 15, vatAmount: 24.3, total: 186.3 },
          { id: "cmqmuuhx90072ysv1dwzjh1iq", itemId: "cmqmuuhx7006rysv1gg64vo7p", quantity: 1, unitPrice: 30, vatRate: 15, vatAmount: 4.5, total: 34.5 },
          { id: "cmqmuuhx90073ysv1p264fuve", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 1, unitPrice: 99.15, vatRate: 15, vatAmount: 14.87, total: 114.02 },
          { id: "cmqmuuhx90074ysv1dmw6xhqq", itemId: "cmqm3x7me00opu8l27q3vzozc", quantity: 1, unitPrice: 220, vatRate: 15, vatAmount: 33, total: 253 },
          { id: "cmqmuuhx90075ysv1w3hppskm", itemId: "cmqm43jna005q8z3li3d3s1l8", quantity: 1, unitPrice: 95, vatRate: 15, vatAmount: 14.25, total: 109.25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhxc0077ysv1yn8fcy7x" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhxc0077ysv1yn8fcy7x", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "6e777642-bed6-4877-8", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhxc0079ysv1a8n7a7io", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhxg007dysv1n61ryi3z" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhxg007dysv1n61ryi3z", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7r200tyu8l22arw1rzb", invoiceNumber: "f74368f0-5a26-4af9-9", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1486.95, vatAmount: 193.95, total: 1680.9, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhxg007fysv1pmjp97h3", itemId: "cmqmuuhxe007bysv15jvbxi5v", quantity: 1, unitPrice: 1486.95, vatRate: 13, vatAmount: 193.95, total: 1680.9 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhxi007hysv1dld6j8bw" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhxi007hysv1dld6j8bw", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "0973d6cb-bbbb-45ff-8", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 120, vatAmount: 15.65, total: 135.65, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhxi007jysv1t8ljngj7", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
          { id: "cmqmuuhxi007kysv13dn4msxi", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 13, vatAmount: 9.13, total: 79.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhxm007mysv1w2qva0na" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhxm007mysv1w2qva0na", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "da6079f3-9f7e-4749-9", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 161, vatAmount: 24.15, total: 185.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhxm007oysv11emsxld2", itemId: "cmqm43jog006y8z3l3hckxwqq", quantity: 1, unitPrice: 161, vatRate: 15, vatAmount: 24.15, total: 185.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhxp007qysv18vbev0mt" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhxp007qysv18vbev0mt", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuhwd005cysv1c72xpr4n", invoiceNumber: "38fd0686-c61e-432d-a", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 6.9, vatAmount: 0.9, total: 7.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhxp007sysv1fltw3a7c", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 6.9, vatRate: 13, vatAmount: 0.9, total: 7.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhxt007wysv11u5k8i1u" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhxt007wysv11u5k8i1u", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "e0a79763-1d00-48a0-a", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 82.52, vatAmount: 10.76, total: 93.28, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhxt007yysv1xxo6zg0b", itemId: "cmqmuuhxs007uysv1wtacpt87", quantity: 1, unitPrice: 82.52, vatRate: 13, vatAmount: 10.76, total: 93.28 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhxy0082ysv1d8vtxi2f" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhxy0082ysv1d8vtxi2f", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jot00798z3l6m6s1mm8", invoiceNumber: "0ca893b2-e181-45da-b", invoiceDate: new Date("2026-06-07T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 2254.28, vatAmount: 338.14, total: 2592.42, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhxy0084ysv1e6obgdzl", itemId: "cmqmuuhxw0080ysv1frafmqan", quantity: 1, unitPrice: 2254.28, vatRate: 15, vatAmount: 338.14, total: 2592.42 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhy20088ysv1ksc97cae" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhy20088ysv1ksc97cae", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "35684662-e97c-48ff-b", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 999.16, vatAmount: 149.87, total: 1149.03, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhy2008aysv1eze4v3x1", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 3, unitPrice: 50, vatRate: 15, vatAmount: 22.5, total: 172.5 },
          { id: "cmqmuuhy2008bysv1hwftv770", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 1, unitPrice: 29, vatRate: 15, vatAmount: 4.35, total: 33.35 },
          { id: "cmqmuuhy2008cysv12aqa8u63", itemId: "cmqm3x7460057u8l27n3zqtqu", quantity: 1, unitPrice: 105.21, vatRate: 15, vatAmount: 15.78, total: 120.99 },
          { id: "cmqmuuhy2008dysv15kqjds1m", itemId: "cmqm43jn2005k8z3llsc7apql", quantity: 1, unitPrice: 68, vatRate: 15, vatAmount: 10.2, total: 78.2 },
          { id: "cmqmuuhy2008eysv1u4l27kyt", itemId: "cmqmuuhva003dysv1v59eoqg1", quantity: 5, unitPrice: 15.22, vatRate: 15, vatAmount: 11.42, total: 87.52 },
          { id: "cmqmuuhy2008fysv1op6hwn9d", itemId: "cmqm43jtb00bg8z3ltm7xata4", quantity: 1, unitPrice: 29, vatRate: 15, vatAmount: 4.35, total: 33.35 },
          { id: "cmqmuuhy2008gysv16q8fdmfg", itemId: "cmqmuuhy00086ysv1fk5o17xm", quantity: 1, unitPrice: 208.7, vatRate: 15, vatAmount: 31.3, total: 240 },
          { id: "cmqmuuhy2008hysv1l4cyeoo1", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 1, unitPrice: 99.15, vatRate: 15, vatAmount: 14.87, total: 114.02 },
          { id: "cmqmuuhy2008iysv1tvrhtg23", itemId: "cmqm43jj200238z3l2oivqw7f", quantity: 1, unitPrice: 135, vatRate: 15, vatAmount: 20.25, total: 155.25 },
          { id: "cmqmuuhy2008jysv1du6jqtik", itemId: "cmqm43jn5005m8z3lgyuif9ms", quantity: 1, unitPrice: 47, vatRate: 15, vatAmount: 7.05, total: 54.05 },
          { id: "cmqmuuhy2008kysv1ju4la0wd", itemId: "cmqm43jiz00218z3lykvljd23", quantity: 1, unitPrice: 52, vatRate: 15, vatAmount: 7.8, total: 59.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhy8008oysv140m31aev" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhy8008oysv140m31aev", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "d86dac52-24f1-48a7-9", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhy8008qysv1axn1ivxp", itemId: "cmqmuuhy7008mysv1v6hk9sus", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhyb008sysv1y91sx1e2" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhyb008sysv1y91sx1e2", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "26d0afc0-055f-48ce-a", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 357.5, vatAmount: 53.63, total: 411.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhyb008uysv1ct724awa", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 357.5, vatRate: 15, vatAmount: 53.63, total: 411.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhye008wysv1ds2a6n9p" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhye008wysv1ds2a6n9p", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "a561c32d-9c49-4620-a", invoiceDate: new Date("2026-06-08T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhye008yysv1j4rid3pw", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhyl0094ysv1t6k0cuyg" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhyl0094ysv1t6k0cuyg", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "f71d346c-13ab-4d3f-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1038.55, vatAmount: 155.78, total: 1194.33, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhyl0096ysv1q0xs7gpm", itemId: "cmqmuuhth000dysv1wksp9x58", quantity: 5, unitPrice: 13.05, vatRate: 15, vatAmount: 9.79, total: 75.04 },
          { id: "cmqmuuhyl0097ysv163up69wm", itemId: "cmqm43jis001z8z3ld07kss4g", quantity: 2, unitPrice: 29, vatRate: 15, vatAmount: 8.7, total: 66.7 },
          { id: "cmqmuuhyl0098ysv15v4crgfi", itemId: "cmqm3x7410053u8l2bot7yjdi", quantity: 3, unitPrice: 99.15, vatRate: 15, vatAmount: 44.62, total: 342.07 },
          { id: "cmqmuuhyl0099ysv1v3fbv8at", itemId: "cmqmuuhyh0090ysv1ufy4539x", quantity: 1, unitPrice: 42, vatRate: 15, vatAmount: 6.3, total: 48.3 },
          { id: "cmqmuuhyl009aysv1b358fm80", itemId: "cmqm3x72z004bu8l256u3ayrj", quantity: 4, unitPrice: 52, vatRate: 15, vatAmount: 31.2, total: 239.2 },
          { id: "cmqmuuhyl009bysv1tl2eb7ov", itemId: "cmqmuuhvu0049ysv1obhgw2lh", quantity: 1, unitPrice: 105, vatRate: 15, vatAmount: 15.75, total: 120.75 },
          { id: "cmqmuuhyl009cysv17tfpofmi", itemId: "cmqmuuhv1002uysv1b5gfjew7", quantity: 1, unitPrice: 36.55, vatRate: 15, vatAmount: 5.48, total: 42.03 },
          { id: "cmqmuuhyl009dysv12zwfumg2", itemId: "cmqmuuhyj0092ysv16bh770tc", quantity: 1, unitPrice: 118.3, vatRate: 15, vatAmount: 17.74, total: 136.04 },
          { id: "cmqmuuhyl009eysv1aoxwiwoj", itemId: "cmqmuuhv4002yysv186jqmx3c", quantity: 2, unitPrice: 54, vatRate: 15, vatAmount: 16.2, total: 124.2 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhyp009gysv1lzt9a3ua" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhyp009gysv1lzt9a3ua", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "8d047fa3-d0bd-4cf8-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 50, vatAmount: 6.52, total: 56.52, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhyq009iysv14128yxus", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhys009kysv1jrbzus4b" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhys009kysv1jrbzus4b", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "715cc3c2-1838-4e6b-a", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 8, vatAmount: 1.04, total: 9.04, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhys009mysv1r9k1wauz", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 8, vatRate: 13, vatAmount: 1.04, total: 9.04 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhyv009oysv1jqmh257b" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhyv009oysv1jqmh257b", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "ec552e5f-feb0-4f45-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhyv009qysv18298g5x5", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhyy009sysv1j417t52t" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhyy009sysv1j417t52t", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "f1b0c6d3-dd44-4877-a", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 160.5, vatAmount: 24.07, total: 184.57, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhyy009uysv1a3jglar6", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 160.5, vatRate: 15, vatAmount: 24.07, total: 184.57 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhz2009yysv1xt4xnn4h" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhz2009yysv1xt4xnn4h", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7r200tyu8l22arw1rzb", invoiceNumber: "abaf39a3-94ce-4cfb-b", invoiceDate: new Date("2026-06-09T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 25, vatAmount: 3.75, total: 28.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhz200a0ysv18zpqr8rs", itemId: "cmqmuuhz0009wysv1wpz85xrq", quantity: 1, unitPrice: 25, vatRate: 15, vatAmount: 3.75, total: 28.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhz800a6ysv1r9iw7675" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhz800a6ysv1r9iw7675", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuhz500a2ysv1qu1z99rt", invoiceNumber: "ed6ba024-1137-4e97-a", invoiceDate: new Date("2026-06-10T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 255, vatAmount: 0, total: 255, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhz900a8ysv1lcnu36cw", itemId: "cmqmuuhz700a4ysv1o8pzgtlx", quantity: 1, unitPrice: 255, vatRate: 0, vatAmount: 0, total: 255 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzb00aaysv1y4goexvn" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzb00aaysv1y4goexvn", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "cd52911e-bf4a-45b9-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1073.05, vatAmount: 160.96, total: 1234.01, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzb00acysv1005q15ib", itemId: "cmqm43jzy00hq8z3lvvfdn1i6", quantity: 1, unitPrice: 1073.05, vatRate: 15, vatAmount: 160.96, total: 1234.01 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzf00aeysv1sani0qs3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzf00aeysv1sani0qs3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "f96e2f82-a4f8-4678-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 25, vatAmount: 0, total: 25, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzf00agysv1bov6bdr0", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzh00aiysv1yt47mqn3" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzh00aiysv1yt47mqn3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "9c80be06-9827-4361-b", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 70, vatAmount: 9.13, total: 79.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzi00akysv12qedv61u", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 13, vatAmount: 9.13, total: 79.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzl00aoysv1c98w8z7e" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzl00aoysv1c98w8z7e", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "5f7c2478-7ff0-4575-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 20, vatAmount: 3, total: 23, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzl00aqysv1132ar3zc", itemId: "cmqmuuhzk00amysv1urx2wwiq", quantity: 1, unitPrice: 20, vatRate: 15, vatAmount: 3, total: 23 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzo00asysv1daojy4go" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzo00asysv1daojy4go", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "b1378dc4-a69f-4d57-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 345, vatAmount: 51.75, total: 396.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzo00auysv1ihtquw95", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 345, vatRate: 15, vatAmount: 51.75, total: 396.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzs00ayysv1kbfyjf6x" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzs00ayysv1kbfyjf6x", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "81d1bc48-7669-445e-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 10, vatAmount: 1.3, total: 11.3, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzs00b0ysv17tgfx9bc", itemId: "cmqmuuhzq00awysv16xv79bc2", quantity: 1, unitPrice: 10, vatRate: 13, vatAmount: 1.3, total: 11.3 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzv00b2ysv1pp2o2rel" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzv00b2ysv1pp2o2rel", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "bfa31e3b-a18f-47ec-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 70, vatAmount: 9.13, total: 79.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzv00b4ysv1ad6n5xvf", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 13, vatAmount: 9.13, total: 79.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuuhzz00b8ysv1981bsj5k" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuuhzz00b8ysv1981bsj5k", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "58943acb-65e5-4e11-a", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 150, vatAmount: 0, total: 150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuuhzz00baysv19y5ejrcg", itemId: "cmqmuuhzx00b6ysv149k1mi8i", quantity: 1, unitPrice: 150, vatRate: 0, vatAmount: 0, total: 150 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0200bcysv14ctuz1cr" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0200bcysv14ctuz1cr", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "673e3507-c333-49fd-9", invoiceDate: new Date("2026-06-11T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 55, vatAmount: 0, total: 55, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0200beysv1c9zkzve7", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 25, vatRate: 0, vatAmount: 0, total: 25 },
          { id: "cmqmuui0200bfysv15r9c7mzi", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 30, vatRate: 0, vatAmount: 0, total: 30 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0500bhysv10knbyxq8" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0500bhysv10knbyxq8", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "2768450f-535e-458d-a", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 2.61, vatAmount: 0.39, total: 3, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0500bjysv1kvsdn58x", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 2.61, vatRate: 15, vatAmount: 0.39, total: 3 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0800blysv1vgc3md2w" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0800blysv1vgc3md2w", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "554880d8-0e73-423d-b", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 50, vatAmount: 6.52, total: 56.52, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0800bnysv1ul191foa", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 50, vatRate: 13, vatAmount: 6.52, total: 56.52 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0c00brysv1xi9f9fva" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0c00brysv1xi9f9fva", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuui0a00bpysv1pws11u10", invoiceNumber: "0b605334-3318-4031-9", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 3, vatAmount: 0.45, total: 3.45, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0c00btysv1ch29qfq0", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 3, vatRate: 15, vatAmount: 0.45, total: 3.45 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0g00bxysv11ckvvy41" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0g00bxysv11ckvvy41", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "899eec12-97ab-4956-9", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 1481.55, vatAmount: 222.23, total: 1703.78, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0g00bzysv1il1eqker", itemId: "cmqmuui0e00bvysv1ptm3lbtg", quantity: 1, unitPrice: 1481.55, vatRate: 15, vatAmount: 222.23, total: 1703.78 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0i00c1ysv111r1ubl4" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0i00c1ysv111r1ubl4", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7ar00bju8l237e11rzt", invoiceNumber: "955a75c4-d8c0-4116-b", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 879.6, vatAmount: 114.73, total: 994.33, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0j00c3ysv1n4h5n1s7", itemId: "cmqmuuhu00019ysv1h75sot6c", quantity: 40, unitPrice: 21.99, vatRate: 13, vatAmount: 114.73, total: 994.33 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0n00c7ysv1an93n0na" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0n00c7ysv1an93n0na", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "87021d85-a748-421e-9", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 223.81, vatAmount: 33.57, total: 257.38, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0n00c9ysv1eyq5bhw9", itemId: "cmqmuui0l00c5ysv166md758z", quantity: 1, unitPrice: 103.96, vatRate: 15, vatAmount: 15.59, total: 119.55 },
          { id: "cmqmuui0n00caysv1m6r149cn", itemId: "cmqmuui0l00c5ysv166md758z", quantity: 1, unitPrice: 119.85, vatRate: 15, vatAmount: 17.98, total: 137.83 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0r00ccysv16usomivb" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0r00ccysv16usomivb", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "52a5bf1f-0fe0-439e-8", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 15, vatAmount: 0, total: 15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0r00ceysv1qqe23o8w", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 15, vatRate: 0, vatAmount: 0, total: 15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0t00cgysv1c0znv955" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0t00cgysv1c0znv955", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "b98b3fd7-21c7-4bd9-b", invoiceDate: new Date("2026-06-12T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 445, vatAmount: 66.75, total: 511.75, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0t00ciysv1fx1pa4t6", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 445, vatRate: 15, vatAmount: 66.75, total: 511.75 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui0x00cmysv1wmipu5iq" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui0x00cmysv1wmipu5iq", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "70d22089-4c92-413b-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 641, vatAmount: 96.15, total: 737.15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui0x00coysv12alhy72s", itemId: "cmqmuui0w00ckysv17zgcyivc", quantity: 1, unitPrice: 641, vatRate: 15, vatAmount: 96.15, total: 737.15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1000cqysv14zeac4nf" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1000cqysv14zeac4nf", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuhwd005cysv1c72xpr4n", invoiceNumber: "815d8bb4-559e-44fb-9", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 6.9, vatAmount: 0.9, total: 7.8, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1000csysv1335r2cyb", itemId: "cmqm43jkd00338z3l4322u4gx", quantity: 1, unitPrice: 6.9, vatRate: 13, vatAmount: 0.9, total: 7.8 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1200cuysv18m92x92e" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1200cuysv18m92x92e", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "277e29fb-7436-4f07-8", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 15, vatAmount: 0, total: 15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1200cwysv199c5tcdo", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 15, vatRate: 0, vatAmount: 0, total: 15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1500cyysv1c719y5wk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1500cyysv1c719y5wk", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "4ef0fcbd-3b48-4ea4-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 70, vatAmount: 9.13, total: 79.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1500d0ysv19yxm9odr", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 13, vatAmount: 9.13, total: 79.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1900d4ysv1igl3u1pk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1900d4ysv1igl3u1pk", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "effea29c-19c9-44de-a", invoiceDate: new Date("2026-06-13T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 150, vatAmount: 0, total: 150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1900d6ysv10lwen6dh", itemId: "cmqmuui1800d2ysv1a8j9vbop", quantity: 1, unitPrice: 150, vatRate: 0, vatAmount: 0, total: 150 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1c00d8ysv1gb8pw4tz" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1c00d8ysv1gb8pw4tz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jlo004d8z3l2re349e7", invoiceNumber: "4af2ac44-e9b0-4e56-8", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 15, vatAmount: 0, total: 15, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1c00daysv17donlur8", itemId: "cmqm43jms005c8z3lp4tvmukg", quantity: 1, unitPrice: 15, vatRate: 0, vatAmount: 0, total: 15 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1g00deysv1o4i4im9f" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1g00deysv1o4i4im9f", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqmuuht70005ysv10faozhn8", invoiceNumber: "c7b8ed3e-fc7d-4abb-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 823.5, vatAmount: 123.52, total: 947.02, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1h00dgysv15f7h9arn", itemId: "cmqmuui1f00dcysv15b63tkpz", quantity: 1, unitPrice: 823.5, vatRate: 15, vatAmount: 123.52, total: 947.02 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1j00diysv1dneubowo" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1j00diysv1dneubowo", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "763e2905-a12b-4311-9", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 94.09, vatAmount: 12.27, total: 106.36, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1j00dkysv1kgsvl54h", itemId: "cmqm43k2y00l48z3ltkhvdeq5", quantity: 1, unitPrice: 94.09, vatRate: 13, vatAmount: 12.27, total: 106.36 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1m00dmysv1pokv2hjk" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1m00dmysv1pokv2hjk", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x722003nu8l2isvplp65", invoiceNumber: "e4f47a3a-cbd3-4bcb-8", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 17.39, vatAmount: 2.61, total: 20, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1m00doysv1nteq8ay1", itemId: "cmqm3x7mb00onu8l2aby0jr7x", quantity: 1, unitPrice: 17.39, vatRate: 15, vatAmount: 2.61, total: 20 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1o00dqysv1vvcoyt82" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1o00dqysv1vvcoyt82", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm43jkj00398z3lm1g4k62u", invoiceNumber: "d8f56295-99bb-404c-b", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 70, vatAmount: 9.13, total: 79.13, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1o00dsysv1jsvt3b3h", itemId: "cmqm3x71q0037u8l2itzggh5w", quantity: 1, unitPrice: 70, vatRate: 13, vatAmount: 9.13, total: 79.13 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1r00duysv19kx4mc2r" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1r00duysv19kx4mc2r", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x75d006pu8l2ote4y7jo", invoiceNumber: "d13bff58-a8a7-4593-8", invoiceDate: new Date("2026-06-14T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CREDIT", subtotal: 540, vatAmount: 81, total: 621, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1r00dwysv15a1xyrfq", itemId: "cmqm3x75j006tu8l26ybjbg11", quantity: 1, unitPrice: 540, vatRate: 15, vatAmount: 81, total: 621 },
        ] }
      } })
    }
  }
  {
    const existing = await prisma.purchaseInvoice.findUnique({ where: { id: "cmqmuui1t00dyysv1qb9m94ha" } })
    if (!existing) {
      await prisma.purchaseInvoice.create({ data: { id: "cmqmuui1t00dyysv1qb9m94ha", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", supplierId: "cmqm3x7ba00c2u8l2bcf77ntc", invoiceNumber: "58ea92a7-0c1c-49fb-8", invoiceDate: new Date("2026-06-15T00:00:00.000Z"), invoiceType: "TAX", paymentMethod: "CASH", subtotal: 150, vatAmount: 0, total: 150, createdBy: 'migration',
        lines: { create: [
          { id: "cmqmuui1t00e0ysv1vusaea0x", itemId: "cmqmuuhzx00b6ysv149k1mi8i", quantity: 1, unitPrice: 150, vatRate: 0, vatAmount: 0, total: 150 },
        ] }
      } })
    }
  }

  // Daily Sales Records
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7t100whu8l2fo3yujj9" }, update: {}, create: { id: "cmqm3x7t100whu8l2fo3yujj9", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-01T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 635, cardSales: 1512, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2327, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7tb00wpu8l20xziw7cq" }, update: {}, create: { id: "cmqm3x7tb00wpu8l20xziw7cq", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-02T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 816, cardSales: 2429, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2053, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7tl00wxu8l200em6xug" }, update: {}, create: { id: "cmqm3x7tl00wxu8l200em6xug", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-03T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 872, cardSales: 1686.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2112.99, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7tu00x5u8l2zfn5hl9v" }, update: {}, create: { id: "cmqm3x7tu00x5u8l2zfn5hl9v", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-04T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 908, cardSales: 1934, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2688, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7u200xdu8l2xca1et71" }, update: {}, create: { id: "cmqm3x7u200xdu8l2xca1et71", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-05T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 790.35, cardSales: 2169, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 3154, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7ub00xlu8l2bdkl030i" }, update: {}, create: { id: "cmqm3x7ub00xlu8l2bdkl030i", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-06T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 729, cardSales: 766.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1880, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7uj00xtu8l28jbuiorh" }, update: {}, create: { id: "cmqm3x7uj00xtu8l28jbuiorh", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-07T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1007, cardSales: 1459, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2217.69, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7ut00y1u8l2o86hzynp" }, update: {}, create: { id: "cmqm3x7ut00y1u8l2o86hzynp", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-08T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 956, cardSales: 1621.97, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1988, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7v100y9u8l2z54cmny5" }, update: {}, create: { id: "cmqm3x7v100y9u8l2z54cmny5", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-09T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 960.75, cardSales: 1622, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2744, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7v800yhu8l2kyf6nnbi" }, update: {}, create: { id: "cmqm3x7v800yhu8l2kyf6nnbi", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-10T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 699, cardSales: 2375, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1382, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7vi00ypu8l2d726ody1" }, update: {}, create: { id: "cmqm3x7vi00ypu8l2d726ody1", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-11T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 889, cardSales: 2161.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2064, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7vq00yxu8l2t9idvpck" }, update: {}, create: { id: "cmqm3x7vq00yxu8l2t9idvpck", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-12T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 616, cardSales: 1649.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2457, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7vz00z5u8l2nccnrspb" }, update: {}, create: { id: "cmqm3x7vz00z5u8l2nccnrspb", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-13T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 557, cardSales: 1393.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2842, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm3x7w900zdu8l2uhzjq8nc" }, update: {}, create: { id: "cmqm3x7w900zdu8l2uhzjq8nc", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", date: new Date("2026-06-14T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 671, cardSales: 1752, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1899, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47skc00hfgtzf1bq89hl9" }, update: {}, create: { id: "cmqm47skc00hfgtzf1bq89hl9", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-01T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2272.5, cardSales: 4549.01, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1853.15, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: "OIL", createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47skr00hngtzfft6q6nne" }, update: {}, create: { id: "cmqm47skr00hngtzfft6q6nne", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-02T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2436.55, cardSales: 4329, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2078.4, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47sl100hvgtzfj8qth84i" }, update: {}, create: { id: "cmqm47sl100hvgtzfj8qth84i", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-03T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2459.7, cardSales: 3867.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 3070.5, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47sl900i3gtzf3582l3bk" }, update: {}, create: { id: "cmqm47sl900i3gtzf3582l3bk", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-04T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 3124.85, cardSales: 5798.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2794.35, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47slj00ibgtzf020b1dvf" }, update: {}, create: { id: "cmqm47slj00ibgtzf020b1dvf", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-05T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2459, cardSales: 4531, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2501, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47sls00ijgtzfbcxxw1ug" }, update: {}, create: { id: "cmqm47sls00ijgtzfbcxxw1ug", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-06T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2717.75, cardSales: 4681.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1845.65, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: "زيوت", createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47sm100irgtzfeqp4pla9" }, update: {}, create: { id: "cmqm47sm100irgtzfeqp4pla9", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-07T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2279, cardSales: 4201, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1857, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47sm900izgtzfyy1c3fen" }, update: {}, create: { id: "cmqm47sm900izgtzfyy1c3fen", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-08T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2529, cardSales: 2449.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2778.1, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47smi00j7gtzfx7iz8b86" }, update: {}, create: { id: "cmqm47smi00j7gtzfx7iz8b86", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-09T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2673.5, cardSales: 3892, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2116.6, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47smq00jfgtzfuj5ymhtr" }, update: {}, create: { id: "cmqm47smq00jfgtzfuj5ymhtr", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-10T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2816.95, cardSales: 4934.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2265.5, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47smx00jngtzfzb5s0th8" }, update: {}, create: { id: "cmqm47smx00jngtzfzb5s0th8", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-11T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 3129, cardSales: 5222.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2270.25, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47sn700jvgtzfvx5b68ux" }, update: {}, create: { id: "cmqm47sn700jvgtzfvx5b68ux", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-12T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2566.5, cardSales: 4895, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2405.55, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47snf00k3gtzfh7uxen1q" }, update: {}, create: { id: "cmqm47snf00k3gtzfh7uxen1q", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-13T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 3181.7, cardSales: 3930, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1934, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqm47sno00kbgtzfhl1cenlc" }, update: {}, create: { id: "cmqm47sno00kbgtzfhl1cenlc", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", date: new Date("2026-06-14T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 2750, cardSales: 3467, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2083.9, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzye009gch3mqdewq6w1" }, update: {}, create: { id: "cmqmupzye009gch3mqdewq6w1", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-01T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 760, cardSales: 3791, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 6111, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzyk009ich3mlzdje6h8" }, update: {}, create: { id: "cmqmupzyk009ich3mlzdje6h8", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-02T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 820, cardSales: 4020, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 6292, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzyn009kch3m4qyrm0ww" }, update: {}, create: { id: "cmqmupzyn009kch3m4qyrm0ww", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-03T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 900, cardSales: 3737, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 5273, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzyq009mch3m4js2p7ik" }, update: {}, create: { id: "cmqmupzyq009mch3m4js2p7ik", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-04T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 905, cardSales: 4394, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 5120, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzys009och3mlm0t1gem" }, update: {}, create: { id: "cmqmupzys009och3mlm0t1gem", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-05T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1061, cardSales: 6978, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 5555, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzyv009qch3mxb6d17wc" }, update: {}, create: { id: "cmqmupzyv009qch3mxb6d17wc", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-06T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 841, cardSales: 2811, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 6299, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzyy009sch3mdhw2wlw5" }, update: {}, create: { id: "cmqmupzyy009sch3mdhw2wlw5", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-07T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1263, cardSales: 3496, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 4563, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzz1009uch3mkh988mhg" }, update: {}, create: { id: "cmqmupzz1009uch3mkh988mhg", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-08T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 876.5, cardSales: 4249, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 3807, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzz4009wch3m2o7rsxch" }, update: {}, create: { id: "cmqmupzz4009wch3m2o7rsxch", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-09T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1794, cardSales: 3325.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 5974, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzz6009ych3mfdch08fa" }, update: {}, create: { id: "cmqmupzz6009ych3mfdch08fa", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-10T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1278, cardSales: 5919.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 7414, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzz900a0ch3m6mu2cds0" }, update: {}, create: { id: "cmqmupzz900a0ch3m6mu2cds0", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-11T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1194, cardSales: 3903.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 6190, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzzb00a2ch3mkzqo2a4t" }, update: {}, create: { id: "cmqmupzzb00a2ch3mkzqo2a4t", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-12T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1170, cardSales: 5923, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 6199, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzze00a4ch3mxdxcfyf1" }, update: {}, create: { id: "cmqmupzze00a4ch3mxdxcfyf1", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-13T00:00:00.000Z"), vatMode: "EXCLUSIVE", vatRate: 15, cashSales: 1005, cardSales: 3993, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 7827, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmupzzg00a6ch3m5bao366a" }, update: {}, create: { id: "cmqmupzzg00a6ch3m5bao366a", companyId, restaurantId: "cmqm4c1l10001rv2wb69dqxth", date: new Date("2026-06-14T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1451, cardSales: 4846.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 5761, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlar0001ea3k8p3a4ngr" }, update: {}, create: { id: "cmqmuvlar0001ea3k8p3a4ngr", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-01T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 635, cardSales: 1512, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2327, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlay0003ea3kg16rqlmn" }, update: {}, create: { id: "cmqmuvlay0003ea3kg16rqlmn", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-02T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 816, cardSales: 2429, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2053, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlb00005ea3kh3dh37uf" }, update: {}, create: { id: "cmqmuvlb00005ea3kh3dh37uf", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-03T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 872, cardSales: 1686.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2112.99, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlb30007ea3k895hq2qf" }, update: {}, create: { id: "cmqmuvlb30007ea3k895hq2qf", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-04T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 908, cardSales: 1934, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2688, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlb60009ea3kkcpu6svy" }, update: {}, create: { id: "cmqmuvlb60009ea3kkcpu6svy", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-05T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 790.35, cardSales: 2169, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 3154, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlb8000bea3kdcsja8ki" }, update: {}, create: { id: "cmqmuvlb8000bea3kdcsja8ki", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-06T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 729, cardSales: 766.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1880, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlba000dea3kq2beehph" }, update: {}, create: { id: "cmqmuvlba000dea3kq2beehph", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-07T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 1007, cardSales: 1459, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2217.69, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlbc000fea3k6hnrsucj" }, update: {}, create: { id: "cmqmuvlbc000fea3k6hnrsucj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-08T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 956, cardSales: 1621.97, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1988, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlbe000hea3kco0e8avx" }, update: {}, create: { id: "cmqmuvlbe000hea3kco0e8avx", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-09T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 960.75, cardSales: 1622, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2744, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlbg000jea3k9qqsdbg0" }, update: {}, create: { id: "cmqmuvlbg000jea3k9qqsdbg0", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-10T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 699, cardSales: 2375, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1382, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlbi000lea3kadetr9ca" }, update: {}, create: { id: "cmqmuvlbi000lea3kadetr9ca", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-11T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 889, cardSales: 2161.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2064, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlbj000nea3krxltmhzp" }, update: {}, create: { id: "cmqmuvlbj000nea3krxltmhzp", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-12T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 616, cardSales: 1649.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2457, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlbl000pea3kpuidijd8" }, update: {}, create: { id: "cmqmuvlbl000pea3kpuidijd8", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-13T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 557, cardSales: 1393.5, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 2842, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })
  await prisma.dailySalesRecord.upsert({ where: { id: "cmqmuvlbn000rea3kc3gjxhyz" }, update: {}, create: { id: "cmqmuvlbn000rea3kc3gjxhyz", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", date: new Date("2026-06-14T00:00:00.000Z"), vatMode: "INCLUSIVE", vatRate: 15, cashSales: 671, cardSales: 1752, hungerStation: 0, jahez: 0, noonFood: 0, talabat: 0, app5: 1899, app6: 0, openingBalance: 0, cashExpenses: 0, closingBalance: 0, notes: null, createdBy: 'migration' } })

  // Employees
  await prisma.employee.upsert({ where: { id: "cmqm3x6xm0006u8l22s5kv6ii" }, update: {}, create: { id: "cmqm3x6xm0006u8l22s5kv6ii", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "ادريس عارف", nameEn: "ادريس عارف", employeeId: null, position: "مساعد", nationality: "افغان", basicSalary: 4000, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6xp0008u8l25kcex2ee" }, update: {}, create: { id: "cmqm3x6xp0008u8l25kcex2ee", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "اشرف محمد عبد العظيم", nameEn: "اشرف محمد عبد العظيم", employeeId: null, position: "كاشير محلي", nationality: "مصر", basicSalary: 2000, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6xr000au8l2jhhkqb3a" }, update: {}, create: { id: "cmqm3x6xr000au8l2jhhkqb3a", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "الجوهرة مهند سعود الزامل", nameEn: "الجوهرة مهند سعود الزامل", employeeId: null, position: "manager", nationality: "saudi", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6xu000cu8l2dt5lb845" }, update: {}, create: { id: "cmqm3x6xu000cu8l2dt5lb845", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "الياس الميلي", nameEn: "الياس الميلي", employeeId: null, position: "سعودي", nationality: "سعودي ", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6xx000eu8l232axdl5j" }, update: {}, create: { id: "cmqm3x6xx000eu8l232axdl5j", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "امجد علي خان", nameEn: "امجد علي خان", employeeId: null, position: "معلم الفحم ", nationality: "باكستان", basicSalary: 3000, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6xz000gu8l2ms41eavi" }, update: {}, create: { id: "cmqm3x6xz000gu8l2ms41eavi", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "بادشاه عالم", nameEn: "بادشاه عالم", employeeId: null, position: "معلم الشواية", nationality: "بنجلاديش", basicSalary: 0, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6y1000iu8l2izhv0ur9" }, update: {}, create: { id: "cmqm3x6y1000iu8l2izhv0ur9", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "بيجوي منصور هالدار", nameEn: "بيجوي منصور هالدار", employeeId: null, position: "سائق دباب ", nationality: "بنجلاديش", basicSalary: 1300, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6y4000ku8l2263e69w8" }, update: {}, create: { id: "cmqm3x6y4000ku8l2263e69w8", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "جل زيب محمد خان", nameEn: "جل زيب محمد خان", employeeId: null, position: "تحضير المحلي ", nationality: "الباكستان", basicSalary: 1700.01, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6y6000mu8l279pnyett" }, update: {}, create: { id: "cmqm3x6y6000mu8l279pnyett", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "جوينال عابدين", nameEn: "جوينال عابدين", employeeId: null, position: "معلم السلطة الحار", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6y8000ou8l226t33ftp" }, update: {}, create: { id: "cmqm3x6y8000ou8l226t33ftp", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "حافظ عبده الحوشبي", nameEn: "حافظ عبده الحوشبي", employeeId: null, position: "كاشير  المطعم الرئيسي", nationality: "اليمن", basicSalary: 2100, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6ya000qu8l2u8yhj0yq" }, update: {}, create: { id: "cmqm3x6ya000qu8l2u8yhj0yq", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "حسن هوليدار", nameEn: "حسن هوليدار", employeeId: null, position: "معلم الايدامات ", nationality: "بنجلاديش", basicSalary: 1400, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yc000su8l2uz25kh0e" }, update: {}, create: { id: "cmqm3x6yc000su8l2uz25kh0e", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "رشيد الله خان", nameEn: "رشيد الله خان", employeeId: null, position: "مساعد معلم ارز", nationality: "الباكستان", basicSalary: 1600, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yf000uu8l2sxifydf0" }, update: {}, create: { id: "cmqm3x6yf000uu8l2sxifydf0", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "روبل تشوكيدر", nameEn: "روبل تشوكيدر", employeeId: null, position: "معلم المنتو والفرموزه ", nationality: "بنجلاديش", basicSalary: 1400, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yh000wu8l2fiw9lfkm" }, update: {}, create: { id: "cmqm3x6yh000wu8l2fiw9lfkm", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "سلطان عصام عايض", nameEn: "سلطان عصام عايض", employeeId: null, position: "سائق", nationality: "اليمن", basicSalary: 1700, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yj000yu8l2dwzuo1ei" }, update: {}, create: { id: "cmqm3x6yj000yu8l2dwzuo1ei", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "سوكيل حسين", nameEn: "سوكيل حسين", employeeId: null, position: "موظف النظافة ", nationality: "بنجلاديش", basicSalary: 1400, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yl0010u8l2f8yn81bt" }, update: {}, create: { id: "cmqm3x6yl0010u8l2f8yn81bt", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "سوهاغ ميا", nameEn: "سوهاغ ميا", employeeId: null, position: "محلي ", nationality: "بنجلاديش", basicSalary: 1400, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yn0012u8l2i9qz2wly" }, update: {}, create: { id: "cmqm3x6yn0012u8l2i9qz2wly", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "شهد عبد الرزاق احمد السبيعي", nameEn: "شهد عبد الرزاق احمد السبيعي", employeeId: null, position: "manager", nationality: "saudi", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yq0014u8l2fso3f68h" }, update: {}, create: { id: "cmqm3x6yq0014u8l2fso3f68h", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "صداقات علي محمد صادق", nameEn: "صداقات علي محمد صادق", employeeId: null, position: "معلم الارز", nationality: "باكستان", basicSalary: 1800, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6ys0016u8l2l1sh8ndt" }, update: {}, create: { id: "cmqm3x6ys0016u8l2l1sh8ndt", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "عبد الجليل", nameEn: "عبد الجليل", employeeId: null, position: "موظف سفري", nationality: "اليمن", basicSalary: 1800, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yv0018u8l2dhvwuvxt" }, update: {}, create: { id: "cmqm3x6yv0018u8l2dhvwuvxt", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "علاء الدين احمد الشاه", nameEn: "علاء الدين احمد الشاه", employeeId: null, position: "مساعد معلم الفحم ", nationality: "الباكستان", basicSalary: 1599.99, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yx001au8l2shw4oc61" }, update: {}, create: { id: "cmqm3x6yx001au8l2shw4oc61", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "فلاح علي علوان", nameEn: "فلاح علي علوان", employeeId: null, position: "سفري", nationality: "اليمن", basicSalary: 2600, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6yz001cu8l20qv8iqc3" }, update: {}, create: { id: "cmqm3x6yz001cu8l20qv8iqc3", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "ليلى محمد ناصر مدخلي", nameEn: "ليلى محمد ناصر مدخلي", employeeId: null, position: "manager", nationality: "saudi", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6z1001eu8l27e2p9occ" }, update: {}, create: { id: "cmqm3x6z1001eu8l27e2p9occ", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "مالك عبدة مهدي علي", nameEn: "مالك عبدة مهدي علي", employeeId: null, position: "مباشر محلي", nationality: "اليمن", basicSalary: 0, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6z3001gu8l28qtivp91" }, update: {}, create: { id: "cmqm3x6z3001gu8l28qtivp91", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "محسن مثنى قاسم علي", nameEn: "محسن مثنى قاسم علي", employeeId: null, position: "سفري", nationality: "اليمن", basicSalary: 1600, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6z5001iu8l2co998xra" }, update: {}, create: { id: "cmqm3x6z5001iu8l2co998xra", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "محمد  شميم ميا", nameEn: "محمد  شميم ميا", employeeId: null, position: "فرموزة ومنتو ", nationality: "بنجلاديش", basicSalary: 1400, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6z7001ku8l2pjrmrfg7" }, update: {}, create: { id: "cmqm3x6z7001ku8l2pjrmrfg7", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "محمد خوكو مال", nameEn: "محمد خوكو مال", employeeId: null, position: "مساعد معلم شواية", nationality: "بنجلاديش", basicSalary: 1400, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6z9001mu8l2mnbcvd06" }, update: {}, create: { id: "cmqm3x6z9001mu8l2mnbcvd06", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "محمد سبحان", nameEn: "محمد سبحان", employeeId: null, position: "سائق دباب", nationality: "بنجلاديش", basicSalary: 1300, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6zb001ou8l21sdvur8k" }, update: {}, create: { id: "cmqm3x6zb001ou8l21sdvur8k", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "محمد فيروز حسن", nameEn: "محمد فيروز حسن", employeeId: null, position: "معلم السلطات والحلويات ", nationality: "بنجلاديش", basicSalary: 1400, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6zd001qu8l217vsxpw5" }, update: {}, create: { id: "cmqm3x6zd001qu8l217vsxpw5", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "مطرة عبداللة حسن هزازي", nameEn: "مطرة عبداللة حسن هزازي", employeeId: null, position: "manager", nationality: "saudi", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6zj001su8l2m0pfvstj" }, update: {}, create: { id: "cmqm3x6zj001su8l2m0pfvstj", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "منيرة محمد عبداللة السراء", nameEn: "منيرة محمد عبداللة السراء", employeeId: null, position: "manager", nationality: "saudi", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6zm001uu8l2ogsq67gl" }, update: {}, create: { id: "cmqm3x6zm001uu8l2ogsq67gl", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "نوير القحطاني", nameEn: "نوير القحطاني", employeeId: null, position: "سعودي", nationality: "سعودي ", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6zo001wu8l2ryj5qicc" }, update: {}, create: { id: "cmqm3x6zo001wu8l2ryj5qicc", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "هاشم عبدالرحمن العميسي", nameEn: "هاشم عبدالرحمن العميسي", employeeId: null, position: "معلم المضغوط", nationality: "اليمن", basicSalary: 1699.99, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6zq001yu8l2p1pdz2zb" }, update: {}, create: { id: "cmqm3x6zq001yu8l2p1pdz2zb", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "هديل العمري", nameEn: "هديل العمري", employeeId: null, position: "سعودي", nationality: "سعودي ", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm3x6zs0020u8l2vwe8v6oo" }, update: {}, create: { id: "cmqm3x6zs0020u8l2vwe8v6oo", companyId, restaurantId: "cmqm3x6ww0002u8l266r7mgae", nameAr: "وفاء مدخلي", nameEn: "وفاء مدخلي", employeeId: null, position: "سعودي", nationality: "سعودي ", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jeu00058z3lwxs5vy8n" }, update: {}, create: { id: "cmqm43jeu00058z3lwxs5vy8n", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "اتيك هسان", nameEn: "اتيك هسان", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jey00078z3lj8t3itx0" }, update: {}, create: { id: "cmqm43jey00078z3lj8t3itx0", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "اسلام حاسيفول", nameEn: "اسلام حاسيفول", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1299.99, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jf100098z3lrk2abqct" }, update: {}, create: { id: "cmqm43jf100098z3lrk2abqct", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "ايمن طه", nameEn: "ايمن طه", employeeId: null, position: "عامل", nationality: "اليمن", basicSalary: 1700, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jf3000b8z3l2kx4t5ba" }, update: {}, create: { id: "cmqm43jf3000b8z3l2kx4t5ba", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "ثروت", nameEn: "ثروت", employeeId: null, position: "مدير", nationality: "تركي", basicSalary: 6499.99, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jf7000d8z3l8sn82cpl" }, update: {}, create: { id: "cmqm43jf7000d8z3l8sn82cpl", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "رجب حسين", nameEn: "رجب حسين", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1499.98, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jfa000f8z3lpsmpqxrq" }, update: {}, create: { id: "cmqm43jfa000f8z3lpsmpqxrq", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "رضا احمد", nameEn: "رضا احمد", employeeId: null, position: "عامل", nationality: "مصر", basicSalary: 3000, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jfc000h8z3l7gju54gg" }, update: {}, create: { id: "cmqm43jfc000h8z3l7gju54gg", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "ريم بن هداب", nameEn: "ريم بن هداب", employeeId: null, position: "سعودي", nationality: "سعودي ", basicSalary: 2050, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jff000j8z3lflal2059" }, update: {}, create: { id: "cmqm43jff000j8z3lflal2059", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "سلطان الحداد", nameEn: "سلطان الحداد", employeeId: null, position: "عامل", nationality: "اليمن", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jfh000l8z3lz3fgm8n3" }, update: {}, create: { id: "cmqm43jfh000l8z3lz3fgm8n3", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "سهيل اسلام", nameEn: "سهيل اسلام", employeeId: null, position: "عامل", nationality: "اليمن", basicSalary: 2700, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jfk000n8z3lj20n07zo" }, update: {}, create: { id: "cmqm43jfk000n8z3lj20n07zo", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "سومانتا داس", nameEn: "سومانتا داس", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1700, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jfm000p8z3la7ur4fza" }, update: {}, create: { id: "cmqm43jfm000p8z3la7ur4fza", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "سيدالله جول", nameEn: "سيدالله جول", employeeId: null, position: "عامل", nationality: "باكستان", basicSalary: 1600, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jg9000r8z3l6snbrsia" }, update: {}, create: { id: "cmqm43jg9000r8z3l6snbrsia", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "شاهين حسين", nameEn: "شاهين حسين", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1499.99, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgc000t8z3la8x4oa30" }, update: {}, create: { id: "cmqm43jgc000t8z3la8x4oa30", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "علاء جاب الله", nameEn: "علاء جاب الله", employeeId: null, position: "عامل", nationality: "مصر", basicSalary: 3000, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgf000v8z3lvwm8ignl" }, update: {}, create: { id: "cmqm43jgf000v8z3lvwm8ignl", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "فيصل العيسى", nameEn: "فيصل العيسى", employeeId: null, position: "عامل", nationality: "اليمن", basicSalary: 1600, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgh000x8z3l5xs0ejf9" }, update: {}, create: { id: "cmqm43jgh000x8z3l5xs0ejf9", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "محمد فيصل", nameEn: "محمد فيصل", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1499.98, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgj000z8z3lzenys6ie" }, update: {}, create: { id: "cmqm43jgj000z8z3lzenys6ie", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "مد اسرف", nameEn: "مد اسرف", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgm00118z3lt26gnaha" }, update: {}, create: { id: "cmqm43jgm00118z3lt26gnaha", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "مد جما بوهيان", nameEn: "مد جما بوهيان", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1300, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgo00138z3l4opb643s" }, update: {}, create: { id: "cmqm43jgo00138z3l4opb643s", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "مد راسيل", nameEn: "مد راسيل", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgs00158z3lhwkhtj1f" }, update: {}, create: { id: "cmqm43jgs00158z3lhwkhtj1f", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "مطهر بقار", nameEn: "مطهر بقار", employeeId: null, position: "عامل", nationality: "اليمن", basicSalary: 1600, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgu00178z3loqmpi9bj" }, update: {}, create: { id: "cmqm43jgu00178z3loqmpi9bj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "موسين ساجالا", nameEn: "موسين ساجالا", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1499.99, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm43jgw00198z3l4mo9qxbj" }, update: {}, create: { id: "cmqm43jgw00198z3l4mo9qxbj", companyId, restaurantId: "cmqm43jdy00018z3lqyvfjs5b", nameAr: "ميراج ميا", nameEn: "ميراج ميا", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s1l0005gtzfom86j5dn" }, update: {}, create: { id: "cmqm47s1l0005gtzfom86j5dn", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "امير حسي", nameEn: "امير حسي", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s1o0007gtzfeoi3bzvl" }, update: {}, create: { id: "cmqm47s1o0007gtzfeoi3bzvl", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "ايمن سلطان", nameEn: "ايمن سلطان", employeeId: null, position: "عامل", nationality: "اليمن", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s1r0009gtzf532n1gnv" }, update: {}, create: { id: "cmqm47s1r0009gtzf532n1gnv", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "بوران جان", nameEn: "بوران جان", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s1u000bgtzf0oiq3qku" }, update: {}, create: { id: "cmqm47s1u000bgtzf0oiq3qku", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "جونيد حسين", nameEn: "جونيد حسين", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1300, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s1w000dgtzf8lwjthkp" }, update: {}, create: { id: "cmqm47s1w000dgtzf8lwjthkp", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "خالد الصادق", nameEn: "خالد الصادق", employeeId: null, position: "عامل", nationality: "السودان", basicSalary: 3000, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s1z000fgtzfrbql2ecg" }, update: {}, create: { id: "cmqm47s1z000fgtzfrbql2ecg", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "زاهات ميا", nameEn: "زاهات ميا", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s21000hgtzfkcfc8f5t" }, update: {}, create: { id: "cmqm47s21000hgtzfkcfc8f5t", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "سيرجان", nameEn: "سيرجان", employeeId: null, position: "مدير", nationality: "تركي", basicSalary: 6500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s24000jgtzf8p7s27ah" }, update: {}, create: { id: "cmqm47s24000jgtzf8p7s27ah", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "شانوت ميا", nameEn: "شانوت ميا", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s26000lgtzfn871i7jl" }, update: {}, create: { id: "cmqm47s26000lgtzfn871i7jl", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "عبد الرزاق نجيلي", nameEn: "عبد الرزاق نجيلي", employeeId: null, position: "عامل", nationality: "المغرب", basicSalary: 4500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s28000ngtzfo7cxl1bd" }, update: {}, create: { id: "cmqm47s28000ngtzfo7cxl1bd", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "محمد شوقي صالح", nameEn: "محمد شوقي صالح", employeeId: null, position: "عامل", nationality: "اليمن", basicSalary: 1900, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2b000pgtzflw4lmyby" }, update: {}, create: { id: "cmqm47s2b000pgtzflw4lmyby", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "محمد منات", nameEn: "محمد منات", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 2000, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2d000rgtzfp09n0hv9" }, update: {}, create: { id: "cmqm47s2d000rgtzfp09n0hv9", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "محي الدين", nameEn: "محي الدين", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1700, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2i000tgtzfq38n8q35" }, update: {}, create: { id: "cmqm47s2i000tgtzfq38n8q35", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "مد اسيب سوردير", nameEn: "مد اسيب سوردير", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1300, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2l000vgtzf2hlx4drc" }, update: {}, create: { id: "cmqm47s2l000vgtzf2hlx4drc", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "مد خورشيد علي", nameEn: "مد خورشيد علي", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1300, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2n000xgtzfgdqpz4la" }, update: {}, create: { id: "cmqm47s2n000xgtzfgdqpz4la", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "مد راكيب ميا", nameEn: "مد راكيب ميا", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2q000zgtzf36ujxi9w" }, update: {}, create: { id: "cmqm47s2q000zgtzf36ujxi9w", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "مد كاكسود", nameEn: "مد كاكسود", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2r0011gtzf9be4ywxr" }, update: {}, create: { id: "cmqm47s2r0011gtzf9be4ywxr", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "ميا توميل", nameEn: "ميا توميل", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1499.99, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })
  await prisma.employee.upsert({ where: { id: "cmqm47s2t0013gtzfw70jdpx7" }, update: {}, create: { id: "cmqm47s2t0013gtzfw70jdpx7", companyId, restaurantId: "cmqm47s0t0001gtzflmlx5wf9", nameAr: "ميتون داتل", nameEn: "ميتون داتل", employeeId: null, position: "عامل", nationality: "بنجلاديش", basicSalary: 1500, housingAllowance: 0, transportAllowance: 0, otherAllowances: 0, joiningDate: new Date("2026-01-01T00:00:00.000Z") } })

  console.log('Data migration completed successfully!')
}

main()
  .catch(e => { console.error('Migration error:', e.message); process.exit(1) })
  .finally(() => prisma.$disconnect())
