import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuShapeDialogComponent } from '../dialog/cu/cu-shape-dialog.component';
import { ViewShapeComponent } from '../dialog/view/view-shape.component';
import { Shape } from '../services/services-type';

@Component({
  selector: 'app-shapes',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    ViewShapeComponent,
    TooltipModule,
    TranslateModule,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './shape.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShapesComponent extends BaseIndexComponent<Shape> {
  ngOnInit() {
    this.dialogComponent = CuShapeDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'shapes/index',
        delete: 'shapes/delete',
      },
      navigateCreatePage: 'new-shape',
      displayViewButton: true,
      indexTitle: this.#translate(_('Shapes')),
      indexIcon: 'pi pi-shapes',
      createBtnLabel: this.#translate(_('Create Shape')),
      indexTableKey: 'SHAPES_KEY',
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
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Image')),
          name: `image`,
          searchable: false,
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
