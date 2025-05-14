import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Tax } from '@pages/taxes/services/services-type';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-tax',
  imports: [ViewDialogComponent],
  templateUrl: './view-tax.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTaxComponent {
  isShowDialog = model(false);
  tax = input.required<Tax>();
  #dateFormatter = new DateFormatterPipe();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.tax()?.id,
      },
      {
        label: 'Name',
        value: this.tax()?.name,
      },
      {
        label: 'Rate',
        value: this.tax()?.rate,
      },
      {
        label: 'Location',
        value: this.tax()?.location,
      },
      {
        label: 'Status',
        value: this.tax()?.isActive ? 'Active' : 'Inactive',
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(this.tax()?.createdAt, 'relative'),
      },
    ];
  });
}
