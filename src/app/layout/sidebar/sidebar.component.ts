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
          name: 'customers',
          details: 'list',
          routerlink: 'customers',
          visible: this.#userRoles.hasAnyRole([
            '8x-owner',
            '8x-sales-team-leader',
            '8x-accountant',
          ]),
        },
        {
          name: 'subscription',
          details: 'list',
          routerlink: 'subscriptions',
          visible: this.#userRoles.hasAnyRole([
            '8x-owner',
            '8x-admin-assistant',
            '8x-cs-manager',
            '8x-cs-team-leader',
            '8x-customer-success',
            '8x-renewals-manager',
            'customer-owner',
            'customer-delegated-person',
          ]),
        },
        {
          name: 'invoices',
          details: 'list',
          routerlink: 'invoices',
          visible: this.#userRoles.hasAnyRole([
            '8x-owner',
            '8x-admin-assistant',
            '8x-cs-manager',
            '8x-cs-team-leader',
            '8x-customer-success',
            '8x-help-desk',
            '8x-renewals-manager',
            '8x-accountant',
            'customer-owner',
            'customer-delegated-person',
          ]),
        },
        // {
        //   name: 'requests',
        //   details: 'list',
        //   routerlink: 'requests',
        //   visible : true,
        // },
        {
          name: 'payments',
          details: 'list',
          routerlink: 'payments',
          visible: this.#userRoles.hasAnyRole([
            '8x-owner',
            '8x-admin-assistant',
            '8x-cs-manager',
            '8x-cs-team-leader',
            '8x-customer-success',
            '8x-renewals-manager',
            '8x-accountant',
            'customer-delegated-person',
            'customer-owner',
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
          details: 'list',
          routerlink: 'users',
          visible: this.#userRoles.hasAnyRole([
            '8x-owner',
            '8x-admin-assistant',
            'customer-owner',
          ]),
        },
        {
          name: 'services',
          details: 'list',
          routerlink: 'services',
          visible: this.#userRoles.hasAnyRole([
            '8x-owner',
            '8x-admin-assistant',
            '8x-cs-manager',
          ]),
        },
        {
          name: 'packages',
          details: 'list',
          routerlink: 'packages',
          visible: this.#userRoles.hasAnyRole([
            '8x-owner',
            '8x-admin-assistant',
            '8x-cs-manager',
          ]),
        },
      ],
    },
  ]);
}
