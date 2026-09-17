import { LocalizedText } from './localized-text.model';
import { ProductSpec } from './product-spec.model';

export interface OrderLineSnapshot {
  productId: string;
  name: LocalizedText;
  priceCents: number;
  quantity: number;
  /** Carried through so a configured PC's component breakdown survives to order confirmation. */
  specs: ProductSpec[];
}

export interface OrderContact {
  fullName: string;
  email: string;
}

export interface OrderShippingAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export type PaymentMethod = 'card' | 'paypal' | 'invoice';

export interface Order {
  id: string;
  createdAt: string;
  lines: OrderLineSnapshot[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  contact: OrderContact;
  shippingAddress: OrderShippingAddress;
  paymentMethod: PaymentMethod;
}

export type PlaceOrderRequest = Omit<Order, 'id' | 'createdAt'>;

/** What we keep in local demo order history — no contact/address, per the plan's data-minimization rule. */
export interface OrderHistoryEntry {
  id: string;
  createdAt: string;
  lines: OrderLineSnapshot[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}
