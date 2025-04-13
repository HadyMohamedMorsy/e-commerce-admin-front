import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { CustomersFieldsService } from '@pages/users/services/customers-fields.service';
import { AuthService, BaseCreateUpdateComponent, User } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { CustomerModel, UserModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-customer-dialog',
  imports: [FormDialogComponent],
  providers: [CustomersFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuCustomerDialogComponent extends BaseCreateUpdateComponent<CustomerModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(CustomersFieldsService);
  #list$ = this.#globalList.getGlobalList('users');
  #auth = inject(AuthService);

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'auth/users/new-customer',
        update: 'auth/users/user/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Customer')),
        submitButtonLabel: this.translate.instant(_('Update Customer')),
      };
      this.model = new CustomerModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Customer')),
        submitButtonLabel: this.translate.instant(_('Create New Customer')),
      };
      this.model = new CustomerModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }

  override updateUi(model: UserModel) {
    const isCurrentUser = this.#auth.currentUser()?.id === model.id;
    if (isCurrentUser) {
      const updateModel = { ...this.#auth.currentUser(), ...model } as User;
      this.#auth.setCurrentUser(updateModel);
    }
  }
}
