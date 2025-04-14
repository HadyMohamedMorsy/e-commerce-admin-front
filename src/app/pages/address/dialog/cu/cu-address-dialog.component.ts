import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { AddressesFieldsService } from '@pages/users/services/addresses-fields.service';
import { UserFieldsService } from '@pages/users/services/users-fields.service';
import { AuthService, BaseCreateUpdateComponent, User } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { AddressModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-address-dialog',
  imports: [FormDialogComponent],
  providers: [AddressesFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuAddressDialogComponent extends BaseCreateUpdateComponent<AddressModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(AddressesFieldsService);
  #list$ = this.#globalList.getGlobalList('addresses');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'auth/users/address',
        update: 'auth/users/address/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Address')),
        submitButtonLabel: this.translate.instant(_('Update Address')),
      };
      this.model = new AddressModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Address')),
        submitButtonLabel: this.translate.instant(_('Create New Address')),
      };
      this.model = new AddressModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }

  override updateUi(model: AddressModel) {
    const isCurrentUser = this.#auth.currentUser()?.id === model.id;
    if (isCurrentUser) {
      const updateModel = { ...this.#auth.currentUser(), ...model } as User;
      this.#auth.setCurrentUser(updateModel);
    }
  }
}
