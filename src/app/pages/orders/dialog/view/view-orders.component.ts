import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { OrderList } from '@pages/orders/services/services-type'; // Adjust the path and model
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-order',
  imports: [ViewDialogComponent],
  templateUrl: './view-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrderComponent {
  isShowDialog = model(false); // Controls the visibility of the dialog
  order = input.required<OrderList>(); // Input for order data, required type 'OrderList'

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#Order Number',
        value: this.order()?.order_number, // Order-specific field
      },
      {
        label: 'Customer Name',
        value: this.order()?.customer_name, // Replace with customer info
      },
      {
        label: 'Order Date',
        value: this.order()?.order_date, // Date when the order was placed
      },
      {
        label: 'Status',
        value: this.order()?.status, // Order status (e.g., Pending, Shipped, etc.)
      },
      {
        label: 'Total Amount',
        value: this.order()?.total_amount, // Total order amount
      },
      {
        label: 'Shipping Address',
        value: this.order()?.shipping_address, // Shipping address details
      },
      {
        label: 'Created At',
        value: this.order()?.created_at, // When the order was created
      },
      {
        label: 'Updated At',
        value: this.order()?.updated_at, // When the order was last updated
      },
    ];
  });
}
