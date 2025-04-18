import { Routes } from '@angular/router';

export const contactRoutes: Routes = [
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component'),
    title: 'Contacts',
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
