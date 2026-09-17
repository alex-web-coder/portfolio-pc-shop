import { TestBed } from '@angular/core/testing';
import { CartService, calculateSubtotalCents } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('starts empty', () => {
    expect(service.items()).toEqual([]);
    expect(service.itemCount()).toBe(0);
  });

  it('adds a new product', () => {
    service.add('prod-1');
    expect(service.items()).toEqual([{ productId: 'prod-1', quantity: 1 }]);
  });

  it('increments quantity when adding an already-present product', () => {
    service.add('prod-1');
    service.add('prod-1', 2);
    expect(service.items()).toEqual([{ productId: 'prod-1', quantity: 3 }]);
  });

  it('clamps added quantity to the maximum of 10', () => {
    service.add('prod-1', 50);
    expect(service.items()[0].quantity).toBe(10);
  });

  it('clamps setQuantity to the maximum of 10', () => {
    service.add('prod-1');
    service.setQuantity('prod-1', 999);
    expect(service.items()[0].quantity).toBe(10);
  });

  it('removes the item when quantity is set to zero or below', () => {
    service.add('prod-1');
    service.setQuantity('prod-1', 0);
    expect(service.items()).toEqual([]);
  });

  it('removes an item', () => {
    service.add('prod-1');
    service.add('prod-2');
    service.remove('prod-1');
    expect(service.items()).toEqual([{ productId: 'prod-2', quantity: 1 }]);
  });

  it('clears all items', () => {
    service.add('prod-1');
    service.add('prod-2');
    service.clear();
    expect(service.items()).toEqual([]);
  });

  it('drops items referencing unknown product ids', () => {
    service.add('prod-1');
    service.add('prod-2');
    service.removeUnknownProductIds(new Set(['prod-1']));
    expect(service.items()).toEqual([{ productId: 'prod-1', quantity: 1 }]);
  });

  it('sums quantities across lines for itemCount', () => {
    service.add('prod-1', 2);
    service.add('prod-2', 3);
    expect(service.itemCount()).toBe(5);
  });
});

describe('calculateSubtotalCents', () => {
  it('sums price times quantity across lines', () => {
    const total = calculateSubtotalCents([
      { priceCents: 1000, quantity: 2 },
      { priceCents: 500, quantity: 3 },
    ]);
    expect(total).toBe(1000 * 2 + 500 * 3);
  });

  it('returns 0 for no lines', () => {
    expect(calculateSubtotalCents([])).toBe(0);
  });
});
