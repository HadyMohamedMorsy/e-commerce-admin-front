import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('quiz');
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'questionType',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Question Type'),
            options: this.pageList$.pipe(
              map(({ questionType }) => questionType),
            ),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'question',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Question'),
            rows: 4,
          },
        },
      ]),
    ];
  }
}
