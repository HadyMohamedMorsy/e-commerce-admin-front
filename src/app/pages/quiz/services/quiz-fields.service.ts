import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of([]);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
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
