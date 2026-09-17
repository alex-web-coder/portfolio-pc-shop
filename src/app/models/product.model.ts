import { LocalizedText } from './localized-text.model';
import { ProductSpec } from './product-spec.model';

export interface Product {
  id: string;
  categorySlug: string;
  name: LocalizedText;
  description: LocalizedText;
  manufacturer: string;
  priceCents: number;
  imageUrl?: string;
  available: boolean;
  specs: ProductSpec[];
}
