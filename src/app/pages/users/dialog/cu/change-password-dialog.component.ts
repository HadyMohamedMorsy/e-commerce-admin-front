import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { _ } from '@ngx-translate/core';
import { UserFieldsService } from '@pages/users/services/users-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { UserModel } from '../../services/services-type';

@Component({
  selector: 'app-change-password-dialog',
  imports: [FormDialogComponent],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordDialogComponent extends BaseCreateUpdateComponent<UserModel> {
  fieldsService = inject(UserFieldsService);

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      endpoints: {
        store: 'auth/users/update/password',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Password')),
        submitButtonLabel: this.translate.instant(_('Update Password')),
      };
      this.model = new UserModel(this.editData);
    }
    this.fields = this.fieldsService.configureFieldsUsersPassword();
  }
}
