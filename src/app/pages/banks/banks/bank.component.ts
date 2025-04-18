import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuAddressDialogComponent } from '../dialog/cu/cu-address-dialog.component';
import { ViewAddressComponent } from '../dialog/view/view-address.component';
import { FiltersAddressesComponent } from '../filters-bank/filters-address.component';
import { Address } from '../services/services-type';

@Component({
  selector: 'app-addresses',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersAddressesComponent,
    TooltipModule,
    TranslateModule,
    ViewAddressComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddressesComponent extends BaseIndexComponent<Address> {
  ngOnInit() {
    this.dialogComponent = CuAddressDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'address/index',
        delete: 'address/delete',
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
          title: this.#translate(_('title')),
          name: `title`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('country')),
          name: 'country',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('city')),
          name: 'city',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('postalCode')),
          name: 'postalCode',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('phoneNumber')),
          name: 'phoneNumber',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('created_at')),
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
