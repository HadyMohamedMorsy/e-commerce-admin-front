import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { ProductSkuFieldsService } from '../services/product-sku-fields.service';
import { ProductSkuModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-product-sku',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [ProductSkuFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateProductSkuComponent extends FormPageComponent {
  fieldsService = inject(ProductSkuFieldsService);
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
      ? new ProductSkuModel(this.filterDataForUpdate(new ProductSkuModel()))
      : new ProductSkuModel({
          productId: this.#queryData.productId,
        } as ProductSkuModel);

    this.formTitle.set(
      isUpdate ? 'Update Product SKU' : 'Create New Product SKU',
    );
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'product-sku/update' : 'product-sku/store');
  }
}
