import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { LocationsInputsService } from '@gService/locations-inputs.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  #locationsInputs = inject(LocationsInputsService);
  pageList$ = of(1);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'bankName',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('bank name'),
          },
        },
        {
          key: 'accountName',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('account name'),
          },
        },
        {
          key: 'accountNumber',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            required: true,
            label: _('account name'),
          },
        },
        {
          key: 'branchName',
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
          key: 'swiftCode',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('swift code'),
          },
        },
        ...this.#locationsInputs.getLocationFields(),
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'featuredImage',
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
