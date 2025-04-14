import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { EMPTY, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('orders', { type: 'order' }); // Change to orders
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'order_number',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Order Number'),
          },
        },
        {
          key: 'customer_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Customer Name'),
          },
        },
        {
          key: 'status',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Order Status'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'order_date',
          type: 'date-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Order Date'),
          },
        },
        {
          key: 'shipping_address',
          type: 'textarea-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Shipping Address'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'shipping_method',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Shipping Method'),
            options: this.pageList$.pipe(
              map(({ shipping_methods }) => shipping_methods),
            ),
          },
        },
        {
          key: 'payment_method',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Payment Method'),
            options: this.pageList$.pipe(
              map(({ payment_methods }) => payment_methods),
            ),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'order_notes',
          type: 'textarea-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Order Notes'),
            placeholder: _('Additional notes for the order'),
          },
        },
      ]),

      // Handle file upload if needed (e.g., for invoices or receipts)
      this.fieldBuilder.fieldBuilder([
        {
          key: 'invoice',
          type: 'file-field',
          props: {
            label: _('Invoice'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }

  configureFieldsOrderStatus() {
    return [
      {
        fieldGroup: [
          this.fieldBuilder.fieldBuilder([
            {
              validators: {
                validation: [
                  {
                    name: 'fieldMatch',
                    options: { errorPath: 'status_confirmation' },
                  },
                ],
              },
              fieldGroup: [
                this.fieldBuilder.fieldBuilder([
                  {
                    key: 'status',
                    type: 'input-field',
                    className: 'md:col-4 col-12',
                    props: {
                      label: _('Status'),
                      placeholder: _('Order Status'),
                    },
                  },
                  {
                    key: 'status_confirmation',
                    type: 'input-field',
                    className: 'md:col-4 col-12',
                    props: {
                      label: _('Status Confirmation'),
                      placeholder: _('Confirm Order Status'),
                    },
                  },
                ]),
              ],
            },
          ]),
        ],
      },
    ];
  }
}
