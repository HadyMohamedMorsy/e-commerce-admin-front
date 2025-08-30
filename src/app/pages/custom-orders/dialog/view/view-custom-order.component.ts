import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomOrder } from '@pages/custom-orders/services/services-type';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-custom-order',
  templateUrl: './view-custom-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, TranslateModule, ViewDialogComponent],
})
export default class ViewCustomOrderComponent {
  isShowDialog = model(false);
  customOrder = input.required<CustomOrder>();
  #dateFormatter = new DateFormatterPipe();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.customOrder()?.id,
      },
      {
        label: 'Total Price',
        value: this.customOrder()?.totalPrice
          ? `$${this.customOrder()?.totalPrice}`
          : '',
      },
      {
        label: 'Status',
        value: this.customOrder()?.status,
      },
      {
        label: 'Customer',
        value: this.customOrder()?.createdBy
          ? `${this.customOrder()?.createdBy.firstName} ${this.customOrder()
              ?.createdBy.lastName}`
          : '',
      },
      {
        label: 'Payment Method',
        value: this.customOrder()?.paymentMethod?.name || '',
      },
      {
        label: 'Books Count',
        value: this.customOrder()?.books ? this.customOrder()?.books.length : 0,
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.customOrder()?.createdAt,
          'relative',
        ),
      },
    ];
  });
}
