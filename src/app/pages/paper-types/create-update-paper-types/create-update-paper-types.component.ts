import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { PaperTypeFieldsService } from '../services/paper-types-fields.service';
import { PaperTypeModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-paper-type',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [PaperTypeFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdatePaperTypeComponent extends FormPageComponent {
  fieldsService = inject(PaperTypeFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('paper-types');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new PaperTypeModel(this.filterDataForUpdate(new PaperTypeModel()))
      : new PaperTypeModel();

    const titleStore = 'Create New Paper Type';
    const titleUpdate = 'Update Paper Type';

    this.formTitle.set(isUpdate ? titleUpdate : titleStore);
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'paper-type/update' : 'paper-type/store');
  }
}
