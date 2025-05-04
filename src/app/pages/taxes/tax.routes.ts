import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const taxRoutes: Routes = [
  {
    path: 'taxes',
    loadComponent: () => import('./tax/tax.component'),
    title: 'taxes',
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
  {
    path: 'new-tax',
    loadComponent: () =>
      import('./create-update-tax/create-update-tax.component'),
    title: 'new tax',
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
        redirectTo: '403',
      },
    },
  },
  {
    path: 'update-tax',
    loadComponent: () =>
      import('./create-update-tax/create-update-tax.component'),
    title: 'Update tax',
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
        redirectTo: '403',
      },
    },
  },
];
