import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.Home),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { titleKey: 'pages.components.title' },
  },
  {
    path: 'prebuilt-pcs',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { titleKey: 'pages.prebuiltPcs.title' },
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
