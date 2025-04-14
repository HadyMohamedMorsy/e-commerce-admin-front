import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.component'),
    title: 'categories',
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
    path: 'new-category',
    loadComponent: () =>
      import('./create-update-categories/create-update-categories.component'),
    title: 'new category',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-sales-team-leader'],
    //   },
    // },
  },
  {
    path: 'update-category',
    loadComponent: () =>
      import('./create-update-categories/create-update-categories.component'),
    title: 'Update category',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner'],
    //   },
    // },
  },
];
