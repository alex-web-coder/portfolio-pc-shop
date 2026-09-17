import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

const STORAGE_KEY = 'pc-shop.cart';
const MAX_QUANTITY = 10;

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>(readStoredCart());

  readonly items = this.itemsSignal.asReadonly();

  readonly itemCount = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0),
  );

  constructor() {
    effect(() => writeStoredCart(this.itemsSignal()));
  }

  add(productId: string, quantity = 1): void {
    this.itemsSignal.update((items) => {
      const existing = items.find((item) => item.productId === productId);
      if (existing) {
        return items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
            : item,
        );
      }
      return [...items, { productId, quantity: clampQuantity(quantity) }];
    });
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.itemsSignal.update((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, quantity: clampQuantity(quantity) } : item,
      ),
    );
  }

  remove(productId: string): void {
    this.itemsSignal.update((items) => items.filter((item) => item.productId !== productId));
  }

  clear(): void {
    this.itemsSignal.set([]);
  }

  /** Drops cart items whose product no longer exists in the catalog. */
  removeUnknownProductIds(knownProductIds: ReadonlySet<string>): void {
    this.itemsSignal.update((items) =>
      items.filter((item) => knownProductIds.has(item.productId)),
    );
  }
}

export function calculateSubtotalCents(
  lines: ReadonlyArray<{ priceCents: number; quantity: number }>,
): number {
  return lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
}

function clampQuantity(quantity: number): number {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));
}

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidCartItem) : [];
  } catch {
    return [];
  }
}

function isValidCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate['productId'] === 'string' && typeof candidate['quantity'] === 'number' && candidate['quantity'] > 0;
}

function writeStoredCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable (private browsing, restricted environments) —
    // the cart still works in-memory for the current session.
  }
}
