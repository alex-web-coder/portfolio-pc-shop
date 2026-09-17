import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
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
      return throwError(
        () => new HttpErrorResponse({ status: 404, statusText: 'Not Found', url: req.url }),
      ).pipe(delay(MOCK_LATENCY_MS));
    }
    return respond(product);
  }

  return next(req);
};

function respond<T>(body: T) {
  return of(new HttpResponse({ status: 200, body })).pipe(delay(MOCK_LATENCY_MS));
}
