import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { _ } from '@ngx-translate/core';
import { SpecificationFieldsService } from '@pages/products/services/specification-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { SpecificationModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-specification-dialog',
  imports: [FormDialogComponent],
  providers: [SpecificationFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuSpecificationDialogComponent extends BaseCreateUpdateComponent<SpecificationModel> {
  fieldsService = inject(SpecificationFieldsService);
  #list$ = of([]);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Specification')
      : _('Update Specification');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'specification/store',
        update: 'specification/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new SpecificationModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
