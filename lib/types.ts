export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  region: string;
  quantity: number;
  isOrganic?: boolean;
  category?: string;
  farmer?: string;
  harvestDate?: string;
}
