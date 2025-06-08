import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService, StaticDataService } from '@shared';
import { map, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductAttributeFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('product-attributes');
  isSingleUploading = signal(false);
  isMultiUploading = signal(false);
  #staticDataService = inject(StaticDataService);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'attributes',
          type: 'repeat-field',
          className: 'col-12',
          props: {
            addBtnText: _('add attribute'),
            disabledRepeater: false,
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              return field.formControl?.valueChanges.pipe(
                startWith(field.model),
                tap((langs) => {
                  if (!field.props) return;
                  if (
                    langs.length === this.#staticDataService.languages.length
                  ) {
                    return (field.props.disabledRepeater = true);
                  } else {
                    return (field.props.disabledRepeater = false);
                  }
                }),
              );
            },
          },
          fieldArray: this.fieldBuilder.fieldBuilder([
            {
              key: 'name',
              type: 'select-field',
              className: 'md:col-4 col-12',
              props: {
                required: true,
                label: _('Name'),
                options: this.pageList$.pipe(map(({ nameTypes }) => nameTypes)),
              },
            },
            {
              key: 'value',
              type: 'input-field',
              className: 'md:col-4 col-12',
              props: {
                required: true,
                label: _('Attribute Value'),
              },
            },
            {
              key: 'priceChange',
              type: 'input-field',
              className: 'md:col-4 col-12',
              props: {
                required: true,
                type: 'number',
                label: _('Price'),
              },
            },
            {
              key: 'quantity',
              type: 'input-field',
              className: 'md:col-4 col-12',
              props: {
                required: true,
                type: 'number',
                label: _('Quantity'),
              },
            },
            {
              key: 'image',
              type: 'file-field',
              className: 'col-12',
              props: {
                label: _('Attribute Image'),
                mode: editData ? 'update' : 'store',
                isUploading: this.isSingleUploading,
              },
            },
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
        },
      ]),
    ];
  }
}
