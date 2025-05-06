import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AuthService,
  InitialsPipe,
  MenuSettingsSidebarService,
  RandomColorPipe,
  RoleService,
} from '@shared';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-sidebar',
  imports: [
    NgStyle,
    DrawerModule,
    RouterLink,
    RandomColorPipe,
    TranslateModule,
    ButtonModule,
    NgTemplateOutlet,
    InitialsPipe,
    TooltipModule,
    RouterLinkActive,
    AccordionModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SidebarComponent {
  isLoggedIn = inject(AuthService).isLoggedIn;
  currentUser = inject(AuthService).currentUser;
  #userRoles = inject(RoleService);

  visible = inject(MenuSettingsSidebarService).visible;
  model = inject(MenuSettingsSidebarService).model;
  closable = inject(MenuSettingsSidebarService).closable;
  showAll = signal<boolean>(false);
  defaultVisibleItems = signal(4);
  openSetting = signal(false);

  lists = computed(() => [
    {
      title: 'Manage',
      items: [
        {
          name: 'categories',
          routerlink: 'categories',
          visible: true,
        },
        {
          name: 'blogs',
          routerlink: 'blogs',
          visible: true,
        },
        {
          name: 'coupons',
          routerlink: 'coupons',
          visible: true,
        },
        {
          name: 'products',
          routerlink: 'products',
          visible: true,
        },
      ],
    },
  ]);

  settingSections = computed(() => [
    {
      title: 'Settings',
      items: [
        {
          name: 'users',
          routerlink: 'users',
          visible: true,
        },
        {
          name: 'banks',
          routerlink: 'banks',
          visible: true,
        },
        {
          name: 'locations',
          routerlink: 'locations',
          visible: true,
        },
        {
          name: 'customers',
          routerlink: 'customers',
          visible: true,
        },
        {
          name: 'contact',
          routerlink: 'contact',
          visible: true,
        },
        {
          name: 'faqs',
          routerlink: 'faqs',
          visible: true,
        },
        {
          name: 'shipments',
          routerlink: 'shipments',
          visible: true,
        },
        {
          name: 'wishlists',
          routerlink: 'wishlists',
          visible: true,
        },
      ],
    },
  ]);
}
