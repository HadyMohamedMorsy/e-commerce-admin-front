import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { PaperTypeFieldsService } from '../../services/paper-types-fields.service';
import { PaperTypeModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-paper-type-dialog',
  imports: [FormDialogComponent],
  providers: [PaperTypeFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CuPaperTypeDialogComponent extends BaseCreateUpdateComponent<PaperTypeModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(PaperTypeFieldsService);
  #list$ = of([]);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Paper Type')
      : _('Update Paper Type');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'paper-type/store',
        update: 'paper-type/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new PaperTypeModel({
      ...this.editData,
    });
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
