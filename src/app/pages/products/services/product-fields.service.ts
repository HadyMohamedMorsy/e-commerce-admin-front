import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('products');
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Product Name'),
          },
        },
        {
          key: 'description',
          type: 'textarea-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Product Description'),
          },
        },
        {
          key: 'category',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Product Category'),
            options: this.pageList$.pipe(map(({ categories }) => categories)),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'price',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Price'),
            type: 'number',
          },
        },
        {
          key: 'quantity',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Quantity'),
            type: 'number',
          },
        },
        {
          key: 'sku',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('SKU (Stock Keeping Unit)'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'status',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Product Status'),
            options: [
              { label: _('Active'), value: 'active' },
              { label: _('Inactive'), value: 'inactive' },
            ],
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'image',
          type: 'file-field',
          props: {
            label: _('Product Image'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }

  configureFieldsProductDetails() {
    return [
      {
        fieldGroup: [
          this.fieldBuilder.fieldBuilder([
            {
              key: 'product_details',
              type: 'textarea-field',
              className: 'md:col-12 col-12',
              props: {
                label: _('Product Details'),
                placeholder: _('Additional details about the product'),
              },
            },
          ]),
        ],
      },
    ];
  }
}
