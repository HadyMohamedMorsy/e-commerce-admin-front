import { Routes } from '@angular/router';

export const OrdersRoutes: Routes = [
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.component'),
    title: 'orders',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //     store: [],
    //     show: [],
    //     update: [],
    //     delete: [],
    //     redirectTo: '403',
    //   },
    // },
  },
  {
    path: 'new-order',
    loadComponent: () =>
      import('./create-update-orders/create-update-orders.component'),
    title: 'new order',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
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
    //     index: [],
    //   },
    // },
  },
];
