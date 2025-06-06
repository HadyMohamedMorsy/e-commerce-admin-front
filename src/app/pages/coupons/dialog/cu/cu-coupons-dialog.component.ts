import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { CouponFieldsService } from '@pages/coupons/services/coupons-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { CouponModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-coupon-dialog',
  imports: [FormDialogComponent],
  providers: [CouponFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuCouponDialogComponent extends BaseCreateUpdateComponent<CouponModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(CouponFieldsService);
  #list$ = this.#globalList.getGlobalList('coupon');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Coupon')
      : _('Update Coupon');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'coupon/store',
        update: 'coupon/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new CouponModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
