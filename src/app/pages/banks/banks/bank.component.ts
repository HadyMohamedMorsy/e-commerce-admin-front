import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuBankDialogComponent } from '../dialog/cu/cu-bank-dialog.component';
import { ViewBankComponent } from '../dialog/view/view-bank.component';
import { FiltersBanksComponent } from '../filters-bank/filters-bank.component';
import { Bank } from '../services/services-type';

@Component({
  selector: 'app-banks',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    FiltersBanksComponent,
    TooltipModule,
    TranslateModule,
    ViewBankComponent,
    MenuModule,
    Dialog,
  ],
  templateUrl: './bank.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BanksComponent extends BaseIndexComponent<Bank> {
  ngOnInit() {
    this.dialogComponent = CuBankDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'bank/index',
        delete: 'bank/delete',
      },
      navigateCreatePage: 'new-bank',
      displayViewButton: true,
      indexTitle: this.#translate(_('Banks')),
      indexIcon: 'pi pi-building',
      createBtnLabel: this.#translate(_('Create Bank')),
      indexTableKey: 'BANKS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: 'id',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('account name')),
          name: 'accountName',
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('account Number')),
          name: 'accountNumber',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('branch Name')),
          name: 'branchName',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('bank name')),
          name: 'bankName',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('iban')),
          name: 'iban',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('swift Code')),
          name: 'swiftCode',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('country')),
          name: 'country.name',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('region')),
          name: 'region.name',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('city')),
          name: 'city.name',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('area')),
          name: 'area.name',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('created at')),
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
