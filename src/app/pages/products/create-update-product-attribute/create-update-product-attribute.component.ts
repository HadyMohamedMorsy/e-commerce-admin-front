import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { ProductAttributeFieldsService } from '../services/product-attribute-fields.service';
import { ProductAttributeModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-product-attribute',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [ProductAttributeFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateProductAttributeComponent extends FormPageComponent {
  fieldsService = inject(ProductAttributeFieldsService);
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
      ? new ProductAttributeModel(
          this.filterDataForUpdate(new ProductAttributeModel()),
        )
      : new ProductAttributeModel({
          productId: this.#queryData.productId,
          attributes: [
            {
              id: null,
              name: null,
              value: null,
              image: null,
              images: null,
              quantity: null,
              priceChange: null,
            },
          ],
        } as ProductAttributeModel);

    this.formTitle.set(
      isUpdate ? 'Update Product Attribute' : 'Create New Product Attribute',
    );
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'attribute/update' : 'attribute/store');
  }
}
