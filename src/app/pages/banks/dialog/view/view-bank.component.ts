import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Bank } from '@pages/banks/services/services-type';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-bank',
  imports: [ViewDialogComponent],
  templateUrl: './view-bank.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBankComponent {
  isShowDialog = model(false);
  bank = input.required<Bank>();
  #dateFormatter = new DateFormatterPipe();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.bank()?.id,
      },
      {
        label: 'Account Name',
        value: this.bank()?.account_name,
      },
      {
        label: 'Account Number',
        value: this.bank()?.account_number,
      },
      {
        label: 'Branch Name',
        value: this.bank()?.branch_name,
      },
      {
        label: 'Bank Name',
        value: this.bank()?.bank_name,
      },
      {
        label: 'IBAN',
        value: this.bank()?.iban,
      },
      {
        label: 'Swift Code',
        value: this.bank()?.swift_code,
      },
      {
        label: 'City',
        value: this.bank()?.city?.name,
      },
      {
        label: 'Country',
        value: this.bank()?.country?.name,
      },
      {
        label: 'Area',
        value: this.bank()?.area?.name,
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.bank()?.createdAt,
          'relative',
        ),
      },
    ];
  });
}
