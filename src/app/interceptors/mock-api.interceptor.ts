import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { CATEGORIES, PRODUCTS } from './mock-api.data';

// Simulated network latency so loading states are actually observable in the demo.
const MOCK_LATENCY_MS = 300;

/**
 * Stands in for a real backend: answers the fake `/api/...` paths our services call.
 * Removing this provider (and pointing the paths at a real API) is the whole migration
 * path to a real backend later.
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === '/api/categories') {
    return of(new HttpResponse({ status: 200, body: CATEGORIES })).pipe(delay(MOCK_LATENCY_MS));
  }

  if (req.url === '/api/products') {
    return of(new HttpResponse({ status: 200, body: PRODUCTS })).pipe(delay(MOCK_LATENCY_MS));
  }

  return next(req);
};
