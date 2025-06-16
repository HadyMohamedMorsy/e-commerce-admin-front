import { inject, Injectable } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecificationFieldsService {
  translate = inject(TranslateService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of([]);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'title',
          type: 'input-field',
          className: 'col-12',
          props: {
            required: true,
            label: _('Specification Title'),
          },
        },
        {
          key: 'attributes',
          type: 'repeat-field',
          className: 'col-12',
          props: {
            addBtnText: _('add attribute'),
            disabledRepeater: false,
          },
          fieldArray: this.fieldBuilder.fieldBuilder([
            {
              key: 'name',
              type: 'input-field',
              className: 'md:col-6 col-12',
              props: {
                required: true,
                label: _('Name'),
              },
            },
            {
              key: 'value',
              type: 'input-field',
              className: 'md:col-6 col-12',
              props: {
                required: true,
                label: _('Value'),
              },
            },
          ]),
        },
      ]),
    ];
  }
}
