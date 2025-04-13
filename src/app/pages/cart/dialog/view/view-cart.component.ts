import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { UserList } from '@pages/users/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-user',
  imports: [ViewDialogComponent],
  templateUrl: './view-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewUserComponent {
  isShowDialog = model(false);
  user = input.required<UserList>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.user()?.id,
      },
      {
        label: 'first Name',
        value: this.user()?.first_name,
      },
      {
        label: 'last Name',
        value: this.user()?.last_name,
      },
      {
        label: 'Full Name',
        value: this.user()?.full_name,
        hasToolTip: true,
      },
      {
        label: 'Role',
        value: this.user()?.role?.name_en,
      },
      {
        label: 'email',
        value: this.user()?.email,
        hasToolTip: true,
      },
      {
        label: 'phone',
        value: this.user()?.phone,
      },
      {
        label: 'timezone',
        value: this.user()?.timezone,
      },
      {
        label: 'created at',
        value: this.user()?.created_at,
      },
    ];
  });
}
