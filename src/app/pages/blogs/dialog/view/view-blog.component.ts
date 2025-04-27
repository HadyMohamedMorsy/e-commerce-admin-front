import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { ViewDialogComponent } from '@shared';
import { Blog } from '../../services/services-type'; // Adjust the import path as needed

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [ViewDialogComponent],
  templateUrl: './view-blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBlogComponent {
  isShowDialog = model(false);
  blog = input.required<Blog>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.blog()?.id,
      },
      {
        label: 'Title',
        value: this.blog()?.title,
      },
      {
        label: 'Slug',
        value: this.blog()?.slug,
      },
      {
        label: 'Created At',
        value: this.blog()?.created_at,
      },
    ];
  });
}
