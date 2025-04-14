import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { OrdersFieldsService } from '../services/orders-fields.service';
import { OrderModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-order',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [OrdersFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateOrderComponent extends FormPageComponent {
  fieldsService = inject(OrdersFieldsService);

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('orders');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new OrderModel(this.filterDataForUpdate(new OrderModel()))
      : new OrderModel();

    this.formTitle.set(isUpdate ? 'Update Order' : 'Create New Order');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(
      isUpdate ? 'auth/orders/order/update' : 'auth/orders/new-order',
    );
  }
}
