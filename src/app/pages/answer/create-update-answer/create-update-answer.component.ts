import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { AnswerFieldsService } from '../services/answer-fields.service';
import { AnswerModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-answer',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [AnswerFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateAnswerComponent extends FormPageComponent {
  fieldsService = inject(AnswerFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('answer');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new AnswerModel(this.filterDataForUpdate(new AnswerModel()))
      : new AnswerModel({} as AnswerModel);

    this.formTitle.set(isUpdate ? 'Update Answer' : 'Create New Answer');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'answer/update' : 'answer/store');
  }
}
