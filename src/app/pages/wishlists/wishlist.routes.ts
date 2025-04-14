import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const WishlistRoutes: Routes = [
  {
    path: 'wishlists', // Adjusted path for wishlists
    loadComponent: () => import('./wishlists/wishlist.component'), // Adjusted component for wishlists
    title: 'Wishlists', // Adjusted title for wishlists
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-admin-assistant', 'wishlist-owner'], // Adjusted roles
    //     store: ['8x-owner', '8x-admin-assistant', 'wishlist-owner'], // Adjusted roles
    //     show: ['8x-owner', '8x-admin-assistant', 'wishlist-owner'], // Adjusted roles
    //     update: ['8x-owner', 'wishlist-owner'], // Adjusted roles
    //     delete: ['8x-owner', '8x-admin-assistant'], // Adjusted roles
    //     redirectTo: '403', // Redirect to 403 if access denied
    //   },
    // },
  },
  {
    path: 'new-wishlist', // Adjusted path for new wishlist
    loadComponent: () =>
      import('./create-update-wishlist/create-update-wishlist.component'), // Adjusted component for new wishlist
    title: 'Create New Wishlist', // Adjusted title for new wishlist
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: ['8x-owner', '8x-admin-assistant', 'wishlist-owner'], // Adjusted roles
    //     redirectTo: '403', // Redirect to 403 if access denied
    //   },
    // },
  },
];
