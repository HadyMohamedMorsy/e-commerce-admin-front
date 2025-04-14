import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuOrderDialogComponent } from '../dialog/cu/cu-order-dialog.component'; // Update to orders
import { ViewOrderComponent } from '../dialog/view/view-order/view-order.component'; // Update to orders
import { FiltersOrdersComponent } from '../filters-orders/filters-orders.component'; // Update to orders
import { Order } from '../services/services-type'; // Update to Order model
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-orders',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersOrdersComponent, // Use FiltersOrdersComponent instead of FiltersCustomersComponent
    TooltipModule,
    TranslateModule,
    EllipsisActionComponent,
    ViewOrderComponent, // Update to orders
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersComponent extends BaseIndexComponent<Order> {
  orderNumber = ViewChild.required<TemplateRef<any>>('orderNumber'); // Update to orderNumber

  ngOnInit() {
    this.dialogComponent = CuOrderDialogComponent; // Use CuOrderDialogComponent instead of CuCustomerDialogComponent
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/orders/order', // Update to orders endpoint
        delete: 'auth/orders/order/delete', // Update to orders endpoint
      },
      navigateCreatePage: 'new-order', // Adjust the route for creating new orders
      displayViewButton: true,
      indexTitle: this.#translate(_('Orders')), // Update the title
      indexIcon: 'pi pi-shopping-cart', // Change the icon to something more order-related
      createBtnLabel: this.#translate(_('Create Order')), // Update button label
      indexTableKey: 'ORDERS_KEY',
      columns: [
        {
          title: this.#translate(_('#Order Number')), // Update column name
          name: `order_number`, // Change to order_number
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Customer Name')), // Update column name
          name: `customer_name`, // Change to customer_name
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Order Status')), // Update column name
          name: `status`, // Change to status
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Order Date')), // Update column name
          name: 'order_date', // Change to order_date
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')), // Update column name
          name: 'created_at',
          searchable: false,
          orderable: false,
        },
      ],
    };

    // Update filters to reflect order-related filters
    this.filtersData.update((filters) => ({
      ...filters,
      type: 'order', // Change to 'order'
    }));

    this.initRolesUser(); // You may need to adjust or remove this if roles aren't relevant for orders
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
