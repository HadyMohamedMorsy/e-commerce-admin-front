import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { environment } from '@env';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';
import { Category } from '../../services/services-type'; // adjust path if needed

@Component({
  selector: 'app-view-category',
  imports: [ViewDialogComponent],
  templateUrl: './view-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCategoryComponent {
  isShowDialog = model(false);
  category = input.required<Category>();
  domainUrl = environment.Domain_URL;
  #dateFormatter = new DateFormatterPipe();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.category()?.id,
      },
      {
        label: 'Name',
        value: this.category()?.name,
        hasToolTip: true,
      },
      {
        label: 'Description',
        value: this.category()?.description,
        hasToolTip: true,
      },
      {
        label: 'Image',
        value: this.domainUrl + this.category()?.image,
        type: 'image',
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.category()?.createdAt,
          'relative',
        ),
      },
      {
        label: 'Updated At',
        value: this.#dateFormatter.transform(
          this.category()?.updatedAt,
          'relative',
        ),
      },
    ];
  });
}
