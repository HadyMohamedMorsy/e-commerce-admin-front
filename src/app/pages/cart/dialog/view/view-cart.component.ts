import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { UserList } from '@pages/users/services/services-type'; // Consider renaming this type if needed
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-cart', // updated selector
  imports: [ViewDialogComponent],
  templateUrl: './view-cart.component.html', // updated template file (make sure you rename it)
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCartComponent {
  isShowDialog = model(false);
  cart = input.required<UserList>(); // renamed input to 'cart'

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.cart()?.id,
      },
      {
        label: 'first Name',
        value: this.cart()?.first_name,
      },
      {
        label: 'last Name',
        value: this.cart()?.last_name,
      },
      {
        label: 'Full Name',
        value: this.cart()?.full_name,
        hasToolTip: true,
      },
      {
        label: 'Role',
        value: this.cart()?.role?.name_en,
      },
      {
        label: 'email',
        value: this.cart()?.email,
        hasToolTip: true,
      },
      {
        label: 'phone',
        value: this.cart()?.phone,
      },
      {
        label: 'timezone',
        value: this.cart()?.timezone,
      },
      {
        label: 'created at',
        value: this.cart()?.created_at,
      },
    ];
  });
}
