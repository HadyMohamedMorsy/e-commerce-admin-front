import { Routes } from '@angular/router';

export const CartsRoutes: Routes = [
  {
    path: 'carts',
    loadComponent: () => import('./carts/carts.component'),
    title: 'carts',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-sales-team-leader', '8x-accountant'],
    //     store: ['8x-owner', '8x-sales-team-leader'],
    //     show: ['8x-owner', '8x-sales-team-leader', '8x-accountant'],
    //     update: ['8x-owner'],
    //     delete: ['8x-owner'],
    //     redirectTo: '403',
    //   },
    // },
  },
  {
    path: 'new-cart',
    loadComponent: () =>
      import('./create-update-cart/create-update-cart.component'),
    title: 'new cart',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-sales-team-leader'],
    //   },
    // },
  },
  {
    path: 'update-cart',
    loadComponent: () =>
      import('./create-update-cart/create-update-cart.component'),
    title: 'Update cart',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner'],
    //   },
    // },
  },
];
