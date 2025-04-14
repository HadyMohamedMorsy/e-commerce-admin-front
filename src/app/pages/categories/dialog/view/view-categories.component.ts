import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';
import { Category } from '../../services/services-type'; // adjust path if needed

@Component({
  selector: 'app-view-category',
  imports: [ViewDialogComponent],
  templateUrl: './view-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCategoryComponent {
  isShowDialog = model(false);
  category = input.required<Category>();

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
        label: 'Is Active',
        value: this.category()?.is_active ? 'Yes' : 'No',
      },
      {
        label: 'Created At',
        value: this.category()?.created_at,
      },
    ];
  });
}
