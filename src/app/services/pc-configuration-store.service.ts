import { Injectable } from '@angular/core';
import { Language } from '../models/language.model';
import { ComponentSlot, ComponentSelection } from '../models/pc-configuration.model';
import { Product } from '../models/product.model';
import { TRANSLATIONS, TranslationKey } from './translations.data';
import { calculateConfigurationTotalCents, REQUIRED_SLOTS } from './pc-compatibility';

const STORAGE_KEY = 'pc-shop.custom-configurations';
export const CUSTOM_CONFIGURATION_CATEGORY_SLUG = 'custom-configuration';

export const SLOT_LABEL_KEYS: Record<ComponentSlot, TranslationKey> = {
  cpu: 'configurator.slot.cpu',
  mainboard: 'configurator.slot.mainboard',
  ram: 'configurator.slot.ram',
  gpu: 'configurator.slot.gpu',
  storage: 'configurator.slot.storage',
  psu: 'configurator.slot.psu',
  case: 'configurator.slot.case',
  cooler: 'configurator.slot.cooler',
};

/**
 * Configured PCs are stored as synthetic Product-shaped entries rather than
 * changing CartItem's {productId, quantity} shape to know about "product or
 * configuration". CartViewService resolves unknown cart product ids against
 * this store, so cart/checkout/order-history all work unmodified.
 */
@Injectable({ providedIn: 'root' })
export class PcConfigurationStore {
  private readonly configurations = new Map<string, Product>(readStored());

  save(selection: Required<ComponentSelection>, language: Language): Product {
    const id = `config-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
    const product: Product = {
      id,
      categorySlug: CUSTOM_CONFIGURATION_CATEGORY_SLUG,
      name: {
        de: 'Individuelle PC-Konfiguration',
        en: 'Custom PC configuration',
      },
      description: {
        de: 'Deine individuell zusammengestellte PC-Konfiguration.',
        en: 'Your custom-assembled PC configuration.',
      },
      manufacturer: "Alex Web Coder's PC Shop",
      priceCents: calculateConfigurationTotalCents(selection),
      available: true,
      specs: REQUIRED_SLOTS.map((slot) => ({
        key: slot,
        label: TRANSLATIONS[SLOT_LABEL_KEYS[slot]],
        value: selection[slot].name[language],
      })),
    };
    this.configurations.set(id, product);
    this.persist();
    return product;
  }

  find(id: string): Product | undefined {
    return this.configurations.get(id);
  }

  allIds(): string[] {
    return Array.from(this.configurations.keys());
  }

  /** Part of the profile page's "reset demo data" action. */
  clear(): void {
    this.configurations.clear();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage was never available.
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.configurations.values())));
    } catch {
      // Storage can be unavailable — the configuration still works for this session.
    }
  }
}

function readStored(): [string, Product][] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((product: Product) => [product.id, product] as const) : [];
  } catch {
    return [];
  }
}
