import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuWishlistDialogComponent } from '../dialog/cu/cu-wishlist-dialog.component'; // Adjusted for Wishlist Dialog
import { ViewWishlistComponent } from '../dialog/view/view-wishlist/view-wishlist.component'; // Adjusted for Wishlist View
import { FiltersWishlistComponent } from '../filters-wishlist/filters-wishlist.component'; // Adjusted for Wishlist Filters
import { Wishlist } from '../services/services-type'; // Adjusted to Wishlist type
import { EllipsisActionComponent } from './ellipsis-action/ellipsis-action.component';

@Component({
  selector: 'app-wishlists', // Adjusted component name
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersWishlistComponent, // Adjusted for Wishlist Filters
    TooltipModule,
    TranslateModule,
    EllipsisActionComponent,
    ViewWishlistComponent, // Adjusted for Wishlist View
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './wishlists.component.html', // Adjusted template name
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WishlistsComponent extends BaseIndexComponent<Wishlist> {
  // Adjusted to Wishlist type
  owner = viewChild.required<TemplateRef<any>>('owner');
  fullName = viewChild.required<TemplateRef<any>>('fullName');

  hasAnyRoleListSubscriptionUser() {
    return this.userRoles.hasAnyRole([
      '8x-owner',
      '8x-admin-assistant',
      '8x-cs-manager',
      '8x-cs-team-leader',
      '8x-customer-success',
      '8x-renewals-manager',
      'wishlist-owner', // Adjusted role for wishlist
      'wishlist-delegated-person', // Adjusted role for wishlist
    ]);
  }

  ngOnInit() {
    this.dialogComponent = CuWishlistDialogComponent; // Adjusted for Wishlist Dialog
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/wishlist/wishlist', // Adjusted API endpoint for wishlist
        delete: 'auth/wishlist/wishlist/delete', // Adjusted API endpoint for wishlist delete
      },
      navigateCreatePage: 'new-wishlist', // Adjusted to wishlist creation
      displayViewButton: true,
      indexTitle: this.#translate(_('Wishlists')), // Adjusted translation
      indexIcon: 'pi pi-list', // Adjusted icon for wishlist
      createBtnLabel: this.#translate(_('Create Wishlist')), // Adjusted translation
      indexTableKey: 'WISHLISTS_KEY', // Adjusted key for wishlist
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
          render: this.fullName(),
        },
        {
          title: this.#translate(_('Email Address')),
          name: `email`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Is Owner')),
          name: `is_owner`,
          searchable: false,
          orderable: false,
          render: this.owner(),
        },
        {
          title: this.#translate(_('Created At')),
          name: 'created_at',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.filtersData.update((filters) => ({
      ...filters,
      type: 'wishlist', // Adjusted filter type to wishlist
    }));

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
