import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuProductDialogComponent } from '../dialog/cu/cu-product-dialog.component'; // Updated dialog component for products
import { ViewProductComponent } from '../dialog/view/view-product/view-product.component'; // Updated view component for products
import { FiltersProductsComponent } from '../filters-products/filters-products.component'; // Updated filter component for products
import { Product } from '../services/services-type'; // Assuming you have a Product type in services-type
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-products', // Updated selector for products
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersProductsComponent, // Updated filter component
    TooltipModule,
    TranslateModule,
    EllipsisActionComponent,
    ViewProductComponent, // Updated view component for products
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './product.component.html', // Updated template path if needed
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsComponent extends BaseIndexComponent<Product> {
  // Changed to Product type
  fullName = viewChild.required<TemplateRef<any>>('fullName'); // If applicable for products, otherwise change to relevant field

  ngOnInit() {
    this.dialogComponent = CuProductDialogComponent; // Updated dialog component
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/products', // Updated endpoint for products
        delete: 'auth/products/delete', // Updated delete endpoint for products
      },
      navigateCreatePage: 'new-product', // Updated route for creating a product
      displayViewButton: true,
      indexTitle: this.#translate(_('Products')), // Updated title
      indexIcon: 'pi pi-box', // Icon for products (may need updating)
      createBtnLabel: this.#translate(_('Create Product')), // Updated label for creating a product
      indexTableKey: 'PRODUCTS_KEY', // Key for products
      columns: [
        {
          title: this.#translate(_('#ID')), // Column for Product ID
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Product Name')), // Column for Product Name
          name: `name`, // Assuming you have a `name` field for products
          searchable: true,
          orderable: false,
          render: this.fullName(), // Adjust if needed for product name
        },
        {
          title: this.#translate(_('Price')), // Column for product price
          name: `price`, // Assuming you have a `price` field for products
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')), // Column for creation date
          name: 'created_at',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.filtersData.update((filters) => ({
      ...filters,
      type: 'product', // Updated filter type to 'product'
    }));

    this.initProductCategories(); // Initialize any additional logic related to products
  }

  #translate(text: string) {
    return this.translate.instant(text); // Translation method
  }
}
