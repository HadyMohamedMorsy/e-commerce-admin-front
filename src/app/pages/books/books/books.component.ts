import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import CuBookDialogComponent from '../dialog/cu/cu-book-dialog.component';
import ViewBookComponent from '../dialog/view/view-book.component';
import { Book } from '../services/services-type';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    TranslateModule,
    ViewBookComponent,
    Dialog,
  ],
  templateUrl: './books.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BooksComponent extends BaseIndexComponent<Book> {
  svg = viewChild.required<TemplateRef<any>>('svg');
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.dialogComponent = CuBookDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'books/index',
        delete: 'books/delete',
      },
      navigateCreatePage: 'new-book',
      displayViewButton: true,
      displayFilterButton: false,
      indexTitle: this.#translate(_('Books')),
      indexIcon: 'pi pi-book',
      createBtnLabel: this.#translate(_('Create Book')),
      indexTableKey: 'BOOKS_KEY',
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
        {
          title: this.#translate(_('SVG')),
          name: `svg`,
          searchable: false,
          orderable: false,
          render: this.svg(),
        },
        {
          title: this.#translate(_('Type')),
          name: `type`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Price')),
          name: 'price',
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

  sanitizeHtml(html: string): SafeHtml {
    if (!html) return '';
    if (html.includes('<svg') || html.includes('</svg>')) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    return this.sanitizer.sanitize(1, html) || '';
  }
}
