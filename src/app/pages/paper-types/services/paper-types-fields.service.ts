import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaperTypeFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = of([]);
  isUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'paperName',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Paper Name'),
          },
        },
        {
          key: 'price',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('Price'),
            type: 'number',
          },
        },
      ]),
    ];
  }
}
