import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { ShipmentModel } from '../services/services-type';
import { ShipmentFieldsService } from '../services/shipment-fields.service';

@Component({
  selector: 'app-create-update-shipment',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [ShipmentFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateShipmentComponent extends FormPageComponent {
  fieldsService = inject(ShipmentFieldsService);
  #queryData = {} as { [key: string]: any };
  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('shipments');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new ShipmentModel(this.filterDataForUpdate(new ShipmentModel()))
      : new ShipmentModel({
          locationId: this.#queryData.locationId,
        } as ShipmentModel);

    this.formTitle.set(isUpdate ? 'Update Shipment' : 'Create New Shipment');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'shipment/update' : 'shipment/store');
  }
}
