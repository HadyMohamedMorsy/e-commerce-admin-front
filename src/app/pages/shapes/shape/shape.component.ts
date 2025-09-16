import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { environment } from '@env';
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
  image = viewChild.required<TemplateRef<any>>('image');
  colorCode = viewChild.required<TemplateRef<any>>('colorCode');
  domainUrl = environment.Domain_URL;
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.dialogComponent = CuShapeDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'shapes/index',
        delete: 'shapes/delete',
      },
      navigateCreatePage: 'new-shape',
      displayFilterButton: false,
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
          title: this.#translate(_('Name')),
          name: `name`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Color Code')),
          name: `colorCode`,
          searchable: false,
          orderable: false,
          render: this.colorCode(),
        },
        {
          title: this.#translate(_('Type')),
          name: `type`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Shape Type')),
          name: `shapeType`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Part')),
          name: `part`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Image')),
          name: `image`,
          searchable: false,
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

  sanitizeHtml(html: string): SafeHtml {
    if (!html) return '';
    if (html.includes('<svg') || html.includes('</svg>')) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    return this.sanitizer.sanitize(1, html) || '';
  }
}
