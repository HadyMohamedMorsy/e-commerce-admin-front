import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { OrderFieldsService } from '@pages/orders/services/order-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { OrderModel } from '../../services/services-type'; // Order-specific model

@Component({
  selector: 'app-cu-order-dialog',
  imports: [FormDialogComponent],
  providers: [OrderFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuOrderDialogComponent extends BaseCreateUpdateComponent<OrderModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(OrderFieldsService);
  #list$ = this.#globalList.getGlobalList('orders');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'auth/orders/order', // Adjusted to the order API endpoint
        update: 'auth/orders/order/update', // Adjusted to the order update endpoint
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Order')),
        submitButtonLabel: this.translate.instant(_('Update Order')),
      };
      this.model = new OrderModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Order')),
        submitButtonLabel: this.translate.instant(_('Create New Order')),
      };
      this.model = new OrderModel();
    }

    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
