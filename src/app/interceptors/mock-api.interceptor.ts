import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { Order, PlaceOrderRequest } from '../models/order.model';
import { CATEGORIES, PRODUCTS } from './mock-api.data';

// Simulated network latency so loading states are actually observable in the demo.
const MOCK_LATENCY_MS = 300;

// Deterministic, documented way to exercise the checkout error path in testing/demos —
// never triggered by normal data, per the plan's "no random errors" rule.
const SIMULATED_ORDER_FAILURE_EMAIL = 'fehler@beispiel.de';

/**
 * Stands in for a real backend: answers the fake `/api/...` paths our services call.
 * Removing this provider (and pointing the paths at a real API) is the whole migration
 * path to a real backend later.
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === '/api/categories') {
    return respond(CATEGORIES);
  }

  if (req.url === '/api/products') {
    const categorySlug = req.params.get('categorySlug');
    const products = categorySlug
      ? PRODUCTS.filter((product) => product.categorySlug === categorySlug)
      : PRODUCTS;
    return respond(products);
  }

  const productIdMatch = req.url.match(/^\/api\/products\/([^/]+)$/);
  if (productIdMatch) {
    const product = PRODUCTS.find((candidate) => candidate.id === productIdMatch[1]);
    if (!product) {
      return respondNotFound(req.url);
    }
    return respond(product);
  }

  if (req.method === 'POST' && req.url === '/api/orders') {
    const request = req.body as PlaceOrderRequest;
    if (request.contact.email === SIMULATED_ORDER_FAILURE_EMAIL) {
      return throwError(
        () => new HttpErrorResponse({ status: 500, statusText: 'Simulated order failure', url: req.url }),
      ).pipe(delay(MOCK_LATENCY_MS));
    }
    const order: Order = { ...request, id: generateDemoOrderId(), createdAt: new Date().toISOString() };
    return respond(order, 201);
  }

  return next(req);
};

function respond<T>(body: T, status = 200) {
  return of(new HttpResponse({ status, body })).pipe(delay(MOCK_LATENCY_MS));
}

function respondNotFound(url: string) {
  return throwError(
    () => new HttpErrorResponse({ status: 404, statusText: 'Not Found', url }),
  ).pipe(delay(MOCK_LATENCY_MS));
}

function generateDemoOrderId(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `DEMO-${random}`;
}
