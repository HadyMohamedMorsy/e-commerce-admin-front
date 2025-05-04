import { inject, Injectable, signal } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { GlobalListService } from '@gService/global-list.service';
import { LocationsInputsService } from '@gService/locations-inputs.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class TaxFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('tax');
  isSingleUploading = signal(false);
  #locationInputs = inject(LocationsInputsService);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Name'),
          },
        },
        {
          key: 'rate',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Rate'),
            type: 'number',
          },
        },
        {
          key: 'locationId',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('country'),
            isFloatedLabel: true,
            filter: true,
            options: [],
            change(field, event) {
              event.originalEvent.stopPropagation();
            },
          },
          hooks: {
            onInit: (field) => {
              this.#locationInputs.getLocationsOptions(
                field,
                'location/select-options',
              );
            },
          },
        },
        {
          key: 'isActive',
          type: 'checkbox-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Active'),
          },
        },
      ]),
    ];
  }
}
