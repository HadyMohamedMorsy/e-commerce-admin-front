import { Routes } from '@angular/router';

export const couponRoutes: Routes = [
  {
    path: 'coupon',
    loadComponent: () => import('./coupons/coupons.component'),
    title: 'Coupons',
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
    path: 'new-coupon',
    loadComponent: () =>
      import('./create-update-coupons/create-update-coupons.component'),
    title: 'New Coupon',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-coupon',
    loadComponent: () =>
      import('./create-update-coupons/create-update-coupons.component'),
    title: 'Update Coupon',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
