import { calculateShippingCents, FREE_SHIPPING_THRESHOLD_CENTS } from './order.service';

describe('calculateShippingCents', () => {
  it('returns 0 for an empty cart', () => {
    expect(calculateShippingCents(0)).toBe(0);
  });

  it('charges the flat rate below the free-shipping threshold', () => {
    expect(calculateShippingCents(FREE_SHIPPING_THRESHOLD_CENTS - 1)).toBe(499);
  });

  it('is free at and above the threshold', () => {
    expect(calculateShippingCents(FREE_SHIPPING_THRESHOLD_CENTS)).toBe(0);
    expect(calculateShippingCents(FREE_SHIPPING_THRESHOLD_CENTS + 1000)).toBe(0);
  });
});
