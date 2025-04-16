import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { FaqFieldsService } from '@pages/faq/services/faq-fields.service';
import { AuthService, BaseCreateUpdateComponent, User } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { FaqModel } from '../../services/services-type';

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
  #auth = inject(AuthService);
  fieldsService = inject(FaqFieldsService);
  #list$ = this.#globalList.getGlobalList('faqs');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'faq/update',
        update: 'faq/store',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update FAQ')),
        submitButtonLabel: this.translate.instant(_('Update FAQ')),
      };
      this.model = new FaqModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New FAQ')),
        submitButtonLabel: this.translate.instant(_('Create New FAQ')),
      };
      this.model = new FaqModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
