import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { ShapeCategoryModel } from '../services/services-type';
import { ShapeCategoryFieldsService } from '../services/shape-category-fields.service';

@Component({
  selector: 'app-create-update-shape-category',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [ShapeCategoryFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateShapeCategoryComponent extends FormPageComponent {
  fieldsService = inject(ShapeCategoryFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('shape-categories');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new ShapeCategoryModel(
          this.filterDataForUpdate(new ShapeCategoryModel()),
        )
      : new ShapeCategoryModel();

    this.formTitle.set(
      isUpdate ? 'Update Shape Category' : 'Create New Shape Category',
    );
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(
      isUpdate ? 'shape-categories/update' : 'shape-categories/store',
    );
  }
}
