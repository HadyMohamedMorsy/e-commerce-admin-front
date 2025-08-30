import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShapeFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('facialFeature');
  isUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'type',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('type'),
            options: this.pageList$.pipe(
              map(({ facialFeatureType }) => facialFeatureType),
            ),
          },
        },
        {
          key: 'shapeType',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('shpeType'),
            options: this.pageList$.pipe(map(({ shapeType }) => shapeType)),
          },
        },
      ]),
      this.fieldBuilder.fieldBuilder([
        {
          key: 'image',
          type: 'svg-textarea-field',
          className: 'md:col-12 col-12',
          props: {
            label: _('SVG Code'),
            rows: 10,
            description:
              'Enter SVG code here. The preview will show how the SVG will be rendered.',
          },
        },
      ]),
    ];
  }
}
