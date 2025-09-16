import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';
import { PaperType } from '../../services/services-type';

@Component({
  selector: 'app-view-paper-type',
  imports: [ViewDialogComponent],
  templateUrl: './view-paper-types.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViewPaperTypeComponent {
  isShowDialog = model(false);
  paperType = input.required<PaperType>();
  #dateFormatter = new DateFormatterPipe();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.paperType()?.id,
      },
      {
        label: 'Paper Name',
        value: this.paperType()?.paperName,
        hasToolTip: true,
      },
      {
        label: 'Price',
        value: this.paperType()?.price ? `$${this.paperType()?.price}` : 'N/A',
      },
    ];
  });
}
