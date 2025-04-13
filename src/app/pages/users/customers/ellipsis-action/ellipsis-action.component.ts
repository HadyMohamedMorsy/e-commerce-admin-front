import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { _ } from '@ngx-translate/core';
import { Customer } from '@pages/users/services/services-type';
import { RoleService } from '@shared';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-ellipsis-action',
  imports: [MenuModule, ButtonModule],
  templateUrl: './ellipsis-action.component.html',
  styleUrl: './ellipsis-action.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisActionComponent {
  user = input.required<Customer>();
  userRoles = inject(RoleService);

  items = computed<MenuItem[]>(() => [
    {
      label: _('New Invoice'),
      icon: 'pi pi-receipt',
      routerLink: '/new-invoice',
      queryParams: {
        filtersQuery: this.getFiltersQuery(),
      },
      visible: this.userRoles.hasAnyRole([
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
      label: _('New Subscription'),
      icon: 'fa-solid fa-play',
      routerLink: '/new-subscription',
      queryParams: {
        filtersQuery: this.getFiltersQuery(),
      },
      visible: this.userRoles.hasAnyRole([
        '8x-owner',
        '8x-admin-assistant',
        '8x-cs-manager',
        '8x-cs-team-leader',
        '8x-renewals-manager',
      ]),
    },
  ]);

  getFiltersQuery() {
    return JSON.stringify({
      customer_id: this.user()?.id,
      customer_name: this.user()?.full_name,
      method: 'create',
    });
  }
}
