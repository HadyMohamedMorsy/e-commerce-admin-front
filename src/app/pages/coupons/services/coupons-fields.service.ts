import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('coupons');
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
          key: 'description',
          type: 'textarea-field',
          className: 'md:col-8 col-12',
          props: {
            label: _('Description'),
            rows: 3,
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'discount_type',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Discount Type'),
            options: this.pageList$.pipe(
              map(({ discountTypes }) => discountTypes),
            ),
          },
        },
        {
          key: 'discount_value',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('Discount Value'),
          },
        },
        {
          key: 'is_active',
          type: 'checkbox-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Is Active'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'start_date',
          type: 'calendar-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Start Date'),
            showTime: true,
          },
        },
        {
          key: 'end_date',
          type: 'calendar-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('End Date'),
            showTime: true,
          },
        },
      ]),
    ];
  }
}
