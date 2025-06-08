import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { CuProductAttributeDialogComponent } from '../dialog/cu/cu-product-attribute-dialog.component';
import { ProductAttribute } from '../services/services-type';

@Component({
  selector: 'app-product-attributes',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    FormsModule,
    ToggleSwitchModule,
  ],
  templateUrl: './product-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductAttributesComponent extends BaseIndexComponent<ProductAttribute> {
  productId = input<number>();

  ngOnInit() {
    this.dialogComponent = CuProductAttributeDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'attribute/index',
        delete: 'attribute/delete',
      },
      displayCreateButton: false,
      displayViewButton: false,
      navigateCreatePage: 'new-product-attribute',
      indexTitle: this.#translate(_('Product Attributes')),
      indexIcon: 'pi pi-box',
      createBtnLabel: this.#translate(_('Create Product Attribute')),
      indexTableKey: 'PRODUCT_ATTRIBUTES_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Name')),
          name: `name`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Value')),
          name: `value`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Price')),
          name: `priceChange`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('quantity')),
          name: `quantity`,
          searchable: true,
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
