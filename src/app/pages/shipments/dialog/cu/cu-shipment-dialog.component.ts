import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ShipmentFieldsService } from '@pages/shipments/services/shipment-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { ShipmentModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-shipment-dialog',
  imports: [FormDialogComponent],
  providers: [ShipmentFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuShipmentDialogComponent extends BaseCreateUpdateComponent<ShipmentModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(ShipmentFieldsService);
  #list$ = this.#globalList.getGlobalList('shipments');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Shipment')
      : _('Update Shipment');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'shipment/store',
        update: 'shipment/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new ShipmentModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
