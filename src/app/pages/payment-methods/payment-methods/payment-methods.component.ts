import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuPaymentMethodDialogComponent } from '../dialog/cu/cu-payment-method-dialog.component';
import { ViewPaymentMethodComponent } from '../dialog/view/view-payment-method.component';
import { PaymentMethod } from '../services/services-type';

@Component({
  selector: 'app-payment-methods',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    TranslateModule,
    ViewPaymentMethodComponent,
    Dialog,
  ],
  templateUrl: './payment-methods.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaymentMethodsComponent extends BaseIndexComponent<PaymentMethod> {
  ngOnInit() {
    this.dialogComponent = CuPaymentMethodDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'payment-method/index',
        delete: 'payment-method/delete',
      },
      navigateCreatePage: 'new-payment-method',
      displayViewButton: true,
      indexTitle: this.#translate(_('Payment Methods')),
      indexIcon: 'pi pi-credit-card',
      createBtnLabel: this.#translate(_('Create Payment Method')),
      indexTableKey: 'PAYMENT_METHODS_KEY',
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
          title: this.#translate(_('Slug')),
          name: 'slug',
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Icon')),
          name: 'icon',
          searchable: false,
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
