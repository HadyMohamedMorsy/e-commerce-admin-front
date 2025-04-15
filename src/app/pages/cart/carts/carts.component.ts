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
import { ViewCartComponent } from '../dialog/view/view-cart.component';
import { Cart } from '../services/services-type';

@Component({
  selector: 'app-carts',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    TooltipModule,
    TranslateModule,
    ViewCartComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './carts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartsComponent extends BaseIndexComponent<Cart> {
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'cart/index',
        delete: 'cart/delete',
      },
      displayViewButton: true,
      displayCreateButton: false,
      displayUpdateButton: false,
      indexTitle: this.#translate(_('Carts')),
      indexIcon: 'pi pi-shopping-cart',
      indexTableKey: 'CARTS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Quantity')),
          name: `quantity`,
          searchable: true,
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
    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
