import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const customOrdersRoutes: Routes = [
  {
    path: 'custom-orders',
    loadComponent: () => import('./custom-order/custom-order.component'),
    title: 'custom orders',
    canActivate: [RoleGuard],
    data: {
      roles: {
        index: [
          'CEO',
          'TECH_SUPPORT',
          'STORE_MANAGER',
          'SUPER_ADMIN',
          'INVENTORY_MANAGER',
          'CONTENT_MANAGER',
          'SYSTEM_ADMIN',
        ],
        show: [
          'CEO',
          'TECH_SUPPORT',
          'STORE_MANAGER',
          'SUPER_ADMIN',
          'INVENTORY_MANAGER',
          'CONTENT_MANAGER',
          'SYSTEM_ADMIN',
        ],
        delete: [
          'CEO',
          'TECH_SUPPORT',
          'STORE_MANAGER',
          'SUPER_ADMIN',
          'INVENTORY_MANAGER',
          'CONTENT_MANAGER',
          'SYSTEM_ADMIN',
        ],
        redirectTo: '403',
      },
    },
  },
];
