import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component'),
    title: 'Blog',
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
    path: 'new-blog',
    loadComponent: () =>
      import('./create-update-blog/create-update-blog.component'),
    title: 'Create New Blog',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     store: [],
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
    //     update: [],
    //   },
    // },
  },
];
