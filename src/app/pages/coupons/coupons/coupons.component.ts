import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { CuCouponDialogComponent } from '../dialog/cu/cu-coupons-dialog.component';
import { ViewCouponComponent } from '../dialog/view/view-coupons.component';
import { FiltersCouponsComponent } from '../filters-coupons/filters-coupons.component';
import { Coupon } from '../services/services-type';

@Component({
  selector: 'app-coupons',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    FiltersCouponsComponent,
    TooltipModule,
    TranslateModule,
    ViewCouponComponent,
    MenuModule,
    Dialog,
    TranslateModule,
    FormsModule,
    ToggleSwitchModule,
  ],
  templateUrl: './coupons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CouponsComponent extends BaseIndexComponent<Coupon> {
  isActive = viewChild.required<TemplateRef<any>>('isActive');
  ngOnInit() {
    this.dialogComponent = CuCouponDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'coupon/index',
        delete: 'coupon/delete',
      },
      navigateCreatePage: 'new-coupon',
      displayViewButton: true,
      indexTitle: this.#translate(_('Coupons')),
      indexIcon: 'pi pi-tag',
      createBtnLabel: this.#translate(_('Create Coupon')),
      indexTableKey: 'COUPONS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: 'id',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Code')),
          name: 'code',
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Discount')),
          name: 'discount',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Coupon Type')),
          name: 'couponType',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('expiry Date')),
          name: 'expiryDate',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('min Order Total Price')),
          name: 'minOrderTotalPrice',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('min Order Item Count')),
          name: 'minOrderItemCount',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Number of Users')),
          name: 'numberOfUsers',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('isActive')),
          name: 'isActive',
          searchable: false,
          orderable: false,
          render: this.isActive(),
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };
    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
