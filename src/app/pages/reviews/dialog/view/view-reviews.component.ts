import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Review } from '@pages/review/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

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
        label: 'Title',
        value: this.review()?.title,
      },
      {
        label: 'Rating',
        value: this.review()?.rating,
      },
      {
        label: 'Reviewer Name',
        value: this.review()?.reviewerName,
      },
      {
        label: 'Review Content',
        value: this.review()?.content,
        hasToolTip: true,
      },
      {
        label: 'Product',
        value: this.review()?.productName,
      },
      {
        label: 'Created At',
        value: this.review()?.createdAt,
      },
      {
        label: 'Updated At',
        value: this.review()?.updatedAt,
      },
    ];
  });
}
