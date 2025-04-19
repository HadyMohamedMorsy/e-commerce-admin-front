import { inject, Injectable, signal } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaqFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of(1);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'select_questionable_type',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('select questionable type'),
            options: [],
          },
        },
        {
          key: 'question',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Question'),
          },
        },
        {
          key: 'answer',
          type: 'textarea-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Answer'),
          },
        },
      ]),
    ];
  }
}
