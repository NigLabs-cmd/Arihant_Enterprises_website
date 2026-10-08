export interface Product {
  id: string;
  brand: string;
  name: string;
  category: string;
  packSizes: string[];
  imageSrc?: string;
}

export const products: Product[] = [
  {
    id: 'hp-enklo-68',
    brand: 'HP',
    name: 'Enklo 68',
    category: 'Hydraulic Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'hp-15w-40',
    brand: 'HP',
    name: '15 W 40',
    category: 'Engine Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'hp-gear-oil-90-140',
    brand: 'HP',
    name: 'Gear Oil 90/140',
    category: 'Gear Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'hp-parthan-ep-320',
    brand: 'HP',
    name: 'Parthan EP 320',
    category: 'Gear Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'hp-koolkut-40',
    brand: 'HP',
    name: 'KoolKut 40',
    category: 'Cutting Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'hp-hdx-mg-20w-40',
    brand: 'HP',
    name: 'HDX MG 20 W 40',
    category: 'Engine Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'hp-seetul-n-68',
    brand: 'HP',
    name: 'Seetul N 68',
    category: 'Refrigeration Oil',
    packSizes: ['20 LTR', '210 LTR'],
  },
  {
    id: 'hp-meta-quench-42',
    brand: 'HP',
    name: 'Meta Quench 42',
    category: 'Quenching Oil',
    packSizes: ['210 LTR'],
  },
  {
    id: 'hp-elasto-710-245',
    brand: 'HP',
    name: 'Elasto 710/245',
    category: 'Rubber Processing Oil',
    packSizes: ['210 LTR'],
  },
  {
    id: 'ioc-servo-system',
    brand: 'Indian Oil (IOC)',
    name: 'Servo System 32/46/68/100',
    category: 'Hydraulic Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'ioc-servo-super-multigrade',
    brand: 'Indian Oil (IOC)',
    name: 'Servo Super Multigrade 20 W 40',
    category: 'Engine Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'ioc-servo-premium-cf4',
    brand: 'Indian Oil (IOC)',
    name: 'Servo Premium CF 4 15W 40',
    category: 'Engine Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'ioc-servo-gear-hp',
    brand: 'Indian Oil (IOC)',
    name: 'Servo Gear HP',
    category: 'Gear Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'ioc-servo-vacuum-vm4',
    brand: 'Indian Oil (IOC)',
    name: 'Servo Vacuum VM4',
    category: 'Vacuum Oil',
    packSizes: ['210 LTR'],
  },
  {
    id: 'ioc-servocut-s',
    brand: 'Indian Oil (IOC)',
    name: 'Servocut S',
    category: 'Cutting Oil',
    packSizes: ['210 LTR'],
  },
  {
    id: 'bpcl-mak-spirol-ep',
    brand: 'BPCL',
    name: 'MAK Spirol EP',
    category: 'Gear Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'bpcl-mak-amocam',
    brand: 'BPCL',
    name: 'MaK Amocam',
    category: 'Gear Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'bpcl-mak-hydrol',
    brand: 'BPCL',
    name: 'MAK Hydrol 32/68/100',
    category: 'Hydraulic Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'bpcl-mak-cd-20w-40',
    brand: 'BPCL',
    name: 'MAK CD 20 W 40',
    category: 'Engine Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'bpcl-mak-cf4-diamond',
    brand: 'BPCL',
    name: 'MAK CF 4 15W 40 / MAK Diamond',
    category: 'Engine Oil',
    packSizes: ['26 LTR', '210 LTR'],
  },
  {
    id: 'bpcl-freezol-68',
    brand: 'BPCL',
    name: 'Freezol 68',
    category: 'Refrigeration Oil',
    packSizes: ['20 LTR', '210 LTR'],
  },
  {
    id: 'bpcl-mak-mp-grease-3',
    brand: 'BPCL',
    name: 'MAK MP Grease 3',
    category: 'Grease',
    packSizes: ['18 KG', '182 KG'],
  },
];
