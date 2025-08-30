import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuShapeCategoryDialogComponent } from '../dialog/cu/cu-shape-category-dialog.component';
import { ViewShapeCategoryComponent } from '../dialog/view/view-shape-category.component';
import { ShapeCategory } from '../services/services-type';

@Component({
  selector: 'app-shape-categories',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    ViewShapeCategoryComponent,
    TooltipModule,
    TranslateModule,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './shape-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShapeCategoriesComponent extends BaseIndexComponent<ShapeCategory> {
  domainUrl = '';

  ngOnInit() {
    this.dialogComponent = CuShapeCategoryDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'shape-categories/index',
        delete: 'shape-categories/delete',
      },
      navigateCreatePage: 'new-shape-category',
      displayFilterButton: false,
      displayViewButton: true,
      indexTitle: this.#translate(_('Shape Categories')),
      indexIcon: 'pi pi-tags',
      createBtnLabel: this.#translate(_('Create Shape Category')),
      indexTableKey: 'SHAPE_CATEGORIES_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Type')),
          name: `type`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Name')),
          name: `name`,
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
