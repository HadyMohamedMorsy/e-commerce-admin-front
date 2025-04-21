import { Routes } from '@angular/router';

export const CustomersRoutes: Routes = [
  {
    path: 'customers',
    loadComponent: () => import('./customers/customers.component'),
    title: 'customers',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [''],
    //     store: [],
    //     show: [],
    //     update: [],
    //     delete: [],
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
    //     index: [],
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
    //     index: [],
    //   },
    // },
  },
];
