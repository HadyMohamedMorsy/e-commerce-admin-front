import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService, FieldBuilderService } from '@shared';
import { catchError, filter, map, of, startWith, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShapeFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  #api = inject(ApiService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('facialFeature');
  isUploading = signal(false);

  // Method to call shapes/find-by-name endpoint
  findShapeByName(name: string) {
    if (!name) return of(null);

    return this.#api
      .request('post', 'shape-categories/find-by-name', { name })
      .pipe(
        map((response: any) => response.data),
        catchError(() => of(null)),
      );
  }

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'name',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('name'),
            options: this.pageList$.pipe(
              map(({ shapeCategoryType }) => shapeCategoryType),
            ),
          },
          hooks: {
            onInit: (field) => {
              return field.formControl?.valueChanges.pipe(
                startWith(editData?.name),
                filter((name) => name !== null),
                switchMap((name) => this.findShapeByName(name)),
                tap((shapeData) => {
                  if (shapeData && field.parent?.get) {
                    // Update type field
                    const typeField = field.parent.get('type');
                    typeField?.formControl?.setValue(shapeData.type);

                    // Update shapeType field
                    const shapeTypeField = field.parent.get('shapeType');
                    shapeTypeField.formControl?.setValue(shapeData.shapeType);

                    // Update part field
                    const partField = field.parent.get('part');
                    partField.formControl?.setValue(shapeData.part);
                  }
                }),
              );
            },
          },
        },
        {
          key: 'colorCode',
          type: 'input-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('color code'),
          },
        },
        {
          key: 'type',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('type'),
            disabled: true,
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
            disabled: true,
            options: this.pageList$.pipe(map(({ shapeType }) => shapeType)),
          },
        },
        {
          key: 'part',
          type: 'select-field',
          className: 'md:col-6 col-12',
          props: {
            required: true,
            label: _('part'),
            disabled: true,
            options: this.pageList$.pipe(
              map(({ shapePartType }) => shapePartType),
            ),
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
