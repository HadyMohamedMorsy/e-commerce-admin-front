import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ShipmentFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('shipments', { type: 'shipment' });
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'type',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('City'),
            options: [],
          },
        },
        {
          key: 'kg_price',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('kg price'),
          },
        },
        {
          key: 'shipment_price',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('kg price'),
          },
        },
        {
          key: 'location_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('location'),
            options: [],
          },
        },
      ]),
    ];
  }
}
