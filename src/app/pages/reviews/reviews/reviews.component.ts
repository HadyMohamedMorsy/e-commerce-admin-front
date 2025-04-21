import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuReviewDialogComponent } from '../dialog/cu/cu-reviews-dialog.component';
import { ViewReviewComponent } from '../dialog/view/view-reviews.component';
import { FiltersReviewsComponent } from '../filters-reviews/filters-reviews.component';
import { Review } from '../services/services-type';

@Component({
  selector: 'app-reviews',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    FiltersReviewsComponent,
    TooltipModule,
    TranslateModule,
    ViewReviewComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReviewsComponent extends BaseIndexComponent<Review> {
  ngOnInit() {
    this.dialogComponent = CuReviewDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'review/index',
        delete: 'review/delete',
      },
      navigateCreatePage: 'new-review',
      displayViewButton: true,
      indexTitle: this.#translate(_('Reviews')),
      indexIcon: 'pi pi-comments',
      createBtnLabel: this.#translate(_('Create Review')),
      indexTableKey: 'REVIEWS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('rating')),
          name: `rating`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('reviewer_name')),
          name: 'reviewer_name',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('product')),
          name: 'product',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('created_at')),
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
