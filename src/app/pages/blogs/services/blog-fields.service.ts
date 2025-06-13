import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('blog');
  isSingleUploading = signal(false);
  isMultiUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'title',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Title'),
          },
        },
        {
          key: 'subTitle',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('sub title'),
          },
        },
        {
          key: 'slug',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('slug'),
          },
        },
        {
          key: 'order',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            required: true,
            label: _('order sort'),
          },
        },
        {
          key: 'isPublished',
          type: 'switch-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('isPublished'),
          },
        },
        {
          key: 'isFeatured',
          type: 'switch-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('isFeatured'),
          },
        },
        {
          key: 'startDate',
          type: 'date-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('start Date'),
          },
        },
        {
          key: 'endDate',
          type: 'date-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('end Date'),
          },
        },
        {
          key: 'categoryIds',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            multiple: true,
            label: _('Select category'),
            options: this.pageList$.pipe(map(({ category }) => category)),
          },
        },
        {
          key: 'postType',
          type: 'select-field',
          className: 'col-12 md:col-6',
          props: {
            isFloatedLabel: true,
            label: _('select post type'),
            options: this.pageList$.pipe(map(({ articleType }) => articleType)),
          },
        },
        {
          key: 'mediaType',
          type: 'select-field',
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('postType');
              return postType?.value !== 'video';
            },
          },
          props: {
            required: true,
            label: _('select media type'),
            options: this.pageList$.pipe(map(({ mediaType }) => mediaType)),
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              return field.formControl?.valueChanges.pipe(
                tap(() => {
                  field.form?.get('video')?.setValue(null);
                }),
              );
            },
          },
        },
        {
          key: 'mediaData',
          type: 'input-field',
          expressions: {
            hide: (field) => field.form?.get('media_type')?.value !== 'iframe',
          },
          props: {
            required: true,
            label: _('article iframe'),
          },
        },
        {
          key: 'mediaData',
          type: 'input-field',
          expressions: {
            hide: (field) => field.form?.get('media_type')?.value !== 'url',
          },
          props: {
            required: true,
            label: _('article url'),
          },
        },
        {
          key: 'description',
          type: 'textarea-field',
          className: 'md:col-12 col-12',
          props: {
            label: _('Description'),
            rows: 3,
            autoResize: true,
          },
        },
        {
          key: 'shortDescription',
          type: 'textarea-field',
          className: 'md:col-12 col-12',
          props: {
            label: _('short description'),
            rows: 3,
            autoResize: true,
          },
        },
        {
          key: 'metaTitle',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('metaTitle'),
          },
        },
        {
          key: 'metaDescription',
          type: 'textarea-field',
          className: 'md:col-12 col-12',
          props: {
            label: _('metaDescription'),
            rows: 3,
            autoResize: true,
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'featuredImages',
          type: 'multi-files-field',
          resetOnHide: false,
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('postType');
              return postType?.value !== 'gallery';
            },
          },
          props: {
            multiple: true,
            required: true,
            type: 'image',
            isUploading: this.isMultiUploading,
            chooseLabel: _('gallery'),
            description: _('Allowed format is jpeg, jpg, png'),
            fileLabel: _('gallery'),
            mode: !editData ? 'create' : 'update',
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'thumb',
          type: 'file-field',
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('postType');
              return postType?.value !== 'gallery';
            },
          },
          props: {
            multiple: true,
            required: true,
            type: 'image',
            isUploading: this.isSingleUploading,
            chooseLabel: _('thumb'),
            description: _('Allowed format is jpeg, jpg, png'),
            fileLabel: _('thumb'),
            mode: !editData ? 'create' : 'update',
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'video',
          type: 'file-field',
          props: {
            chooseLabel: _('upload Video'),
            accept: 'video/*',
            type: 'video',
            isUploading: this.isSingleUploading,
            description: _('Allowed format is mp3, mp4'),
            fileLabel: _('Video'),
            mode: !editData ? 'create' : 'update',
          },
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('postType');
              return postType?.value !== 'video';
            },
          },
        },
      ]),
    ];
  }
}
