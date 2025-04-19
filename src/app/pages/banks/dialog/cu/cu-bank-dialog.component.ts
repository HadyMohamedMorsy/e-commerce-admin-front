import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { _ } from '@ngx-translate/core';
import { BankFieldsService } from '@pages/banks/services/bank-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { BankModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-bank-dialog',
  imports: [FormDialogComponent],
  providers: [BankFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuBankDialogComponent extends BaseCreateUpdateComponent<BankModel> {
  fieldsService = inject(BankFieldsService);
  #list$ = of(1);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode ? _('Create New Bank') : _('Update Bank');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'bank/update',
        update: 'bank/store',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new BankModel();
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
