import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { LocationFieldsService } from '@pages/locations/services/location-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
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
  #auth = inject(AuthService);
  fieldsService = inject(LocationFieldsService);
  #list$ = this.#globalList.getGlobalList('locations');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'location/store',
        update: 'location/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Location')),
        submitButtonLabel: this.translate.instant(_('Update Location')),
      };
      this.model = new LocationModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Location')),
        submitButtonLabel: this.translate.instant(_('Create New Location')),
      };
      this.model = new LocationModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
