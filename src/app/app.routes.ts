import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.Home),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/category-grid/category-grid.component').then((m) => m.CategoryGrid),
  },
  {
    path: 'components/:categorySlug',
    loadComponent: () => import('./pages/product-list/product-list.component').then((m) => m.ProductList),
  },
  {
    path: 'components/:categorySlug/:productId',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then((m) => m.ProductDetail),
  },
  {
    path: 'prebuilt-pcs',
    loadComponent: () => import('./pages/product-list/product-list.component').then((m) => m.ProductList),
    data: { categorySlug: 'prebuilt-pcs' },
  },
  {
    path: 'prebuilt-pcs/:productId',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then((m) => m.ProductDetail),
  },
  {
    path: 'configurator',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { titleKey: 'pages.configurator.title' },
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { titleKey: 'pages.cart.title' },
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { titleKey: 'pages.checkout.title' },
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { titleKey: 'pages.profile.title' },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFound),
  },
];
