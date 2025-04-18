import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Review } from '@pages/reviews/services/services-type';
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
    ];
  });
}
