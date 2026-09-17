import { Injectable, effect, signal } from '@angular/core';
import { Language } from '../models/language.model';
import { TRANSLATIONS, TranslationKey } from './translations.data';

const STORAGE_KEY = 'pc-shop.language';
const DEFAULT_LANGUAGE: Language = 'de';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly languageSignal = signal<Language>(readStoredLanguage());

  readonly language = this.languageSignal.asReadonly();

  constructor() {
    effect(() => {
      document.documentElement.lang = this.languageSignal();
    });
  }

  setLanguage(language: Language): void {
    this.languageSignal.set(language);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Storage can be unavailable (private browsing, restricted test/SSR
      // environments) — the in-memory signal still works, it just won't persist.
    }
  }

  t(key: TranslationKey): string {
    return TRANSLATIONS[key][this.languageSignal()];
  }
}

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'de' || stored === 'en' ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}
