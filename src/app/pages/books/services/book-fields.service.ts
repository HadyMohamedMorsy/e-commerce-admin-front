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
          type: 'number-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Price'),
            min: 0,
            step: 0.01,
          },
        },
        {
          key: 'description',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Description'),
            rows: 4,
          },
        },
        {
          key: 'svg',
          type: 'file-field',
          className: 'col-12',
          props: {
            required: true,
            isUploading: this.isSingleUploading,
            chooseLabel: _('SVG File'),
            fileLabel: _('SVG File'),
            mode: !editData ? 'create' : 'update',
            accept: '.svg',
            description: _('Allowed format is SVG only'),
          },
        },
      ]),
    ];
  }
}
