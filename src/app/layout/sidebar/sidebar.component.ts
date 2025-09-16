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

  #checkVisibility(roles: string[]): boolean {
    return this.#userRoles.hasAnyRole(roles);
  }

  lists = computed(() => [
    {
      title: 'Manage',
      items: [
        {
          name: 'Categories',
          routerlink: 'categories',
          visible: this.#checkVisibility([
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
          name: 'Blogs',
          routerlink: 'blogs',
          visible: this.#checkVisibility([
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
          name: 'Orders',
          routerlink: 'orders',
          visible: this.#checkVisibility([
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
          name: 'Custom Orders',
          routerlink: 'custom-orders',
          visible: this.#checkVisibility([
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
          name: 'Coupons',
          routerlink: 'coupons',
          visible: this.#checkVisibility([
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
          name: 'Products',
          routerlink: 'products',
          visible: this.#checkVisibility([
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
          name: 'Reviews',
          routerlink: 'reviews',
          visible: this.#checkVisibility([
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
          name: 'Shapes',
          routerlink: 'shapes',
          visible: this.#checkVisibility([
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
          name: 'Shape Categories',
          routerlink: 'shape-categories',
          visible: this.#checkVisibility([
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
          name: 'Pages',
          routerlink: 'books',
          visible: this.#checkVisibility([
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
          name: 'Quiz',
          routerlink: 'quiz',
          visible: this.#checkVisibility([
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
          name: 'Answers',
          routerlink: 'answer',
          visible: this.#checkVisibility([
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
          name: 'Paper Types',
          routerlink: 'paper-types',
          visible: this.#checkVisibility([
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
          name: 'General Settings',
          routerlink: 'general-setting',
          visible: this.#checkVisibility([
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
          name: 'Address',
          routerlink: 'address',
          visible: this.#checkVisibility([
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
          name: 'Users',
          routerlink: 'users',
          visible: this.#checkVisibility([
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
          name: 'Banks',
          routerlink: 'banks',
          visible: this.#checkVisibility([
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
          name: 'Locations',
          routerlink: 'locations',
          visible: this.#checkVisibility([
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
          name: 'Customers',
          routerlink: 'customers',
          visible: this.#checkVisibility([
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
          name: 'Contacts',
          routerlink: 'contact',
          visible: this.#checkVisibility([
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
          name: 'FAQs',
          routerlink: 'faqs',
          visible: this.#checkVisibility([
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
          name: 'Shipments',
          routerlink: 'shipments',
          visible: this.#checkVisibility([
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
          name: 'Payment Methods',
          routerlink: 'payment-methods',
          visible: this.#checkVisibility([
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
