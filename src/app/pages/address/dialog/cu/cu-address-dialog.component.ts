import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { AddressFieldsService } from '@pages/address/services/address-fields.service';
import { AuthService, BaseCreateUpdateComponent, User } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { AddressModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-address-dialog',
  imports: [FormDialogComponent],
  providers: [AddressFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuAddressDialogComponent extends BaseCreateUpdateComponent<AddressModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(AddressFieldsService);
  #list$ = this.#globalList.getGlobalList('addresses');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'address/update',
        update: 'address/store',
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
}
