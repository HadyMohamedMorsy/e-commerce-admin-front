import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
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
    RouterLink,
    FiltersCouponsComponent,
    TooltipModule,
    TranslateModule,
    ViewCouponComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './coupons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CouponsComponent extends BaseIndexComponent<Coupon> {
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
          title: this.#translate(_('Type')),
          name: 'type',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Start Date')),
          name: 'start_date',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('End Date')),
          name: 'end_date',
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
          name: 'created_at',
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
