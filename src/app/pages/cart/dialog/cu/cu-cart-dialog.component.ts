import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { CartFieldsService } from '@pages/commerce/services/cart-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { CartModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-cart-dialog',
  imports: [FormDialogComponent],
  providers: [CartFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuCartDialogComponent extends BaseCreateUpdateComponent<CartModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(CartFieldsService);
  #list$ = this.#globalList.getGlobalList('carts');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'commerce/carts',
        update: 'commerce/carts/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Cart')),
        submitButtonLabel: this.translate.instant(_('Update Cart')),
      };
      this.model = new CartModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Cart')),
        submitButtonLabel: this.translate.instant(_('Create New Cart')),
      };
      this.model = new CartModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
