import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { ProductsFieldsService } from '../services/products-fields.service'; // Product-specific service
import { ProductModel } from '../services/services-type'; // Product model

@Component({
  selector: 'app-create-update-product',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [ProductsFieldsService], // Use ProductsFieldsService
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateProductComponent extends FormPageComponent {
  fieldsService = inject(ProductsFieldsService); // Inject Product service

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery())); // Configure product-specific fields
    this.navigateAfterSubmit.set('products');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new ProductModel(this.filterDataForUpdate(new ProductModel())) // Use ProductModel for updates
      : new ProductModel();

    this.formTitle.set(isUpdate ? 'Update Product' : 'Create New Product');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(
      isUpdate ? 'auth/products/product/update' : 'auth/products/new-product', // Product-specific API endpoints
    );
  }
}
