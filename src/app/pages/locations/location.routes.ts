import { Routes } from '@angular/router';

export const locationRoutes: Routes = [
  {
    path: 'locations',
    loadComponent: () => import('./location/location.component'),
    title: 'location',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [''],
    //     store: [''],
    //     show: [''],
    //     update: [''],
    //     delete: [''],
    //     redirectTo: '403',
    //   },
    // },
  },
  {
    path: 'locations/:locationId',
    loadComponent: () => import('./location/location.component'),
    title: 'location',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [''],
    //     store: [''],
    //     show: [''],
    //     update: [''],
    //     delete: [''],
    //     redirectTo: '403',
    //   },
    // },
  },
  {
    path: 'new-location',
    loadComponent: () =>
      import('./create-update-location/create-update-location.component'),
    title: 'new location',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [''],
    //   },
    // },
  },
  {
    path: 'update-location',
    loadComponent: () =>
      import('./create-update-location/create-update-location.component'),
    title: 'Update location',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [''],
    //   },
    // },
  },
];
