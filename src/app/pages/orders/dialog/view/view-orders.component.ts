import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Order } from '@pages/orders/services/services-type';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-order',
  imports: [ViewDialogComponent],
  templateUrl: './view-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrderComponent {
  isShowDialog = model(false);
  order = input.required<Order>();
  #dateFormatter = new DateFormatterPipe();
  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.order()?.id,
      },
      {
        label: 'Total',
        value: this.order()?.total,
      },
      {
        label: 'createdBy',
        value: this.order()?.createdBy,
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.order()?.createdAt,
          'relative',
        ),
      },
    ];
  });
}
