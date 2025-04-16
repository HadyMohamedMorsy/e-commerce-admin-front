import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuFaqDialogComponent } from '../dialog/cu/cu-faq-dialog.component';
import { ViewFaqComponent } from '../dialog/view/view-faq.component';
import { FiltersFaqComponent } from '../filters-faq/filters-faq.component';
import { Faq } from '../services/services-type';

@Component({
  selector: 'app-faqs',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersFaqComponent,
    TooltipModule,
    TranslateModule,
    ViewFaqComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FaqsComponent extends BaseIndexComponent<Faq> {
  ngOnInit() {
    this.dialogComponent = CuFaqDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'faq/index',
        delete: 'faq/delete',
      },
      navigateCreatePage: 'new-faq',
      displayViewButton: true,
      indexTitle: this.#translate(_('FAQs')),
      indexIcon: 'pi pi-question-circle',
      createBtnLabel: this.#translate(_('Create FAQ')),
      indexTableKey: 'FAQS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Question')),
          name: `question`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Category')),
          name: 'category',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
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
