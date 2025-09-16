import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

import { RouterLink } from '@angular/router';
import CuPaperTypeDialogComponent from '../dialog/cu/cu-paper-types-dialog.component';
import ViewPaperTypeComponent from '../dialog/view/view-paper-types.component';
import { PaperType } from '../services/services-type';

@Component({
  selector: 'app-paper-types',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    RouterLink,
    TranslateModule,
    ViewPaperTypeComponent,
    MenuModule,
    Dialog,
  ],
  templateUrl: './paper-types.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaperTypesComponent extends BaseIndexComponent<PaperType> {
  name = viewChild.required<TemplateRef<any>>('name');

  ngOnInit() {
    this.dialogComponent = CuPaperTypeDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      provideFields: ['paperName', 'price'],
      endpoints: {
        index: 'paper-type/index',
        delete: 'paper-type/delete',
      },
      navigateCreatePage: 'new-paper-type',
      displayViewButton: true,
      displayFilterButton: false,
      indexTitle: this.#translate(_('Paper Types')),
      indexIcon: 'pi pi-file',
      createBtnLabel: this.#translate(_('Create Paper Type')),
      indexTableKey: 'PAPER_TYPES_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Paper Name')),
          name: `paperName`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Price')),
          name: `price`,
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
