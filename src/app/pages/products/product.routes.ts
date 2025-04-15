import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const ProductsRoutes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./product/product.component'),
    title: 'products',
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
    path: 'new-product',
    loadComponent: () =>
      import('./create-update-product/create-update-product.component'),
    title: 'new product',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-product',
    loadComponent: () =>
      import('./create-update-product/create-update-product.component'),
    title: 'Update product',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
