import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { environment } from '@env';
import { TranslateModule } from '@ngx-translate/core';
import { ViewDialogComponent } from '@shared';
import { ImageModule } from 'primeng/image';
import { Blog } from '../../services/services-type'; // Adjust the import path as needed

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [ViewDialogComponent, ImageModule, TranslateModule],
  templateUrl: './view-blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBlogComponent {
  isShowDialog = model(false);
  blog = input.required<Blog>();
  domainUrl = environment.Domain_URL;

  list = computed<
    { label: string; value: any; hasToolTip?: boolean; type?: string }[]
  >(() => {
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
        label: 'Sub Title',
        value: this.blog()?.subTitle,
      },
      {
        label: 'Slug',
        value: this.blog()?.slug,
      },
      {
        label: 'Post Type',
        value: this.blog()?.postType,
      },
      {
        label: 'Order',
        value: this.blog()?.order,
      },
      {
        label: 'Views',
        value: this.blog()?.views,
      },
      {
        label: 'Is Featured',
        value: this.blog()?.isFeatured ? 'Yes' : 'No',
      },
      {
        label: 'Is Published',
        value: this.blog()?.isPublished ? 'Yes' : 'No',
      },
      {
        label: 'Start Date',
        value: this.blog()?.startDate,
      },
      {
        label: 'End Date',
        value: this.blog()?.endDate,
      },
      {
        label: 'Description',
        value: this.blog()?.description,
        hasToolTip: true,
      },
      {
        label: 'Short Description',
        value: this.blog()?.shortDescription,
        hasToolTip: true,
      },
      {
        label: 'Meta Title',
        value: this.blog()?.metaTitle,
      },
      {
        label: 'Meta Description',
        value: this.blog()?.metaDescription,
        hasToolTip: true,
      },
      {
        label: 'Media Type',
        value: this.blog()?.mediaType,
      },
      {
        label: 'Created At',
        value: this.blog()?.createdAt,
      },
      {
        label: 'Updated At',
        value: this.blog()?.updatedAt,
      },
    ];
  });
}
