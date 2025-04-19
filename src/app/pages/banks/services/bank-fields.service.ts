import { inject, Injectable, signal } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of(1);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'bank_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('bank name'),
          },
        },
        {
          key: 'account_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('account name'),
          },
        },
        {
          key: 'account_number',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            required: true,
            label: _('account name'),
          },
        },
        {
          key: 'branch_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('branch name'),
          },
        },
        {
          key: 'iban',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('iban'),
          },
        },
        {
          key: 'swift_code',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('swift_code'),
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
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'featured_image',
          type: 'file-field',
          props: {
            label: _('Featured Image'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }
}
