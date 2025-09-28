import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('category');
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
          hooks: {
            onInit: (field) => {
              return field.formControl?.valueChanges.pipe(
                tap((value) => {
                  field.form?.get('slug')?.setValue(value?.toLowerCase().replace(/ /g, '-'));
                }),
              );
            },
          },
        },
        {
          key: 'categoryType',
          type: 'select-field',
          className: 'md:col-4 col-12',
          hide: editData.showCategoryType,
          props: {
            isFloatedLabel: true,
            label: _('select post type'),
            options: this.pageList$.pipe(
              map(({ categoryType }) => categoryType),
            ),
          },
        },
        {
          key: 'slug',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Slug'),
          },
          hooks: {
            onInit: (field) => {
              return field.formControl?.valueChanges.pipe(
                tap((value) => {
                  field.formControl?.setValue(value?.toLowerCase().replace(/ /g, '-'), { emitEvent: false });
                  
                }),
              );
            },
          },
        },
        {
          key: 'description',
          type: 'textarea-field',
          className: 'col-12',
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
            label: _('icon Image'),
            isUploading: this.isUploading,
            accept: '.svg',
            description: _('Allowed format is svg'),
            mode: editData ? 'update' : 'store',
          },
        },
      ]),
    ];
  }
}
