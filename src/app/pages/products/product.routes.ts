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
    //     index: ['8x-owner', '8x-product-manager', '8x-sales-team-leader'],
    //     store: ['8x-owner', '8x-product-manager'],
    //     show: ['8x-owner', '8x-product-manager', '8x-sales-team-leader'],
    //     update: ['8x-owner', '8x-product-manager'],
    //     delete: ['8x-owner'],
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
    //     index: ['8x-owner', '8x-product-manager'],
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
    //     index: ['8x-owner', '8x-product-manager'],
    //   },
    // },
  },
];
