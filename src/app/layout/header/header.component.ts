import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AuthService,
  BreakpointService,
  ConfirmService,
  MenuSettingsSidebarService,
  RoleService,
} from '@shared';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { tap } from 'rxjs';
import { GlobalSearchComponent } from './global-search/global-search.component';

@Component({
  selector: 'app-header',
  imports: [
    NgTemplateOutlet,
    SplitButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    GlobalSearchComponent,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {
  #authService = inject(AuthService);
  #confirmService = inject(ConfirmService);
  #breakpointService = inject(BreakpointService);
  isLgScreen = this.#breakpointService.isLgScreen;
  #translate = inject(TranslateService);
  #destroyRef = inject(DestroyRef);
  #userRoles = inject(RoleService);

  visible = inject(MenuSettingsSidebarService).visible;
  visibleFaq = inject(MenuSettingsSidebarService).visibleFaq;
  currentUser = inject(AuthService).currentUser;

  #router = inject(Router);
  displaySearchOnMobile = signal(false);

  hiddenSearchMobile$ = this.#breakpointService.isLgScreen$.pipe(
    tap((state) => {
      if (state) {
        this.displaySearchOnMobile.set(false);
      }
    }),
  );
  hiddenSearchMobile = toSignal(this.hiddenSearchMobile$, {
    initialValue: false,
  });

  createItems = signal<MenuItem[]>([
    {
      label: this.#translate.instant(_('New User')),
      icon: 'pi pi-users',
      routerLink: '/new-user',
      routerLinkActiveOptions: { exact: true },
      visible: this.#userRoles.hasAnyRole([
        '8x-owner',
        '8x-admin-assistant',
        'customer-owner',
      ]),
    },
    {
      label: this.#translate.instant(_('New Customer')),
      icon: 'pi pi-users',
      routerLink: '/new-customer',
      routerLinkActiveOptions: { exact: true },
      visible: this.#userRoles.hasAnyRole(['8x-owner', '8x-sales-team-leader']),
    },
    {
      label: this.#translate.instant(_('New Invoice')),
      icon: 'pi pi-receipt',
      routerLink: '/new-invoice',
      routerLinkActiveOptions: { exact: true },
      visible: this.#userRoles.hasAnyRole([
        '8x-owner',
        '8x-admin-assistant',
        '8x-cs-manager',
        '8x-cs-team-leader',
        '8x-customer-success',
        '8x-renewals-manager',
        '8x-accountant',
      ]),
    },
    {
      label: this.#translate.instant(_('New Subscription')),
      icon: 'fa-solid fa-play',
      routerLink: '/new-subscription',
      routerLinkActiveOptions: { exact: true },
      visible: this.#userRoles.hasAnyRole([
        '8x-owner',
        '8x-admin-assistant',
        '8x-cs-manager',
        '8x-cs-team-leader',
        '8x-renewals-manager',
      ]),
    },
    {
      label: this.#translate.instant(_('New Service')),
      icon: 'pi pi-server',
      routerLink: '/new-service',
      routerLinkActiveOptions: { exact: true },
      visible: this.#userRoles.hasAnyRole([
        '8x-owner',
        '8x-admin-assistant',
        '8x-cs-manager',
      ]),
    },
    {
      label: this.#translate.instant(_('New Package')),
      icon: 'pi pi-box',
      routerLink: '/new-package',
      routerLinkActiveOptions: { exact: true },
      visible: this.#userRoles.hasAnyRole([
        '8x-owner',
        '8x-admin-assistant',
        '8x-cs-manager',
      ]),
    },
  ]);

  faqDrawer() {
    this.visibleFaq.set(true);
    document.documentElement.style.setProperty('--sidebar-faq-width', '28rem');
  }

  userItems = signal<MenuItem[]>([
    // {
    //   label: this.#translate.instant(_('Update Profile')),
    //   command: () => {
    //     this.#router.navigate(['/update-customer'], {
    //       queryParams: { filtersQuery: JSON.stringify(this.currentUser()) },
    //     });
    //   },
    // },
    {
      label: this.#translate.instant(_('Logout')),
      command: () => {
        this.#confirmService.confirmDelete({
          message: this.#translate.instant(_('please confirm to proceed')),
          acceptCallback: () =>
            this.#authService
              .logout()
              .pipe(takeUntilDestroyed(this.#destroyRef))
              .subscribe(() => {
                this.#router.navigate(['/auth/login']);
              }),
        });
      },
    },
  ]);
}
