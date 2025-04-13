import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { CustomersFieldsService } from '@pages/users/services/customers-fields.service';
import { UserFieldsService } from '@pages/users/services/users-fields.service';
import { AuthService, BaseCreateUpdateComponent, User } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { UserModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-customer-dialog',
  imports: [FormDialogComponent],
  providers: [CustomersFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuUserDialogComponent extends BaseCreateUpdateComponent<UserModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(UserFieldsService);
  #list$ = this.#globalList.getGlobalList('users');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'auth/users/user',
        update: 'auth/users/user/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update User')),
        submitButtonLabel: this.translate.instant(_('Update User')),
      };
      this.model = new UserModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New User')),
        submitButtonLabel: this.translate.instant(_('Create New User')),
      };
      this.model = new UserModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }

  override updateUi(model: UserModel) {
    const isCurrentUser = this.#auth.currentUser()?.id === model.id;
    if (isCurrentUser) {
      const updateModel = { ...this.#auth.currentUser(), ...model } as User;
      this.#auth.setCurrentUser(updateModel);
    }
  }
}
