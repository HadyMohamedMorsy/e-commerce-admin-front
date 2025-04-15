import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { CategoryFieldsService } from '../services/categories-fields.service';
import { CategoryModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-category',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [CategoryFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateCategoryComponent extends FormPageComponent {
  fieldsService = inject(CategoryFieldsService);

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('categories');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new CategoryModel(this.filterDataForUpdate(new CategoryModel()))
      : new CategoryModel();

    this.formTitle.set(isUpdate ? 'Update Category' : 'Create New Category');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'category/update' : 'category/store');
  }
}
