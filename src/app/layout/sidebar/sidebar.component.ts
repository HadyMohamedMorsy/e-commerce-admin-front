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

  private checkVisibility(roles: string[]): boolean {
    return this.#userRoles.hasAnyRole(roles);
  }

  lists = computed(() => [
    {
      title: 'Manage',
      items: [
        {
          name: 'categories',
          routerlink: 'categories',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'blogs',
          routerlink: 'blogs',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'coupons',
          routerlink: 'coupons',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'products',
          routerlink: 'products',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'reviews',
          routerlink: 'reviews',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
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
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'banks',
          routerlink: 'banks',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'locations',
          routerlink: 'locations',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'customers',
          routerlink: 'customers',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'contact',
          routerlink: 'contact',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'faqs',
          routerlink: 'faqs',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
        {
          name: 'shipments',
          routerlink: 'shipments',
          visible: this.checkVisibility([
            'CEO',
            'TECH_SUPPORT',
            'STORE_MANAGER',
            'SUPER_ADMIN',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER',
            'SYSTEM_ADMIN',
          ]),
        },
      ],
    },
  ]);
}
