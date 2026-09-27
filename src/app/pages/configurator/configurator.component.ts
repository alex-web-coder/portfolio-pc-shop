import { Component, computed, inject, signal } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ComponentSelection, ComponentSlot, CompatibilityIssue } from '../../models/pc-configuration.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { PcConfigurationStore, SLOT_LABEL_KEYS } from '../../services/pc-configuration-store.service';
import { REQUIRED_SLOTS, calculateConfigurationTotalCents, checkCompatibility } from '../../services/pc-compatibility';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

const SLOT_CATEGORY_SLUG: Record<ComponentSlot, string> = {
  cpu: 'processors',
  mainboard: 'mainboards',
  ram: 'memory',
  gpu: 'graphics-cards',
  storage: 'storage',
  psu: 'power-supplies',
  case: 'cases',
  cooler: 'coolers',
};

@Component({
  imports: [],
  selector: 'app-configurator',
  styleUrl: './configurator.component.scss',
  templateUrl: './configurator.component.html',
})
export class Configurator {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly configurationStore = inject(PcConfigurationStore);
  private readonly notification = inject(NotificationService);
  protected readonly i18n = inject(TranslationService);

  protected readonly slots = REQUIRED_SLOTS;
  protected readonly slotLabelKeys = SLOT_LABEL_KEYS;

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly optionsBySlot = signal<Partial<Record<ComponentSlot, Product[]>>>({});
  protected readonly selection = signal<ComponentSelection>({});
  protected readonly justAdded = signal(false);

  protected readonly compatibility = computed(() => checkCompatibility(this.selection()));
  protected readonly totalCents = computed(() => calculateConfigurationTotalCents(this.selection()));

  constructor() {
    const requests = REQUIRED_SLOTS.map((slot) =>
      this.productService
        .getProducts(SLOT_CATEGORY_SLUG[slot])
        .pipe(map((products) => [slot, products.filter((product) => product.available)] as const)),
    );

    forkJoin(requests).subscribe({
      next: (pairs) => {
        const bySlot: Partial<Record<ComponentSlot, Product[]>> = {};
        for (const [slot, products] of pairs) {
          bySlot[slot] = products;
        }
        this.optionsBySlot.set(bySlot);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  protected optionsFor(slot: ComponentSlot): Product[] {
    return this.optionsBySlot()[slot] ?? [];
  }

  protected selectedIdFor(slot: ComponentSlot): string {
    return this.selection()[slot]?.id ?? '';
  }

  protected productName(product: Product): string {
    return product.name[this.i18n.language()];
  }

  protected formatPrice(cents: number): string {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
  }

  protected issuesForSlot(slot: ComponentSlot): CompatibilityIssue[] {
    return this.compatibility().issues.filter((issue) => issue.slots.includes(slot));
  }

  protected onSelectChange(slot: ComponentSlot, productId: string): void {
    this.justAdded.set(false);
    const product = this.optionsFor(slot).find((candidate) => candidate.id === productId);
    this.selection.update((current) => {
      const next = { ...current };
      if (product) {
        next[slot] = product;
      } else {
        delete next[slot];
      }
      return next;
    });
  }

  protected addToCart(): void {
    if (!this.compatibility().isValid) return;
    const product = this.configurationStore.save(
      this.selection() as Required<ComponentSelection>,
      this.i18n.language(),
    );
    this.cartService.add(product.id);
    this.justAdded.set(true);
    this.selection.set({});
    this.notification.show(this.i18n.t('configurator.addedToCart'));
  }
}
