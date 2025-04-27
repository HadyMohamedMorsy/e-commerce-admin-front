import { Routes } from '@angular/router';

export const shipmentRoutes: Routes = [
  {
    path: 'shipments',
    loadComponent: () => import('./shipment/shipment.component'),
    title: 'shipments',
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
    path: 'new-shipment',
    loadComponent: () =>
      import('./create-update-shipment/create-update-shipment.component'), // Updated component path
    title: 'new shipment', // Updated title
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
  {
    path: 'update-shipment',
    loadComponent: () =>
      import('./create-update-shipment/create-update-shipment.component'),
    title: 'Update shipment',
    // canActivate: [RoleGuard],
    // data: {
    //   roles: {
    //     index: [],
    //   },
    // },
  },
];
