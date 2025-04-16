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
  #list$ = this.#globalList.getGlobalList('coupons');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'coupon/store',
        update: 'coupon/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Coupon')),
        submitButtonLabel: this.translate.instant(_('Update Coupon')),
      };
      this.model = new CouponModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Coupon')),
        submitButtonLabel: this.translate.instant(_('Create New Coupon')),
      };
      this.model = new CouponModel();
    }

    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
