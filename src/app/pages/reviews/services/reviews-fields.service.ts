import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { EMPTY, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('reviews', { type: 'review' });
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'review_title',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Review Title'),
          },
        },
        {
          key: 'reviewer_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Reviewer Name'),
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
              const reviewerNameControl =
                field?.parent?.get?.('reviewer_name')?.formControl;
              const fullNameControl = field?.formControl;

              if (!reviewerNameControl || !fullNameControl) {
                return EMPTY;
              }

              const reviewerNameChanges$ =
                reviewerNameControl.valueChanges.pipe(
                  startWith(reviewerNameControl.value),
                  tap(() => {
                    const fullName = `${
                      reviewerNameControl.value || ''
                    }`.trim();
                    fullNameControl.setValue(fullName, { emitEvent: false });
                    field.model['full_name'] = fullName;
                  }),
                );

              const fullNameChanges$ = fullNameControl.valueChanges.pipe(
                startWith(fullNameControl.value),
                tap((fullName) => {
                  const trimmedFull = fullName?.trim();
                  if (reviewerNameControl.value !== trimmedFull) {
                    reviewerNameControl.setValue(trimmedFull, {
                      emitEvent: false,
                    });
                    field.model['reviewer_name'] = trimmedFull;
                  }
                }),
              );

              return merge(reviewerNameChanges$, fullNameChanges$);
            },
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'review_content',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Review Content'),
          },
        },
        {
          key: 'rating',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            label: _('Rating'),
            min: 1,
            max: 5,
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
          key: 'category',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Category'),
            options: this.pageList$.pipe(map(({ categories }) => categories)),
          },
        },
        {
          key: 'tags',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Tags'),
            options: this.pageList$.pipe(map(({ tags }) => tags)),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'review_image',
          type: 'file-field',
          props: {
            label: _('Review Image'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }

  configureFieldsReviewPassword() {
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
