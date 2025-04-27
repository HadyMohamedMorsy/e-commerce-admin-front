import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipmentFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('shipment');
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'type',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('type'),
            options: this.pageList$.pipe(map(({ weight }) => weight)),
          },
        },
        {
          key: 'kgPrice',
          type: 'input-field',
          className: 'md:col-4 col-12',
          expressions: {
            hide: ({ model }) => model.type === 'item',
          },
          props: {
            required: true,
            label: _('kg price'),
          },
        },
        {
          key: 'shipmentPrice',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('shipment Price'),
          },
        },
      ]),
    ];
  }
}
