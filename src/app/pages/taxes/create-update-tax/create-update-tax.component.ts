import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { TaxModel } from '../services/services-type';
import { TaxFieldsService } from '../services/tax-fields.service';

@Component({
  selector: 'app-create-update-tax',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [TaxFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateTaxComponent extends FormPageComponent {
  fieldsService = inject(TaxFieldsService);
  #queryData = {} as { [key: string]: any };
  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('taxes');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new TaxModel(this.filterDataForUpdate(new TaxModel()))
      : new TaxModel();

    this.formTitle.set(isUpdate ? 'Update Tax' : 'Create New Tax');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'tax/update' : 'tax/store');
  }
}
