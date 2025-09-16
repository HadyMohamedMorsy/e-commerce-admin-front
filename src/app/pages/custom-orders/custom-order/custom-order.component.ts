import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import ViewCustomOrderComponent from '../dialog/view/view-custom-order.component';
import { CustomOrder, OrderStatus } from '../services/services-type';

@Component({
  selector: 'app-custom-orders',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    ViewCustomOrderComponent,
    Dialog,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './custom-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomOrdersComponent extends BaseIndexComponent<CustomOrder> {
  status = viewChild.required<TemplateRef<any>>('status');

  statusOptions = [
    { label: 'Pending', value: OrderStatus.PENDING },
    { label: 'Confirmed', value: OrderStatus.CONFIRMED },
    { label: 'Processing', value: OrderStatus.PROCESSING },
    { label: 'Shipped', value: OrderStatus.SHIPPED },
    { label: 'Delivered', value: OrderStatus.DELIVERED },
    { label: 'Cancelled', value: OrderStatus.CANCELLED },
  ];

  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'custom-orders/index',
        delete: 'custom-orders/delete',
      },
      provideFields: ['images'],
      displayFilterButton: false,
      navigateCreatePage: 'new-custom-order',
      displayViewButton: true,
      indexTitle: this.#translate(_('Custom Orders')),
      indexIcon: 'pi pi-shopping-cart',
      createBtnLabel: this.#translate(_('Create Custom Order')),
      indexTableKey: 'CUSTOM_ORDERS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Total Price')),
          name: `totalPrice`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Status')),
          name: 'status',
          searchable: true,
          orderable: false,
          render: this.status(),
        },
        {
          title: this.#translate(_('Customer')),
          name: 'user.createdBy',
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };
    this.initRolesUser();
  }

  getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Pending';
      case OrderStatus.CONFIRMED:
        return 'Confirmed';
      case OrderStatus.PROCESSING:
        return 'Processing';
      case OrderStatus.SHIPPED:
        return 'Shipped';
      case OrderStatus.DELIVERED:
        return 'Delivered';
      case OrderStatus.CANCELLED:
        return 'Cancelled';
      default:
        return status;
    }
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
