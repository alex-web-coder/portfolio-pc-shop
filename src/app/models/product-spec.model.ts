import { LocalizedText } from './localized-text.model';

export interface ProductSpec {
  key: string;
  label: LocalizedText;
  value: string;
}
