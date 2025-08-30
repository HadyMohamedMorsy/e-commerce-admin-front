import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { QuizFieldsService } from '../services/quiz-fields.service';
import { QuizModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-quiz',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [QuizFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateQuizComponent extends FormPageComponent {
  fieldsService = inject(QuizFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('quiz');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new QuizModel(this.filterDataForUpdate(new QuizModel()))
      : new QuizModel({} as QuizModel);

    this.formTitle.set(isUpdate ? 'Update Quiz' : 'Create New Quiz');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'quiz/update' : 'quiz/store');
  }
}
