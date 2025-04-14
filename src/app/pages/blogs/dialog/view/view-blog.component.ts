import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';
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
        label: 'Author',
        value: this.blog()?.author,
      },
      {
        label: 'Summary',
        value: this.blog()?.summary,
      },
      {
        label: 'Published At',
        value: this.blog()?.published_at,
      },
      {
        label: 'Status',
        value: this.blog()?.status,
      },
      {
        label: 'Created At',
        value: this.blog()?.created_at,
      },
    ];
  });
}
