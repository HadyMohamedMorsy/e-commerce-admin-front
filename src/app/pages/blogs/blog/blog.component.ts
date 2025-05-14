import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { CuBlogDialogComponent } from '../dialog/cu/cu-blog-dialog.component';
import { ViewBlogComponent } from '../dialog/view/view-blog.component';
import { FiltersBlogsComponent } from '../filters-blog/filters-blog.component';
import { Blog } from '../services/services-type';
@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    FiltersBlogsComponent,
    TooltipModule,
    FormsModule,
    ToggleSwitchModule,
    TranslateModule,
    ViewBlogComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogsComponent extends BaseIndexComponent<Blog> {
  isPublished = viewChild.required<TemplateRef<any>>('isPublished');
  isFeatured = viewChild.required<TemplateRef<any>>('isFeatured');

  ngOnInit() {
    this.dialogComponent = CuBlogDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'blog/index',
        delete: 'blog/delete',
      },
      provideFields: [
        'description',
        'shortDescription',
        'metaTitle',
        'metaDescription',
        'startDate',
        'endDate',
        'featuredImages',
        'isFeatured',
        'isPublished',
        'mediaType',
        'thumb',
        'video',
      ],
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
          title: this.#translate(_('title')),
          name: `title`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('sub Title')),
          name: `subTitle`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('post Type')),
          name: `postType`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('slug')),
          name: `slug`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('meta Title')),
          name: `metaTitle`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('order')),
          name: `order`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('views')),
          name: 'views',
          searchable: false,
          orderable: true,
        },
        {
          title: this.#translate(_('isPublished')),
          name: 'isPublished',
          searchable: false,
          orderable: true,
          render: this.isPublished(),
        },
        {
          title: this.#translate(_('isFeatured')),
          name: 'isFeatured',
          searchable: false,
          orderable: true,
          render: this.isFeatured(),
        },
        {
          title: this.#translate(_('created At')),
          name: 'createdAt',
          searchable: false,
          orderable: true,
        },
        {
          title: this.#translate(_('updated At')),
          name: 'updatedAt',
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
