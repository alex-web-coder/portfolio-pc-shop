import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.Home),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { title: 'Komponenten' },
  },
  {
    path: 'prebuilt-pcs',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { title: 'Komplett-PCs' },
  },
  {
    path: 'configurator',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { title: 'PC-Konfigurator' },
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { title: 'Warenkorb' },
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { title: 'Kasse' },
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then((m) => m.ComingSoon),
    data: { title: 'Profil' },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFound),
  },
];
