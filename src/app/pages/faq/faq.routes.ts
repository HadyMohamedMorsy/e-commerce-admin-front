import { Routes } from '@angular/router';
import { RoleGuard } from '@shared';

export const FaqRoutes: Routes = [
  {
    path: 'faqs',
    loadComponent: () => import('./faq/faq.component'),
    title: 'faqs',
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
    path: 'new-faq',
    loadComponent: () =>
      import('./create-update-faq/create-update-faq.component'),
    title: 'new faq',
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
    path: 'update-faq',
    loadComponent: () =>
      import('./create-update-faq/create-update-faq.component'),
    title: 'Update faq',
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
