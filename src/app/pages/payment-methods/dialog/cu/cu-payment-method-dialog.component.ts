import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { PaymentMethodFieldsService } from '@pages/payment-methods/services/payment-method-fields.service';
import { PaymentMethodModel } from '@pages/payment-methods/services/services-type';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';

@Component({
  selector: 'app-cu-payment-method-dialog',
  imports: [FormDialogComponent],
  providers: [PaymentMethodFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuPaymentMethodDialogComponent extends BaseCreateUpdateComponent<PaymentMethodModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(PaymentMethodFieldsService);
  #list$ = this.#globalList.getGlobalList('payment-methods');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Payment Method')
      : _('Update Payment Method');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'payment-method/update',
        update: 'payment-method/store',
        dialogTitle,
        submitButtonLabel,
      },
    };

    this.model = new PaymentMethodModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
