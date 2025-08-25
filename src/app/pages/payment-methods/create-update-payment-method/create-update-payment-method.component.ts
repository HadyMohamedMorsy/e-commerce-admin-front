import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { PaymentMethodFieldsService } from '../services/payment-method-fields.service';
import { PaymentMethodModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-payment-method',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [PaymentMethodFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdatePaymentMethodComponent extends FormPageComponent {
  fieldsService = inject(PaymentMethodFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('payment-methods');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new PaymentMethodModel(
          this.filterDataForUpdate(new PaymentMethodModel()),
        )
      : new PaymentMethodModel({} as PaymentMethodModel);

    this.formTitle.set(
      isUpdate ? 'Update Payment Method' : 'Create New Payment Method',
    );
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(
      isUpdate ? 'payment-method/update' : 'payment-method/store',
    );
  }
}
