import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Review } from '@pages/reviews/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-review',
  imports: [ViewDialogComponent],
  templateUrl: './view-reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewReviewComponent {
  isShowDialog = model(false);
  review = input.required<Review>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.review()?.id,
      },
      {
        label: 'Product',
        value: this.review()?.product?.name,
      },
      {
        label: 'User',
        value:
          this.review()?.createdBy?.firstName +
          ' ' +
          this.review()?.createdBy?.lastName,
      },
      {
        label: 'Rating',
        value: this.review()?.rate,
      },
      {
        label: 'Comment',
        value: this.review()?.comment,
        hasToolTip: true,
      },
      {
        label: 'Created At',
        value: this.review()?.createdAt,
      },
    ];
  });
}
