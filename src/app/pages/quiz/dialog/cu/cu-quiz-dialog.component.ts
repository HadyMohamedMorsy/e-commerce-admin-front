import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { QuizFieldsService } from '../../services/quiz-fields.service';
import { QuizModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-quiz-dialog',
  imports: [FormDialogComponent],
  providers: [QuizFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CuQuizDialogComponent extends BaseCreateUpdateComponent<QuizModel> {
  private quizFieldsService = inject(QuizFieldsService);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode ? _('Create New Quiz') : _('Update Quiz');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: of(1),
      endpoints: {
        store: 'quiz/store',
        update: 'quiz/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new QuizModel(this.editData);
    this.fields = this.quizFieldsService.configureFields(this.editData);
  }
}
