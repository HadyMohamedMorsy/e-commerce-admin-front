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
  product = input.required<Customer>();
  userRoles = inject(RoleService);

  items = computed<MenuItem[]>(() => [
    {
      label: _('New Attribute'),
      icon: 'pi pi-receipt',
      routerLink: '/new-product-attribute',
      queryParams: {
        filtersQuery: this.getFiltersQuery(),
      },
      visible: true,
    },
    {
      label: _('New Product Sku'),
      icon: 'pi pi-receipt',
      routerLink: '/new-product-sku',
      queryParams: {
        filtersQuery: this.getFiltersQuery(),
      },
      visible: true,
    },
    {
      label: _('New Faq'),
      icon: 'pi pi-receipt',
      routerLink: '/new-faq',
      queryParams: {
        filtersQuery: this.getFiltersQuery(),
      },
      visible: true,
    },
  ]);

  getFiltersQuery() {
    return JSON.stringify({
      productId: this.product()?.id,
      method: 'create',
    });
  }
}
