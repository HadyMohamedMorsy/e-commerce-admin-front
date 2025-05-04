import { Routes } from '@angular/router';

export const taxRoutes: Routes = [
  {
    path: 'taxes',
    loadComponent: () => import('./tax/tax.component'),
    title: 'taxes',
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
    path: 'new-tax',
    loadComponent: () =>
      import('./create-update-tax/create-update-tax.component'),
    title: 'new tax',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-tax',
    loadComponent: () =>
      import('./create-update-tax/create-update-tax.component'),
    title: 'Update tax',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
