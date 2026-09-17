import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Category } from '../models/category.model';
import { Order, PlaceOrderRequest } from '../models/order.model';
import { Product } from '../models/product.model';
import { PRODUCTS } from './mock-api.data';
import { mockApiInterceptor } from './mock-api.interceptor';

describe('mockApiInterceptor', () => {
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([mockApiInterceptor]))],
    });
    http = TestBed.inject(HttpClient);
  });

  it('answers GET /api/categories with the full category list', async () => {
    const categories = await firstValueFrom(http.get<Category[]>('/api/categories'));
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.some((c) => c.slug === 'graphics-cards')).toBe(true);
  });

  it('answers GET /api/products with the full product list', async () => {
    const products = await firstValueFrom(http.get<Product[]>('/api/products'));
    expect(products.length).toBe(PRODUCTS.length);
  });

  it('filters GET /api/products by categorySlug', async () => {
    const products = await firstValueFrom(
      http.get<Product[]>('/api/products', { params: { categorySlug: 'graphics-cards' } }),
    );
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.categorySlug === 'graphics-cards')).toBe(true);
  });

  it('answers GET /api/products/:id with the matching product', async () => {
    const product = await firstValueFrom(http.get<Product>('/api/products/gpu-1'));
    expect(product.id).toBe('gpu-1');
  });

  it('errors with 404 for an unknown product id', async () => {
    await expect(firstValueFrom(http.get('/api/products/does-not-exist'))).rejects.toMatchObject({
      status: 404,
    });
  });

  it('creates an order on POST /api/orders with a generated id and timestamp', async () => {
    const request: PlaceOrderRequest = {
      lines: [{ productId: 'gpu-1', name: { de: 'x', en: 'x' }, priceCents: 100, quantity: 1, specs: [] }],
      subtotalCents: 100,
      shippingCents: 0,
      totalCents: 100,
      contact: { fullName: 'Test', email: 'test@example.com' },
      shippingAddress: { street: 'Street 1', postalCode: '12345', city: 'City', country: 'de' },
      paymentMethod: 'card',
    };
    const order = await firstValueFrom(http.post<Order>('/api/orders', request));
    expect(order.id).toMatch(/^DEMO-/);
    expect(order.createdAt).toBeTruthy();
    expect(order.totalCents).toBe(100);
  });

  it('simulates an order failure for the documented trigger email', async () => {
    const request: PlaceOrderRequest = {
      lines: [],
      subtotalCents: 0,
      shippingCents: 0,
      totalCents: 0,
      contact: { fullName: 'Fehler Test', email: 'fehler@beispiel.de' },
      shippingAddress: { street: 'Street 1', postalCode: '12345', city: 'City', country: 'de' },
      paymentMethod: 'card',
    };
    await expect(firstValueFrom(http.post('/api/orders', request))).rejects.toMatchObject({ status: 500 });
  });
});
