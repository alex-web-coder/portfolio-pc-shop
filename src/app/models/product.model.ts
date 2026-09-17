export interface Product {
  id: string;
  name: string;
  categorySlug: string;
  priceCents: number;
  imageUrl?: string;
  available: boolean;
}
