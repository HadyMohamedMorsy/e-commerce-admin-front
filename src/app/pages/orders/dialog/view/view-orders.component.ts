import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Order } from '@pages/orders/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-order',
  imports: [ViewDialogComponent],
  templateUrl: './view-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrderComponent {
  isShowDialog = model(false); 
  order = input.required<Order>(); 

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.order()?.id,
      },
      {
        label: '#Total',
        value: this.order()?.total,
      },
    ];
  });
}
