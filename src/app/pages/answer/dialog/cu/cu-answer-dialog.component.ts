import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { AnswerFieldsService } from '../../services/answer-fields.service';
import { AnswerModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-ans-dialog',
  imports: [FormDialogComponent],
  providers: [AnswerFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CuAnDialogComponent extends BaseCreateUpdateComponent<AnswerModel> {
  #answerFieldsService = inject(AnswerFieldsService);
  #globalList = inject(GlobalListService);
  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Answer')
      : _('Update Answer');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#globalList.getGlobalList('answer'),
      endpoints: {
        store: 'answers/store',
        update: 'answers/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = {
      ...this.editData,
      questionId: this.editData.quiz.id,
      bookIds: this.editData.books.map((book: any) => book.id),
    };
    this.fields = this.#answerFieldsService.configureFields(this.editData);
  }
}
