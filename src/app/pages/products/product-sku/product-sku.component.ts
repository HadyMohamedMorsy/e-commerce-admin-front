import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { CuProductSkuDialogComponent } from '../dialog/cu/cu-product-sku-dialog.component';
import { ProductSku } from '../services/services-type';

@Component({
  selector: 'app-product-skus',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    FormsModule,
    ToggleSwitchModule,
  ],
  templateUrl: './product-sku.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductSkusComponent extends BaseIndexComponent<ProductSku> {
  productId = input<number>();
  isFeatured = viewChild.required<TemplateRef<any>>('isFeatured');
  isOffered = viewChild.required<TemplateRef<any>>('isOffered');

  ngOnInit() {
    this.dialogComponent = CuProductSkuDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'product-sku/index',
        delete: 'product-sku/delete',
      },
      navigateCreatePage: 'new-product-sku',
      displayViewButton: true,
      indexTitle: this.#translate(_('Product SKUs')),
      indexIcon: 'pi pi-box',
      createBtnLabel: this.#translate(_('Create Product SKU')),
      indexTableKey: 'PRODUCT_SKUS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('SKU')),
          name: `sku`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Price')),
          name: `price`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Quantity')),
          name: `quantity`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('isFeatured')),
          name: 'isFeatured',
          searchable: false,
          orderable: false,
          render: this.isFeatured(),
        },
        {
          title: this.#translate(_('isOffered')),
          name: 'isOffered',
          searchable: false,
          orderable: false,
          render: this.isOffered(),
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.filtersData.update((filters) => ({
      ...filters,
      productId: this.productId(),
    }));
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
