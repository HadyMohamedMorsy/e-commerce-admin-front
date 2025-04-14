import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { AddressList } from '@pages/users/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-address',
  imports: [ViewDialogComponent],
  templateUrl: './view-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAddressComponent {
  isShowDialog = model(false);
  address = input.required<AddressList>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.address()?.id,
      },
      {
        label: 'Street',
        value: this.address()?.street,
      },
      {
        label: 'City',
        value: this.address()?.city,
      },
      {
        label: 'State/Province',
        value: this.address()?.state,
        hasToolTip: true,
      },
      {
        label: 'Postal Code',
        value: this.address()?.postal_code,
      },
      {
        label: 'Country',
        value: this.address()?.country,
      },
      {
        label: 'Phone Number',
        value: this.address()?.phone,
      },
      {
        label: 'Created At',
        value: this.address()?.created_at,
      },
    ];
  });
}
