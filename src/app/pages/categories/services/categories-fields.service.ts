import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('categories');
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
          key: 'type',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Category Type'),
            options: this.pageList$.pipe(map(({ types }) => types ?? [])),
          },
        },
        {
          key: 'parent_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Parent Category'),
            options: this.pageList$.pipe(
              map(({ parents }) => [
                { label: _('None'), value: '' },
                ...(parents ?? []),
              ]),
            ),
          },
        },
        {
          key: 'is_active',
          type: 'checkbox-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Active?'),
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
