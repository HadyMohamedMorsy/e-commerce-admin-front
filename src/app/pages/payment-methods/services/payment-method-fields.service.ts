import { inject, Injectable } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('payment-method');

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'name',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Name'),
          },
        },
        {
          key: 'slug',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Slug'),
          },
        },
        {
          key: 'icon',
          type: 'file-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Icon'),
            accept: 'image/*',
          },
        },
      ]),
    ];
  }
}
