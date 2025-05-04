import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { TaxFieldsService } from '@pages/taxes/services/tax-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { TaxModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-tax-dialog',
  imports: [FormDialogComponent],
  providers: [TaxFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuTaxDialogComponent extends BaseCreateUpdateComponent<TaxModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(TaxFieldsService);
  #list$ = this.#globalList.getGlobalList('tax');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode ? _('Create New Tax') : _('Update Tax');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'tax/store',
        update: 'tax/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new TaxModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
