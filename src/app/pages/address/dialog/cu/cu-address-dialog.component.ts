import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { AddressFieldsService } from '@pages/address/services/address-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
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
  fieldsService = inject(AddressFieldsService);
  #list$ = this.#globalList.getGlobalList('addresses');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Address')
      : _('Update Address');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'address/update',
        update: 'address/store',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new AddressModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
