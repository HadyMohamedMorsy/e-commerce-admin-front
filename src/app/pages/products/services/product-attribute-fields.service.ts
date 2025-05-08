import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService, StaticDataService } from '@shared';
import { startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductAttributeFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('product');
  isSingleUploading = signal(false);
  #staticDataService = inject(StaticDataService);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'attributes',
          type: 'repeat-field',
          className: 'col-12',
          props: {
            addBtnText: _('add_translation'),
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
              type: 'input-field',
              className: 'md:col-4 col-12',
              props: {
                required: true,
                label: _('Attribute Name'),
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
              key: 'image',
              type: 'file-field',
              className: 'col-12',
              props: {
                label: _('Attribute Image'),
                mode: editData ? 'update' : 'store',
                isUploading: this.isSingleUploading,
              },
            },
          ]),
        },
      ]),
    ];
  }
}
