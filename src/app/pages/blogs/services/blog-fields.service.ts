import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { tap } from 'rxjs';

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
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Title'),
          },
        },
        {
          key: 'sub_title',
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
            label: _('Title'),
          },
        },
        {
          key: 'published_at',
          type: 'date-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('published at'),
          },
        },
        {
          key: `views`,
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            required: true,
            label: _('views'),
          },
        },
        {
          key: 'category_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Select category'),
            placeholder: _('Select category'),
            options: [],
          },
        },
        {
          key: 'post_type',
          type: 'select-field',
          className: 'col-12 md:col-6',
          props: {
            isFloatedLabel: true,
            label: _('select post type'),
            placeholder: _('select post type'),
            options: [
              {
                label: this.translate.instant(_('article')),
                value: 'article',
              },
              {
                label: this.translate.instant(_('video')),
                value: 'video',
              },
              {
                label: this.translate.instant(_('gallery')),
                value: 'gallery',
              },
            ],
          },
        },
        {
          key: 'media_type',
          type: 'select-field',
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('post_type');
              return postType?.value !== 'article';
            },
          },
          props: {
            required: true,
            label: _('select article type'),
            placeholder: _('select article type'),
            options: [
              {
                label: _('url'),
                value: 'url',
              },
              {
                label: _('iframe'),
                value: 'iframe',
              },
            ],
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              return field.formControl?.valueChanges.pipe(
                tap(() => {
                  field.form?.get('media_data')?.setValue(null);
                }),
              );
            },
          },
        },
        {
          key: 'media_data',
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
          key: 'media_data',
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
          key: 'short_description',
          type: 'textarea-field',
          className: 'md:col-12 col-12',
          props: {
            label: _('short description'),
            rows: 3,
            autoResize: true,
          },
        },
        {
          key: 'meta_title',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Title'),
          },
        },
        {
          key: 'meta_description',
          type: 'textarea-field',
          className: 'md:col-12 col-12',
          props: {
            label: _('Description'),
            rows: 3,
            autoResize: true,
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'featured_images',
          type: 'file-field',
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('post_type');
              return postType?.value !== 'gallery';
            },
          },
          props: {
            multiple: true,
            required: true,
            type: 'image',
            chooseLabel: _('gallery'),
            description: _('Allowed format is jpeg, jpg, png'),
            fileLabel: _('gallery'),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'thumb',
          type: 'file-field',
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('post_type');
              return postType?.value !== 'gallery';
            },
          },
          props: {
            multiple: true,
            required: true,
            type: 'image',
            chooseLabel: _('thumb'),
            description: _('Allowed format is jpeg, jpg, png'),
            fileLabel: _('thumb'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'media_data',
          type: 'file-field',
          props: {
            chooseLabel: _('upload Video'),
            accept: 'video/*',
            type: 'video',
            description: _('Allowed format is mp3, mp4'),
            fileLabel: _('Video'),
          },
          expressions: {
            hide: (field) => {
              const postType = field.parent?.form?.get?.('post_type');
              return postType?.value !== 'video';
            },
          },
        },
      ]),
    ];
  }
}
