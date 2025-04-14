import { Routes } from '@angular/router';

export const addressRoutes: Routes = [
  {
    path: 'address',
    loadComponent: () => import('./address/address.component'),
    title: 'address',
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
    path: 'new-address',
    loadComponent: () =>
      import('./create-update-address/create-update-address.component'),
    title: 'new address',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-sales-team-leader'],
    //   },
    // },
  },
  {
    path: 'update-address',
    loadComponent: () =>
      import('./create-update-address/create-update-address.component'),
    title: 'Update address',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner'],
    //   },
    // },
  },
];
