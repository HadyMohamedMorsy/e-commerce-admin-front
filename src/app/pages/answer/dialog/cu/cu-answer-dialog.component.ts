import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { AnswerFieldsService } from '../../services/answer-fields.service';
import { AnswerModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-answer-dialog',
  imports: [FormDialogComponent],
  providers: [AnswerFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CuAnswerDialogComponent extends BaseCreateUpdateComponent<AnswerModel> {
  private answerFieldsService = inject(AnswerFieldsService);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Answer')
      : _('Update Answer');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: of(1),
      endpoints: {
        store: 'answer/store',
        update: 'answer/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new AnswerModel(this.editData);
    this.fields = this.answerFieldsService.configureFields(this.editData);
  }
}
