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
import { CuCustomerDialogComponent } from '../dialog/cu/cu-customer-dialog.component';
import { ViewCustomerComponent } from '../dialog/view/view-customer/view-customer.component';
import { FiltersCustomersComponent } from '../filters-users/filters-customers.component';
import { Customer } from '../services/services-type';
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-customers',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersCustomersComponent,
    TooltipModule,
    TranslateModule,
    EllipsisActionComponent,
    ViewCustomerComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomersComponent extends BaseIndexComponent<Customer> {
  owner = viewChild.required<TemplateRef<any>>('owner');
  fullName = viewChild.required<TemplateRef<any>>('fullName');

  hasAnyRoleListSubscriptionUser() {
    return this.userRoles.hasAnyRole([
      '8x-owner',
      '8x-admin-assistant',
      '8x-cs-manager',
      '8x-cs-team-leader',
      '8x-customer-success',
      '8x-renewals-manager',
      'customer-owner',
      'customer-delegated-person',
    ]);
  }

  ngOnInit() {
    this.dialogComponent = CuCustomerDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/users/user',
        delete: 'auth/users/user/delete',
      },
      navigateCreatePage: 'new-customer',
      displayViewButton: true,
      indexTitle: this.#translate(_('Customers')),
      indexIcon: 'pi pi-users',
      createBtnLabel: this.#translate(_('Create Customers')),
      indexTableKey: 'CUSTOMERS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Full Name')),
          name: `full_name`,
          searchable: true,
          orderable: false,
          render: this.fullName(),
        },
        {
          title: this.#translate(_('Email Address')),
          name: `email`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Is Owner')),
          name: `is_owner`,
          searchable: false,
          orderable: false,
          render: this.owner(),
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
      type: 'customer',
    }));

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
