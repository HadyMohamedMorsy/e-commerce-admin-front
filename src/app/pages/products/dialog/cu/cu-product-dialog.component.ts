import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ProductsFieldsService } from '@pages/products/services/products-fields.service'; // Change to Product service
import { AuthService, BaseCreateUpdateComponent, Product } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { ProductModel } from '../../services/services-type'; // Change to ProductModel

@Component({
  selector: 'app-cu-product-dialog',
  imports: [FormDialogComponent],
  providers: [ProductsFieldsService], // Inject ProductFieldsService
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuProductDialogComponent extends BaseCreateUpdateComponent<ProductModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService); // Auth service may still be useful for handling product permissions
  fieldsService = inject(ProductsFieldsService); // Inject ProductsFieldsService
  #list$ = this.#globalList.getGlobalList('products'); // Get list for products instead of users

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$, // Get the product list
      endpoints: {
        store: 'auth/products/product', // Endpoint for creating products
        update: 'auth/products/product/update', // Endpoint for updating products
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Product')), // Update the title for products
        submitButtonLabel: this.translate.instant(_('Update Product')), // Update the button label
      };
      this.model = new ProductModel(this.editData); // Initialize the model with product data
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Product')), // New product dialog title
        submitButtonLabel: this.translate.instant(_('Create New Product')), // New product button label
      };
      this.model = new ProductModel(); // Initialize the model with an empty product
    }
    this.fields = this.fieldsService.configureFields(this.editData); // Use ProductFieldsService for field configuration
  }

  override updateUi(model: ProductModel) {
    // Custom UI update logic for products, if needed
    // You may not need this logic unless you are tracking product changes in the UI like with users
  }
}
