import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuProductDialogComponent } from '../dialog/cu/cu-product-dialog.component';
import { ViewProductComponent } from '../dialog/view/view-product.component';
import { Product } from '../services/services-type';
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-products',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    ViewProductComponent,
    TranslateModule,
    EllipsisActionComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsComponent extends BaseIndexComponent<Product> {

  ngOnInit() {
    this.dialogComponent = CuProductDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'product/index',
        delete: 'product/delete',
      },
      navigateCreatePage: 'new-product',
      displayViewButton: true,
      indexTitle: this.#translate(_('Products')),
      indexIcon: 'pi pi-box',
      createBtnLabel: this.#translate(_('Create Product')),
      indexTableKey: 'PRODUCTS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Price')),
          name: `price`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
          name: 'created_at',
          searchable: false,
          orderable: false,
        },
      ],
    };
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
