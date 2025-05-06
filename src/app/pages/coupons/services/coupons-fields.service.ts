import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('coupon');
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'code',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Coupon Code'),
          },
        },
        {
          key: 'discountType',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Discount Type'),
            options: this.pageList$.pipe(
              map(({ discountType }) => discountType),
            ),
          },
        },
        {
          key: 'discount',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('Discount'),
          },
        },
        {
          key: 'minOrderTotalPrice',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('min order total price'),
          },
        },
        {
          key: 'minOrderItemCount',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('min order item count'),
          },
        },
        {
          key: 'numberOfUsers',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            label: _('number_of_users'),
          },
        },
        {
          key: 'couponType',
          type: 'select-field',
          className: 'col-12 md:col-4',
          props: {
            isFloatedLabel: true,
            label: _('select coupon type'),
            options: this.pageList$.pipe(map(({ couponType }) => couponType)),
          },
        },
      ]),
    ];
  }
}
