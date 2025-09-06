import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('answer');
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
            options: this.pageList$.pipe(map(({ quiez }) => quiez)),
          },
        },
        {
          key: 'bookIds',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            multiple: true,
            label: _('Book'),
            options: this.pageList$.pipe(map(({ books }) => books)),
          },
        },
      ]),
    ];
  }
}
