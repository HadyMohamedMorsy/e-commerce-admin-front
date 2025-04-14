import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const OrdersRoutes: Routes = [
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.component'),
    title: 'customers',
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
    path: 'new-order',
    loadComponent: () =>
      import('./create-update-orders/create-update-orders.component'),
    title: 'new customer',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-sales-team-leader'],
    //   },
    // },
  },
  {
    path: 'update-order',
    loadComponent: () =>
      import('./create-update-orders/create-update-orders.component'),
    title: 'Update order',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner'],
    //   },
    // },
  },
];
