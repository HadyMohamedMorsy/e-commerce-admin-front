import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { BankFieldsService } from '@pages/bank/services/bank-fields.service';
import { AuthService, BaseCreateUpdateComponent, User } from '@shared';
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
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(BankFieldsService);
  #list$ = this.#globalList.getGlobalList('banks');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'bank/update',
        update: 'bank/store',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Bank')),
        submitButtonLabel: this.translate.instant(_('Update Bank')),
      };
      this.model = new BankModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Bank')),
        submitButtonLabel: this.translate.instant(_('Create New Bank')),
      };
      this.model = new BankModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
