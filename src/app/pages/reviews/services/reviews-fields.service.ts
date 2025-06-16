import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of([]);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'rate',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            required: true,
            label: _('rate (0-5)'),
            max: 5,
            min: 1,
          },
        },
        {
          key: 'comment',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Comment'),
          },
        },
      ]),
    ];
  }
}
