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
      {
        label: 'Discount',
        value: this.coupon()?.discount,
      },
      {
        label: 'Expired At',
        value: this.coupon()?.expiredAt,
      },
      {
        label: 'Expiry Date',
        value: this.coupon()?.expiryDate,
      },
      {
        label: 'Min Order Total Price',
        value: this.coupon()?.minOrderTotalPrice,
      },
      {
        label: 'Min Order Item Count',
        value: this.coupon()?.minOrderItemCount,
      },
      {
        label: 'Number Of Users',
        value: this.coupon()?.numberOfUsers,
      },
      {
        label: 'Coupon Type',
        value: this.coupon()?.couponType,
      },
      {
        label: 'Discount Type',
        value: this.coupon()?.discountType,
      },
      {
        label: 'Created At',
        value: this.coupon()?.createdAt,
      },
      {
        label: 'Is Active',
        value: this.coupon()?.isActive,
      },
    ];
  });
}
