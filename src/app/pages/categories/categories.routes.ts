import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.component'),
    title: 'categories',
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
    path: 'new-category',
    loadComponent: () =>
      import('./create-update-categories/create-update-categories.component'),
    title: 'new category',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
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
    //     index: [],
    //   },
    // },
  },
];
