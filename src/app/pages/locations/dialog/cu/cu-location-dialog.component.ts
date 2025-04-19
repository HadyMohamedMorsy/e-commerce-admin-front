import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { LocationFieldsService } from '@pages/locations/services/location-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { LocationModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-location-dialog',
  imports: [FormDialogComponent],
  providers: [LocationFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuLocationDialogComponent extends BaseCreateUpdateComponent<LocationModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(LocationFieldsService);
  #list$ = of(1);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Location')
      : _('Update Location');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'location/store',
        update: 'location/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new LocationModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
