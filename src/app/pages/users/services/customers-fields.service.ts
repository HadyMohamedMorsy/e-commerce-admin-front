import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { FieldTypeConfig } from '@ngx-formly/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { EMPTY, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('users', { type: 'customer' });
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'crm_id',
          type: 'autocomplete-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            label: _('CRM ID'),
            entity: 'crm-integration',
            transformFn: (data: any) => {
              const transofrmData = {
                label: data.original.data.id,
                id: data.original.data.id,
                ...data.original.data,
              };
              console.log(transofrmData);
              return [transofrmData];
            },
            sideEffectFn: (data: any, field: FieldTypeConfig) => {
              const dataCrm = data[0];
              const groupNames = field.parent?.parent?.fieldGroup?.[1];
              const groupPhone = field.parent?.parent?.fieldGroup?.[2];
              const groupNational = field.parent?.parent?.fieldGroup?.[3];
              const groupTitle = field.parent?.parent?.fieldGroup?.[4];

              groupNames
                ?.get?.('full_name')
                .formControl?.setValue(dataCrm.full_name);
              groupPhone
                ?.get?.('phone')
                .formControl?.setValue(dataCrm.phones[0].phone);
              groupNational
                ?.get?.('national_number')
                .formControl?.setValue(dataCrm.national_number);
              groupNational
                ?.get?.('passport_number')
                .formControl?.setValue(dataCrm.passport_number);
              groupTitle?.get?.('title').formControl?.setValue(dataCrm.title);
              groupTitle
                ?.get?.('company')
                .formControl?.setValue(dataCrm.company);
            },
          },
        },
        {
          key: 'parent',
          type: 'autocomplete-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Parent Customer'),
            fieldKey: 'parent_id',
            entity: 'users',
          },
        },
        {
          key: 'parent_id',
        },
        {
          key: 'is_owner',
          type: 'checkbox-field',
          props: {
            label: _('Is Owner'),
          },
        },
      ]),
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
          hooks: {
            onInit: (field) => {
              const firstNameControl =
                field?.parent?.get?.('first_name')?.formControl;
              const lastNameControl =
                field?.parent?.get?.('last_name')?.formControl;
              const fullNameControl = field?.formControl;

              if (!firstNameControl || !lastNameControl || !fullNameControl) {
                return EMPTY;
              }

              const firstLastChanges$ = merge(
                firstNameControl.valueChanges.pipe(
                  startWith(firstNameControl.value),
                ),
                lastNameControl.valueChanges.pipe(
                  startWith(lastNameControl.value),
                ),
              ).pipe(
                tap(() => {
                  const fullName = `${firstNameControl.value || ''} ${
                    lastNameControl.value || ''
                  }`.trim();
                  fullNameControl.setValue(fullName, { emitEvent: false });
                  field.model['full_name'] = fullName;
                }),
              );

              const fullNameChanges$ = fullNameControl.valueChanges.pipe(
                startWith(fullNameControl.value),
                tap((fullName) => {
                  const trimmedFull = fullName?.trim();
                  let parts = trimmedFull?.split(/\s+/);
                  if (parts && parts.length) {
                    const [firstName, ...lastNames] = parts;
                    const lastName = lastNames.join(' ');

                    if (firstNameControl.value !== firstName) {
                      firstNameControl.setValue(firstName, {
                        emitEvent: false,
                      });
                      field.model['first_name'] = firstName;
                    }
                    if (lastNameControl.value !== lastName) {
                      lastNameControl.setValue(lastName, { emitEvent: false });
                      field.model['last_name'] = lastName;
                    }
                  }
                }),
              );

              return merge(firstLastChanges$, fullNameChanges$);
            },
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
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
          key: 'start_validation_process',
          type: 'checkbox-field',
          hide: editData,
          props: {
            label: _('Start Validation Process'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'identifier_type',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('identifier type'),
            options: this.pageList$.pipe(
              map(({ identifier_types }) => identifier_types),
            ),
          },
        },
        {
          key: 'national_number',
          type: 'input-field',
          className: 'md:col-4 col-12',
          resetOnHide: false,
          props: {
            type: 'number',
            label: _('National ID'),
          },
          expressions: {
            hide: ({ model }) => model?.identifier_type !== 'national_id',
          },
        },
        {
          key: 'passport_number',
          type: 'input-field',
          className: 'md:col-4 col-12',
          resetOnHide: false,
          props: {
            type: 'number',
            label: _('passport number'),
          },
          expressions: {
            hide: ({ model }) => model?.identifier_type !== 'passport_number',
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'title',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Title'),
          },
        },
        {
          key: 'company',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Company'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'timezone',
          type: 'select-field',
          props: {
            label: _('Timezone'),
            options: this.pageList$.pipe(map(({ timezones }) => timezones)),
          },
        },
        {
          key: 'role_id',
          type: 'select-field',
          props: {
            required: true,
            label: _('Role'),
            options: this.pageList$.pipe(map(({ roles }) => roles)),
          },
        },
        {
          key: 'is_suspended',
          type: 'checkbox-field',
          props: {
            label: _('Is Suspended'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
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
