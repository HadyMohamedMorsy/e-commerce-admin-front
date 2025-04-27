import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Coupon } from '@pages/coupons/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-coupon',
  imports: [ViewDialogComponent],
  templateUrl: './view-coupons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCouponComponent {
  isShowDialog = model(false);
  coupon = input.required<Coupon>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.coupon()?.id,
      },
      {
        label: 'Code',
        value: this.coupon()?.code,
      },
    ];
  });
}
