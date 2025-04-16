import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { EMPTY, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('locations', { type: 'location' }); // Updated type
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
            label: _('Phone Number'), // Updated label
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
          key: 'timezone',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Timezone'),
            options: this.pageList$.pipe(map(({ timezones }) => timezones)),
          },
        },
        {
          key: 'role_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Role'),
            options: this.pageList$.pipe(map(({ roles }) => roles)),
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

  configureFieldsLocationPassword() {
    // Updated method name
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
                      label: _('password'),
                      placeholder: _('password'),
                      toggleMask: true,
                    },
                  },
                  {
                    key: 'password_confirmation',
                    type: 'password-field',
                    className: 'md:col-4 col-12',
                    props: {
                      label: _('password confirmation'),
                      placeholder: _('password confirmation'),
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
