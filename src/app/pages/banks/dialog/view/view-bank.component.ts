import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Address } from '@pages/address/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-address',
  imports: [ViewDialogComponent],
  templateUrl: './view-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAddressComponent {
  isShowDialog = model(false);
  address = input.required<Address>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.address()?.id,
      },
      {
        label: 'title',
        value: this.address()?.title,
      },
      {
        label: 'City',
        value: this.address()?.city,
      },
      {
        label: 'addressLine1',
        value: this.address()?.addressLine1,
        hasToolTip: true,
      },
      {
        label: 'addressLine2',
        value: this.address()?.addressLine2,
      },
      {
        label: 'Country',
        value: this.address()?.country,
      },
      {
        label: 'city',
        value: this.address()?.city,
      },
      {
        label: 'postalCode',
        value: this.address()?.postalCode,
      },
      {
        label: 'landmark',
        value: this.address()?.landmark,
      },
      {
        label: 'phoneNumber',
        value: this.address()?.phoneNumber,
      },
      {
        label: 'createdAt',
        value: this.address()?.createdAt,
      },
      {
        label: 'updated_at',
        value: this.address()?.updated_at,
      },
    ];
  });
}
