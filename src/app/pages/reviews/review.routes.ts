import { Routes } from '@angular/router';

export const reviewRoutes: Routes = [
  {
    path: 'review',
    loadComponent: () => import('./reviews/reviews.component'),
    title: 'review',
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
    path: 'new-review',
    loadComponent: () =>
      import('./create-update-review/create-update-reviews.component'),
    title: 'new review',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-review',
    loadComponent: () =>
      import('./create-update-review/create-update-reviews.component'),
    title: 'Update review',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
