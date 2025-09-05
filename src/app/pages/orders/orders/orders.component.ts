import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ViewOrderComponent } from '../dialog/view/view-orders.component';
import { FiltersOrdersComponent } from '../filters-orders/filters-order.component';
import { Order } from '../services/services-type';

@Component({
  selector: 'app-orders',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    FiltersOrdersComponent,
    TooltipModule,
    TranslateModule,
    ViewOrderComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersComponent extends BaseIndexComponent<Order> {
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'order/index',
        delete: 'order/delete',
      },
      navigateCreatePage: 'new-order',
      displayViewButton: true,
      indexTitle: this.#translate(_('Orders')),
      indexIcon: 'pi pi-shopping-cart',
      createBtnLabel: this.#translate(_('Create Order')),
      indexTableKey: 'ORDERS_KEY',
      columns: [
        {
          title: this.#translate(_('#Order Number')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('payment')),
          name: `paymentStatus`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Order Status')),
          name: `status`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('status')),
          name: 'status',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('total')),
          name: 'total',
          searchable: false,
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

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
