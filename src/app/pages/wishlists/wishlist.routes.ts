import { Routes } from '@angular/router';

export const WishlistRoutes: Routes = [
  {
    path: 'wishlists',
    loadComponent: () => import('./wishlists/wishlist.component'),
    title: 'Wishlists',
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
];
