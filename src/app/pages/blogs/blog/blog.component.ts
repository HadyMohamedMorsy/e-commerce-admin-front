import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuBlogDialogComponent } from '../dialog/cu/cu-blog-dialog.component';
import { ViewBlogComponent } from '../dialog/view/view-blog/view-blog.component';
import { FiltersBlogsComponent } from '../filters-users/filters-blogs.component';
import { Blog } from '../services/services-type';
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersBlogsComponent,
    TooltipModule,
    TranslateModule,
    EllipsisActionComponent,
    ViewBlogComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './blogs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogsComponent extends BaseIndexComponent<Blog> {
  title = viewChild.required<TemplateRef<any>>('title');

  ngOnInit() {
    this.dialogComponent = CuBlogDialogComponent;

    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'content/blogs',
        delete: 'content/blogs/delete',
      },
      navigateCreatePage: 'new-blog',
      displayViewButton: true,
      indexTitle: this.#translate(_('Blogs')),
      indexIcon: 'pi pi-book',
      createBtnLabel: this.#translate(_('Create Blog')),
      indexTableKey: 'BLOGS_KEY',
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
          orderable: true,
          render: this.title(),
        },
        {
          title: this.#translate(_('Author')),
          name: `author_name`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Published At')),
          name: 'published_at',
          searchable: false,
          orderable: true,
        },
      ],
    };

    this.filtersData.update((filters) => ({
      ...filters,
      type: 'blog',
    }));

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
