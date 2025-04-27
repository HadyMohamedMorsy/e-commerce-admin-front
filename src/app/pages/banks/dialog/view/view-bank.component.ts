import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Bank } from '@pages/banks/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-bank',
  imports: [ViewDialogComponent],
  templateUrl: './view-bank.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBankComponent {
  isShowDialog = model(false);
  bank = input.required<Bank>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.bank()?.id,
      },
    ];
  });
}
