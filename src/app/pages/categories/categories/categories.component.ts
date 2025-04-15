import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

import { CuCategoryDialogComponent } from '../dialog/cu/cu-categories-dialog.component';
import { ViewCategoryComponent } from '../dialog/view/view-categories.component';
import { Category } from '../services/services-type';

@Component({
  selector: 'app-categories',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    TooltipModule,
    TranslateModule,
    ViewCategoryComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoriesComponent extends BaseIndexComponent<Category> {
  ngOnInit() {
    this.dialogComponent = CuCategoryDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'category/index',
        delete: 'category/delete',
      },
      navigateCreatePage: 'new-category',
      displayViewButton: true,
      indexTitle: this.#translate(_('Categories')),
      indexIcon: 'pi pi-tags',
      createBtnLabel: this.#translate(_('Create Category')),
      indexTableKey: 'CATEGORIES_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Description')),
          name: `description`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Is Active')),
          name: `is_active`,
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

    this.filtersData.update((filters) => ({
      ...filters,
      type: 'category',
    }));

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
