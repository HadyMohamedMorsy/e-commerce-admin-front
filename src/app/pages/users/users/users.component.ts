import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ChangePasswordDialogComponent } from '../dialog/cu/change-password-dialog.component';
import { CuUserDialogComponent } from '../dialog/cu/cu-user-dialog.component';
import { ViewUserComponent } from '../dialog/view/view-user/view-user.component';
import { FiltersUsersComponent } from '../filters-users/filters-users.component';
import { UserList } from '../services/services-type';

@Component({
  selector: 'app-users',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    FiltersUsersComponent,
    TooltipModule,
    TranslateModule,
    ViewUserComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent extends BaseIndexComponent<UserList> {
  fullName = viewChild.required<TemplateRef<any>>('fullName');

  ngOnInit() {
    this.dialogComponent = CuUserDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/users/user',
        delete: 'auth/users/user/delete',
      },
      navigateCreatePage: 'new-user',
      displayViewButton: true,
      indexTitle: this.#translate(_('Users')),
      indexIcon: 'pi pi-users',
      createBtnLabel: this.#translate(_('Create User')),
      indexTableKey: 'USER_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Full Name')),
          name: `full_name`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Email Address')),
          name: `email`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('created at')),
          name: 'created_at',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.initRolesUser();

    this.filtersData.update((filters) => ({
      ...filters,
      type: 'user',
    }));
  }

  openChangePassword(userId: number) {
    const data = { id: userId, method: 'create' };
    const dialogConfig = { ...this.dialogConfig, data, width: '800px' };
    this.dialogRef = this.dialogService.open(
      ChangePasswordDialogComponent,
      dialogConfig,
    );
    this.dialogRef?.onClose
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((record) => {
        this.updateRecord(record);
      });
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
