import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { CouponFieldsService } from '../services/coupons-fields.service';
import { CouponModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-coupon',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [CouponFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateCouponComponent extends FormPageComponent {
  fieldsService = inject(CouponFieldsService);

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('coupons');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new CouponModel(this.filterDataForUpdate(new CouponModel()))
      : new CouponModel();

    this.formTitle.set(isUpdate ? 'Update Coupon' : 'Create New Coupon');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'coupon/update' : 'coupon/store');
  }
}
