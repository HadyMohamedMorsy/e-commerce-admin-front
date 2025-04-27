import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Product } from '@pages/products/services/services-type'; // Change to ProductList
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-product',
  imports: [ViewDialogComponent],
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
    ];
  });
}
