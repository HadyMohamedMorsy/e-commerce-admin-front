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
    path: 'new-user',
    loadComponent: () =>
      import('./create-update-user/create-update-user.component'),
    title: 'new user',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //     redirectTo: '403',
    //   },
    // },
  },
];
