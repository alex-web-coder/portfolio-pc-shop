import { Injectable, effect, signal } from '@angular/core';
import { Theme } from '../models/theme.model';

const STORAGE_KEY = 'pc-shop.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSignal = signal<Theme>(readStoredTheme());

  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.themeSignal());
    });
  }

  toggle(): void {
    this.setTheme(this.themeSignal() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable — the theme still applies for this session.
    }
  }
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Fall through to system preference.
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}
