import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuSpecificationDialogComponent } from '../dialog/cu/cu-specification-dialog.component';
import { Specification } from '../services/services-type';

@Component({
  selector: 'app-specifications',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    FormsModule,
  ],
  templateUrl: './specification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SpecificationsComponent extends BaseIndexComponent<Specification> {
  productId = input<number>();

  ngOnInit() {
    this.dialogComponent = CuSpecificationDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'specification/index',
        delete: 'specification/delete',
      },
      provideFields: ['attributes'],
      displayCreateButton: false,
      displayViewButton: false,
      navigateCreatePage: 'new-specification',
      indexTitle: this.#translate(_('Product Specifications')),
      indexIcon: 'pi pi-list',
      createBtnLabel: this.#translate(_('Create Specification')),
      indexTableKey: 'PRODUCT_SPECIFICATIONS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Title')),
          name: `title`,
          searchable: true,
          orderable: false,
        },
      ],
    };

    this.filtersData.update((filters) => ({
      ...filters,
      productId: this.productId(),
    }));
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
