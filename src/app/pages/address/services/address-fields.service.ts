import { inject, Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of(1);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'title',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('title'),
          },
        },
        {
          key: 'addressLine1',
          type: 'textarea-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('addressLine 1'),
            rows: 3,
            autoResize: true,
          },
        },
        {
          key: 'addressLine2',
          type: 'textarea-field',
          className: 'md:col-6 col-12',
          props: {
            label: _('addressLine 2'),
            rows: 3,
            autoResize: true,
          },
        },
        {
          key: 'country_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('country'),
            options: [],
          },
        },
        {
          key: 'city_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('city'),
            options: [],
          },
        },
        {
          key: 'area_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('area'),
            options: [],
          },
        },
        {
          key: 'postalCode',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('postalCode'),
          },
        },
        {
          key: 'landmark',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('landmark'),
          },
        },
        {
          key: 'phoneNumber',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('phone Number'),
          },
        },
      ]),
    ];
  }
}
