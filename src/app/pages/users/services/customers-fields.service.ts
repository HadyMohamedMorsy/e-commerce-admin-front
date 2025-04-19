import { inject, Injectable, signal } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersFieldsService {
  translate = inject(TranslateService);

  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of(1);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'first_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('First Name'),
          },
        },
        {
          key: 'last_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Last Name'),
          },
        },
        {
          key: 'full_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Full Name'),
          },
        },
        {
          key: 'email',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Email Address'),
          },
          validators: {
            validation: ['email'],
          },
        },
        {
          key: 'phone',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            label: _('Phoe Number'),
          },
        },
        {
          key: 'role_id',
          type: 'select-field',
          props: {
            required: true,
            label: _('Role'),
            options: [],
          },
        },
        {
          key: 'avatar',
          type: 'file-field',
          props: {
            label: _('Avatar'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }
}
