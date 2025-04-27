import { Routes } from '@angular/router';

export const bankRoutes: Routes = [
  {
    path: 'banks',
    loadComponent: () => import('./banks/bank.component'),
    title: 'banks',
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
    path: 'new-bank',
    loadComponent: () =>
      import('./create-update-bank/create-update-bank.component'),
    title: 'new bank',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-bank',
    loadComponent: () =>
      import('./create-update-bank/create-update-bank.component'),
    title: 'Update bank',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
