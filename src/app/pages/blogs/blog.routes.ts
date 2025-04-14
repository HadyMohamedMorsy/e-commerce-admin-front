import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component'),
    title: 'Blog',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-marketing', '8x-editor'],
    //     store: ['8x-owner', '8x-editor'],
    //     show: ['8x-owner', '8x-marketing', '8x-editor'],
    //     update: ['8x-owner', '8x-editor'],
    //     delete: ['8x-owner'],
    //     redirectTo: '403',
    //   },
    // },
  },
  {
    path: 'new-blog',
    loadComponent: () =>
      import('./create-update-blog/create-update-blog.component'),
    title: 'Create New Blog',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     store: ['8x-owner', '8x-editor'],
    //   },
    // },
  },
  {
    path: 'update-blog',
    loadComponent: () =>
      import('./create-update-blog/create-update-blog.component').then(
        (m) => m.default,
      ),
    title: 'Update Blog',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     update: ['8x-owner', '8x-editor'],
    //   },
    // },
  },
];
