import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Order, OrderHistoryEntry, PlaceOrderRequest } from '../models/order.model';

const FLAT_SHIPPING_CENTS = 499;
const FREE_SHIPPING_THRESHOLD_CENTS = 10000;
const HISTORY_STORAGE_KEY = 'pc-shop.order-history';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);

  placeOrder(request: PlaceOrderRequest): Observable<Order> {
    return this.http
      .post<Order>('/api/orders', request)
      .pipe(tap((order) => appendToHistory(order)));
  }

  getOrderHistory(): OrderHistoryEntry[] {
    return readHistory();
  }
}

/** Flat rate, free above the threshold — the "clear, simple shipping rule" the plan asks for. */
export function calculateShippingCents(subtotalCents: number): number {
  if (subtotalCents === 0) return 0;
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : FLAT_SHIPPING_CENTS;
}

export { FLAT_SHIPPING_CENTS, FREE_SHIPPING_THRESHOLD_CENTS };

function appendToHistory(order: Order): void {
  try {
    const entry: OrderHistoryEntry = {
      id: order.id,
      createdAt: order.createdAt,
      lines: order.lines,
      subtotalCents: order.subtotalCents,
      shippingCents: order.shippingCents,
      totalCents: order.totalCents,
    };
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([entry, ...readHistory()]));
  } catch {
    // Storage can be unavailable — the confirmation view still shows this session's order.
  }
}

function readHistory(): OrderHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
