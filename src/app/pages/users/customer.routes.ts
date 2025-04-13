import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const customersRoutes: Routes = [
  {
    path: 'customers',
    loadComponent: () => import('./customers/customers.component'),
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
    path: 'new-customer',
    loadComponent: () =>
      import('./create-update-customer/create-update-customer.component'),
    title: 'new customer',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-sales-team-leader'],
    //   },
    // },
  },
  {
    path: 'update-customer',
    loadComponent: () =>
      import('./create-update-customer/create-update-customer.component'),
    title: 'Update customer',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner'],
    //   },
    // },
  },
];
