import { inject, Injectable, signal } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of(1);
  isUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Category Name'),
          },
        },
        {
          key: 'description',
          type: 'textarea-field',
          className: 'md:col-8 col-12',
          props: {
            label: _('Description'),
            rows: 3,
            autoResize: true,
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'image',
          type: 'file-field',
          props: {
            label: _('Category Image'),
            isUploading: this.isUploading,
            mode: editData ? 'update' : 'store',
          },
        },
      ]),
    ];
  }
}
