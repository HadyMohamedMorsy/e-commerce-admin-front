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
import { CuCartDialogComponent } from '../dialog/cu/cu-cart-dialog.component';
import { ViewCartComponent } from '../dialog/view/view-cart/view-cart.component';
import { FiltersCartsComponent } from '../filters-users/filters-carts.component';
import { Cart } from '../services/services-type';
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-carts',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersCartsComponent,
    TooltipModule,
    TranslateModule,
    EllipsisActionComponent,
    ViewCartComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './carts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartsComponent extends BaseIndexComponent<Cart> {
  productName = viewChild.required<TemplateRef<any>>('productName');

  ngOnInit() {
    this.dialogComponent = CuCartDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'commerce/carts',
        delete: 'commerce/carts/delete',
      },
      navigateCreatePage: 'new-cart',
      displayViewButton: true,
      indexTitle: this.#translate(_('Shopping Carts')),
      indexIcon: 'pi pi-shopping-cart',
      createBtnLabel: this.#translate(_('Create Cart')),
      indexTableKey: 'CARTS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Product Name')),
          name: `product_name`,
          searchable: true,
          orderable: false,
          render: this.productName(),
        },
        {
          title: this.#translate(_('Quantity')),
          name: `quantity`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Price')),
          name: 'price',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('created at')),
          name: 'created_at',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.filtersData.update((filters) => ({
      ...filters,
      type: 'cart',
    }));

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
