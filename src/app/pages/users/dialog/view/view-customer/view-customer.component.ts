import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Customer } from '@pages/users/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-customer',
  imports: [ViewDialogComponent],
  templateUrl: './view-customer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCustomerComponent {
  isShowDialog = model(false);
  customer = input.required<Customer>();
  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.customer()?.id,
      },
      {
        label: 'first Name',
        value: this.customer()?.first_name,
      },
      {
        label: 'last Name',
        value: this.customer()?.last_name,
      },
      {
        label: 'Full Name',
        value: this.customer()?.full_name,
        hasToolTip: true,
      },
      {
        label: 'Role',
        value: this.customer()?.role?.name_en,
      },
      {
        label: 'email',
        value: this.customer()?.email,
        hasToolTip: true,
      },
      {
        label: 'phone',
        value: this.customer()?.phone,
      },
      {
        label: 'Passport Number',
        value: this.customer()?.passport_number,
      },
      {
        label: 'national number',
        value: this.customer()?.national_number,
      },
      {
        label: 'timezone',
        value: this.customer()?.timezone,
      },
      {
        label: 'created at',
        value: this.customer()?.created_at,
      },
    ];
  });
}
