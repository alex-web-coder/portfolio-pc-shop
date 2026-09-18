import { LocalizedText } from './localized-text.model';

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  /** Spec key rendered as this category's one extra filter on its product list page. */
  filterSpecKey?: string;
  imageUrl?: string;
}
