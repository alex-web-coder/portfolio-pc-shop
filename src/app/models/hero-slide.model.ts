import { TranslationKey } from '../services/translations.data';

export interface HeroSlide {
  imageUrl: string;
  eyebrowKey: TranslationKey;
  titleKey: TranslationKey;
  leadKey: TranslationKey;
  ctaLabelKey: TranslationKey;
  ctaLink: string;
}
