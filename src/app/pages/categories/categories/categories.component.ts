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

import { environment } from '@env';
import { ImageModule } from 'primeng/image';
import { CuCategoryDialogComponent } from '../dialog/cu/cu-categories-dialog.component';
import { ViewCategoryComponent } from '../dialog/view/view-categories.component';
import { Category } from '../services/services-type';

@Component({
  selector: 'app-categories',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    ImageModule,
    ViewCategoryComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoriesComponent extends BaseIndexComponent<Category> {
  image = viewChild.required<TemplateRef<any>>('image');
  domainUrl = environment.Domain_URL;

  ngOnInit() {
    this.dialogComponent = CuCategoryDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      provideFields: ['image'],
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
          title: this.#translate(_('name')),
          name: `name`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('categoty type')),
          name: `categoryType`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('image')),
          name: `image`,
          searchable: true,
          orderable: false,
          render: this.image(),
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
