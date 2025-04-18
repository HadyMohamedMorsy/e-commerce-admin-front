import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { EMPTY, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('banks');
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
            label: _('Bank Name'),
          },
        },
        {
          key: 'branch',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Branch'),
          },
        },
        {
          key: 'account_holder',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Account Holder'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'account_number',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Account Number'),
          },
        },
        {
          key: 'ifsc_code',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('IFSC Code'),
          },
        },
        {
          key: 'swift_code',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('SWIFT Code'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'country',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Country'),
            options: this.pageList$.pipe(map(({ countries }) => countries)),
          },
        },
        {
          key: 'phone_number',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Phone Number'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'bank_logo',
          type: 'file-field',
          props: {
            label: _('Bank Logo'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }

  configureFieldsBankPassword() {
    return [
      {
        fieldGroup: [
          this.fieldBuilder.fieldBuilder([
            {
              validators: {
                validation: [
                  {
                    name: 'fieldMatch',
                    options: { errorPath: 'password_confirmation' },
                  },
                ],
              },
              fieldGroup: [
                this.fieldBuilder.fieldBuilder([
                  {
                    key: 'password',
                    type: 'password-field',
                    className: 'md:col-4 col-12',
                    props: {
                      label: _('Password'),
                      placeholder: _('Password'),
                      toggleMask: true,
                    },
                  },
                  {
                    key: 'password_confirmation',
                    type: 'password-field',
                    className: 'md:col-4 col-12',
                    props: {
                      label: _('Password Confirmation'),
                      placeholder: _('Password Confirmation'),
                      toggleMask: true,
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
