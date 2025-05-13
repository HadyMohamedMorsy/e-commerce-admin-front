import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { ShapeModel } from '../services/services-type';
import { ShapeFieldsService } from '../services/shape-fields.service';

@Component({
  selector: 'app-create-update-shape',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [ShapeFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateShapeComponent extends FormPageComponent {
  fieldsService = inject(ShapeFieldsService);
  #queryData = {} as { [key: string]: any };
  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('shapes');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new ShapeModel(this.filterDataForUpdate(new ShapeModel()))
      : new ShapeModel();

    this.formTitle.set(isUpdate ? 'Update Shape' : 'Create New Shape');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'shapes/update' : 'shapes/store');
  }
}
