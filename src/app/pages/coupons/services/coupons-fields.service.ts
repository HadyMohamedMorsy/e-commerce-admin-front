import { inject, Injectable, signal } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of(1);
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
          key: 'discount_type',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Discount Type'),
            options: [],
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
          key: 'min_order_total_price',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('min order total price'),
          },
        },
        {
          key: 'min_order_item_count',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('min order item count'),
          },
        },
        {
          key: 'number_of_users',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('number_of_users'),
          },
        },
        {
          key: 'coupon_type',
          type: 'select-field',
          className: 'col-12 md:col-4',
          props: {
            isFloatedLabel: true,
            label: _('select coupon type'),
            placeholder: _('select coupon type'),
            options: [
              {
                label: this.translate.instant(_('per order')),
                value: 'per_order',
              },
              {
                label: this.translate.instant(_('per customer')),
                value: 'per_customer',
              },
              {
                label: this.translate.instant(_('first order')),
                value: 'first_order',
              },
            ],
          },
        },
      ]),
    ];
  }
}
