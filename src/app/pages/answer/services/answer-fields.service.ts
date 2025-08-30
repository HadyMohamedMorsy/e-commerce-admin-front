import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of([]);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'answerText',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Answer Text'),
            rows: 4,
          },
        },
        {
          key: 'questionId',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Question'),
            placeholder: _('Select Question'),
            options: [], // This will be populated with quiz questions
          },
        },
        {
          key: 'bookId',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Book'),
            placeholder: _('Select Book'),
            options: [], // This will be populated with books
          },
        },
      ]),
    ];
  }
}
