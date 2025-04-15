import { Routes } from '@angular/router';

export const CartsRoutes: Routes = [
  {
    path: 'carts',
    loadComponent: () => import('./carts/carts.component'),
    title: 'carts',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //     show: [],
    //     redirectTo: '403',
    //   },
    // },
  },
];
