import { Routes } from '@angular/router';

export const FaqRoutes: Routes = [
  {
    path: 'faqs',
    loadComponent: () => import('./faq/faq.component'),
    title: 'faqs',
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
    path: 'new-faq',
    loadComponent: () =>
      import('./create-update-faq/create-update-faq.component'),
    title: 'new faq',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-faq',
    loadComponent: () =>
      import('./create-update-faq/create-update-faq.component'),
    title: 'Update faq',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
