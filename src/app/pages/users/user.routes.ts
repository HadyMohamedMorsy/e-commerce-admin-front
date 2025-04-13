import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const userRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users/users.component'),
    title: 'users',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-admin-assistant', 'customer-owner'],
    //     store: ['8x-owner', '8x-admin-assistant', 'customer-owner'],
    //     show: ['8x-owner', '8x-admin-assistant', 'customer-owner'],
    //     update: ['8x-owner', 'customer-owner'],
    //     delete: ['8x-owner', '8x-admin-assistant'],
    //     redirectTo: '403',
    //   },
    // },
  },
  {
    path: 'new-user',
    loadComponent: () =>
      import('./create-update-user/create-update-user.component'),
    title: 'new user',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-admin-assistant', 'customer-owner'],
    //     redirectTo: '403',
    //   },
    // },
  },
];
