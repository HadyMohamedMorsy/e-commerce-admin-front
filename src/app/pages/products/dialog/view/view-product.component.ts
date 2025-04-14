import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { ProductList } from '@pages/products/services/services-type'; // Change to ProductList
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-product',
  imports: [ViewDialogComponent],
  templateUrl: './view-product.component.html', // Update to correct template path
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProductComponent {
  isShowDialog = model(false);
  product = input.required<ProductList>(); // Change to ProductList

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.product()?.id,
      },
      {
        label: 'Product Name',
        value: this.product()?.product_name, // Change to product_name
      },
      {
        label: 'Category',
        value: this.product()?.category, // Change to category
      },
      {
        label: 'Price',
        value: this.product()?.price, // Change to price
      },
      {
        label: 'Stock Quantity',
        value: this.product()?.stock_quantity, // Change to stock_quantity
      },
      {
        label: 'Description',
        value: this.product()?.description, // Change to description
        hasToolTip: true,
      },
      {
        label: 'Created At',
        value: this.product()?.created_at, // Change to created_at
      },
    ];
  });
}
