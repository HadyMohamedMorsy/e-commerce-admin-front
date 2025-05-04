import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const CartsRoutes: Routes = [
  {
    path: 'carts',
    loadComponent: () => import('./carts/carts.component'),
    title: 'carts',
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
        redirectTo: '403',
      },
    },
  },
];
