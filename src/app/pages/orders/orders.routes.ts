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
];
