import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import ViewCustomOrderComponent from '../dialog/view/view-custom-order.component';
import { CustomOrder } from '../services/services-type';

@Component({
  selector: 'app-custom-orders',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    TranslateModule,
    ViewCustomOrderComponent,
    Dialog,
  ],
  templateUrl: './custom-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomOrdersComponent extends BaseIndexComponent<CustomOrder> {
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'custom-orders/index',
        delete: 'custom-orders/delete',
      },
      navigateCreatePage: 'new-custom-order',
      displayViewButton: true,
      indexTitle: this.#translate(_('Custom Orders')),
      indexIcon: 'pi pi-shopping-cart',
      createBtnLabel: this.#translate(_('Create Custom Order')),
      indexTableKey: 'CUSTOM_ORDERS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Total Price')),
          name: `totalPrice`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Status')),
          name: 'status',
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Customer')),
          name: 'createdBy',
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
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
