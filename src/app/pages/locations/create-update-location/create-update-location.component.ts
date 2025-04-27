import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { LocationFieldsService } from '../services/location-fields.service';
import { LocationModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-location',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [LocationFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateLocationComponent extends FormPageComponent {
  fieldsService = inject(LocationFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('locations');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new LocationModel(this.filterDataForUpdate(new LocationModel()))
      : new LocationModel({
          parentId: this.#queryData.parentId,
        } as LocationModel);

    this.formTitle.set(isUpdate ? 'Update Location' : 'Create New Location');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'location/update' : 'location/store');
  }
}
