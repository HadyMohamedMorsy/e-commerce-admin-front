import { inject, Injectable } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductSkuFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('product');

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'sku',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('SKU Code'),
          },
        },
        {
          key: 'price',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('Price'),
          },
        },
        {
          key: 'quantity',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            type: 'number',
            label: _('Quantity'),
          },
        },
        {
          key: 'discountType',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
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
            type: 'number',
            label: _('Discount'),
            min: 0,
            max: 100,
          },
        },
      ]),
    ];
  }
}
