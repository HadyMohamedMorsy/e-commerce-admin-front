import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of([]);
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'title',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Title'),
          },
        },
        {
          key: 'price',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Price'),
            min: 0,
            step: 0.01,
          },
        },
        {
          key: 'type',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Type'),
            options: ['cover', 'page'],
          },
        },
        {
          key: 'svg',
          type: 'svg-validation-textarea-field',
          className: 'md:col-12 col-12',
          props: {
            label: _('SVG Code'),
            rows: 10,
            description:
              'Enter SVG code here. The preview will show how the SVG will be rendered. The component will validate SVG layers and elements against available shape categories.',
          },
        },
      ]),
    ];
  }
}
