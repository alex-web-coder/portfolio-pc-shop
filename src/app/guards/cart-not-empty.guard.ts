import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

/**
 * Only checked when navigating INTO /checkout, so clearing the cart after a
 * successful order (while already on the confirmation view) can't bounce
 * the user back to /cart.
 */
export const cartNotEmptyGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);
  return cartService.itemCount() > 0 ? true : router.createUrlTree(['/cart']);
};
