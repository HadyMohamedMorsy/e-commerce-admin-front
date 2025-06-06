import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { CuTaxDialogComponent } from '../dialog/cu/cu-tax-dialog.component';
import { ViewTaxComponent } from '../dialog/view/view-tax.component';
import { Tax } from '../services/services-type';

@Component({
  selector: 'app-taxes',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    ViewTaxComponent,
    TooltipModule,
    TranslateModule,
    MenuModule,
    Dialog,
    TranslateModule,
    FormsModule,
    ToggleSwitchModule,
  ],
  templateUrl: './tax.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaxesComponent extends BaseIndexComponent<Tax> {
  isActive = viewChild.required<TemplateRef<any>>('isActive');
  ngOnInit() {
    this.dialogComponent = CuTaxDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'tax/index',
        delete: 'tax/delete',
      },
      navigateCreatePage: 'new-tax',
      displayViewButton: true,
      indexTitle: this.#translate(_('Taxes')),
      indexIcon: 'pi pi-percentage',
      createBtnLabel: this.#translate(_('Create Tax')),
      indexTableKey: 'TAXES_KEY',
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
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Rate')),
          name: `rate`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('isActive')),
          name: `isActive`,
          searchable: false,
          orderable: false,
          render: this.isActive(),
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
