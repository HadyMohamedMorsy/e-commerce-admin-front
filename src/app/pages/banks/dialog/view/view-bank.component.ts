import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Bank } from '@pages/bank/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

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
      {
        label: 'title',
        value: this.bank()?.title,
      },
      {
        label: 'Branch',
        value: this.bank()?.branch,
      },
      {
        label: 'Account Number',
        value: this.bank()?.accountNumber,
        hasToolTip: true,
      },
      {
        label: 'Account Holder',
        value: this.bank()?.accountHolder,
      },
      {
        label: 'Bank Name',
        value: this.bank()?.bankName,
      },
      {
        label: 'IFSC Code',
        value: this.bank()?.ifscCode,
      },
      {
        label: 'SWIFT Code',
        value: this.bank()?.swiftCode,
      },
      {
        label: 'Country',
        value: this.bank()?.country,
      },
      {
        label: 'Phone Number',
        value: this.bank()?.phoneNumber,
      },
      {
        label: 'Created At',
        value: this.bank()?.createdAt,
      },
      {
        label: 'Updated At',
        value: this.bank()?.updated_at,
      },
    ];
  });
}
