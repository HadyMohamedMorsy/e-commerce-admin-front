import { Routes } from '@angular/router';

export const addressRoutes: Routes = [
  {
    path: 'address',
    loadComponent: () => import('./address/address.component'),
    title: 'address',
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
    path: 'new-address',
    loadComponent: () =>
      import('./create-update-bank/create-update-address.component'),
    title: 'new address',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-address',
    loadComponent: () =>
      import('./create-update-bank/create-update-address.component'),
    title: 'Update address',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
