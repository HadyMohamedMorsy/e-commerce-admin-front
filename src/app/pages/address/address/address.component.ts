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
import { CuAddressDialogComponent } from '../dialog/cu/cu-address-dialog.component';
import { ViewAddressComponent } from '../dialog/view/view-address/view-address.component';
import { FiltersAddressesComponent } from '../filters-users/filters-addresses.component';
import { Address } from '../services/services-type';
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-addresses',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersAddressesComponent,
    TooltipModule,
    TranslateModule,
    EllipsisActionComponent,
    ViewAddressComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddressesComponent extends BaseIndexComponent<Address> {
  fullName = viewChild.required<TemplateRef<any>>('fullName');

  ngOnInit() {
    this.dialogComponent = CuAddressDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/users/user',
        delete: 'auth/users/user/delete',
      },
      navigateCreatePage: 'new-address',
      displayViewButton: true,
      indexTitle: this.#translate(_('Addresses')),
      indexIcon: 'pi pi-users',
      createBtnLabel: this.#translate(_('Create Address')),
      indexTableKey: 'ADDRESSES_KEY',
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
          title: this.#translate(_('created at')),
          name: 'created_at',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.filtersData.update((filters) => ({
      ...filters,
      type: 'address',
    }));

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
