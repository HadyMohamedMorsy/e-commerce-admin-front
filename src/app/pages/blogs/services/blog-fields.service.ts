import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('blogs');
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
          key: 'slug',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Slug'),
            description: _('This will be used in the URL'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'content',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            label: _('Content'),
            rows: 6,
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'category_id',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Category'),
            options: this.pageList$.pipe(map(({ categories }) => categories)),
          },
        },
        {
          key: 'status',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            label: _('Status'),
            options: [
              { label: _('Draft'), value: 'draft' },
              { label: _('Published'), value: 'published' },
            ],
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'thumbnail',
          type: 'file-field',
          props: {
            label: _('Thumbnail Image'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }
}
