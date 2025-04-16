import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { EMPTY, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaqFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('faqs', { type: 'faq' });
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'question',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Question'),
          },
        },
        {
          key: 'answer',
          type: 'textarea-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Answer'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'category',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Category'),
            options: this.pageList$.pipe(map(({ categories }) => categories)),
          },
        },
        {
          key: 'is_active',
          type: 'checkbox-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Is Active'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'created_at',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Created At'),
            disabled: true, // Assuming this is auto-populated
          },
        },
        {
          key: 'updated_at',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Updated At'),
            disabled: true, // Assuming this is auto-populated
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

  configureFieldsFaqPassword() {
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
