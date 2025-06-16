import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { SpecificationModel } from '../services/services-type';
import { SpecificationFieldsService } from '../services/specification-fields.service';

@Component({
  selector: 'app-create-update-specification',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [SpecificationFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateSpecificationComponent extends FormPageComponent {
  fieldsService = inject(SpecificationFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('products');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new SpecificationModel(
          this.filterDataForUpdate(new SpecificationModel()),
        )
      : new SpecificationModel({
          productId: this.#queryData.productId,
          attributes: [
            {
              name: null,
              value: null,
            },
          ],
        } as SpecificationModel);

    this.formTitle.set(
      isUpdate ? 'Update Specification' : 'Create New Specification',
    );
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(
      isUpdate ? 'specification/update' : 'specification/store',
    );
  }
}
