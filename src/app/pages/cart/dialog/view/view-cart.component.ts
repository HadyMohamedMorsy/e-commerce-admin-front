import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Cart } from '@pages/cart/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-cart', // updated selector
  imports: [ViewDialogComponent],
  templateUrl: './view-cart.component.html', // updated template file (make sure you rename it)
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCartComponent {
  isShowDialog = model(false);
  cart = input.required<Cart>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.cart()?.id,
      },
      {
        label: 'total',
        value: this.cart()?.total,
      },
    ];
  });
}
