import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('product');
  isSingleUploading = signal(false);
  isMultiUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Product Name'),
          },
        },
        {
          key: 'slug',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Product Slug'),
          },
        },
        {
          key: 'categoryIds',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            multiple: true,
            label: _('Product Category'),
            options: this.pageList$.pipe(map(({ category }) => category)),
          },
        },
        {
          key: 'description',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Product Description'),
          },
        },
        {
          key: 'metaTitle',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Product Meta Title'),
          },
        },
        {
          key: 'metaDescription',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Product Meta Description'),
          },
        },
        {
          key: 'summary',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Product summary'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'cover',
          type: 'file-field',
          props: {
            label: _('Product cover'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'images',
          type: 'multi-files-field',
          className: 'col-12',
          props: {
            multiple: true,
            type: 'image',
            isUploading: this.isMultiUploading,
            chooseLabel: _('images'),
            description: _('Allowed format is jpeg, jpg, png'),
            fileLabel: _('images'),
          },
        },
      ]),
    ];
  }
}
