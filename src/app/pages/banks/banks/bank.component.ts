import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    RouterLink,
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
          title: this.#translate(_('title')),
          name: 'title',
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
