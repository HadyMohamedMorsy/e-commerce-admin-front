import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import ProductAttributesComponent from '@pages/products/product-attribute/product-attribute.component';
import ProductSkusComponent from '@pages/products/product-sku/product-sku.component';
import { Product } from '@pages/products/services/services-type'; // Change to ProductList
import SpecificationsComponent from '@pages/products/specification/specification.component';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-product',
  imports: [
    ViewDialogComponent,
    ProductSkusComponent,
    ProductAttributesComponent,
    SpecificationsComponent,
  ],
  templateUrl: './view-product.component.html', // Update to correct template path
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProductComponent {
  isShowDialog = model(false);
  product = input.required<Product>(); // Change to ProductList

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.product()?.id,
      },
      {
        label: 'Name',
        value: this.product()?.name,
      },
      {
        label: 'Description',
        value: this.product()?.description,
        hasToolTip: true,
      },
      {
        label: 'Meta Title',
        value: this.product()?.metaTitle,
      },
      {
        label: 'Meta Description',
        value: this.product()?.metaDescription,
        hasToolTip: true,
      },
      {
        label: 'Summary',
        value: this.product()?.summary,
      },
      {
        label: 'Cover',
        value: this.product()?.cover,
        type: 'image',
      },
      {
        label: 'Created At',
        value: this.product()?.createdAt,
      },
    ];
  });
}
