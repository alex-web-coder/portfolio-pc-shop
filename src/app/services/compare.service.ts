import { Injectable, computed, signal } from '@angular/core';

const MAX_COMPARE = 3;

/**
 * Session-only (not persisted) — a comparison tray is a transient browsing
 * aid, not demo data worth surviving a reload like the cart/profile do.
 */
@Injectable({ providedIn: 'root' })
export class CompareService {
  private readonly idsSignal = signal<string[]>([]);

  readonly ids = this.idsSignal.asReadonly();
  readonly count = computed(() => this.idsSignal().length);
  readonly isFull = computed(() => this.idsSignal().length >= MAX_COMPARE);

  isSelected(productId: string): boolean {
    return this.idsSignal().includes(productId);
  }

  toggle(productId: string): void {
    this.idsSignal.update((ids) => {
      if (ids.includes(productId)) return ids.filter((id) => id !== productId);
      if (ids.length >= MAX_COMPARE) return ids;
      return [...ids, productId];
    });
  }

  remove(productId: string): void {
    this.idsSignal.update((ids) => ids.filter((id) => id !== productId));
  }

  clear(): void {
    this.idsSignal.set([]);
  }
}

export { MAX_COMPARE };
