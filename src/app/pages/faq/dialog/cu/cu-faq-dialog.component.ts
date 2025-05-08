import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { FaqFieldsService } from '@pages/faq/services/faq-fields.service';
import { FaqModel } from '@pages/faq/services/services-type';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';

@Component({
  selector: 'app-cu-faq-dialog',
  imports: [FormDialogComponent],
  providers: [FaqFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuFaqDialogComponent extends BaseCreateUpdateComponent<FaqModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(FaqFieldsService);
  #list$ = this.#globalList.getGlobalList('faqs');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode ? _('Create New FAQ') : _('Update FAQ');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'faq/update',
        update: 'faq/store',
        dialogTitle,
        submitButtonLabel,
      },
    };

    this.model = new FaqModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
