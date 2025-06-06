import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { AddressFieldsService } from '../services/address-fields.service';
import { AddressModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-address',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [AddressFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateAddressComponent extends FormPageComponent {
  fieldsService = inject(AddressFieldsService);

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('addresses');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new AddressModel(this.filterDataForUpdate(new AddressModel()))
      : new AddressModel();

    this.formTitle.set(isUpdate ? 'Update Address' : 'Create New Address');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'address/update' : 'address/store');
  }
}
