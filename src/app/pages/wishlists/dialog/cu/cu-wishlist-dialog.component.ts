import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { WishlistFieldsService } from '@pages/wishlist/services/wishlist-fields.service'; // Updated to Wishlist service
import { AuthService, BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { WishlistModel } from '../../services/services-type'; // Updated to WishlistModel

@Component({
  selector: 'app-cu-wishlist-dialog',
  imports: [FormDialogComponent],
  providers: [WishlistFieldsService], // Use WishlistFieldsService
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuWishlistDialogComponent extends BaseCreateUpdateComponent<WishlistModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(WishlistFieldsService); // Inject WishlistFieldsService
  #list$ = this.#globalList.getGlobalList('wishlist'); // Adjusted to 'wishlist'

  ngOnInit() {
    // Set up dialog metadata for wishlist creation or update
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'auth/wishlist/wishlist', // Adjusted API endpoint for wishlist
        update: 'auth/wishlist/wishlist/update', // Adjusted API endpoint for wishlist update
      },
    };

    if (this.editData) {
      // If editing an existing wishlist
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Wishlist')),
        submitButtonLabel: this.translate.instant(_('Update Wishlist')),
      };
      this.model = new WishlistModel(this.editData);
    } else {
      // If creating a new wishlist
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Wishlist')),
        submitButtonLabel: this.translate.instant(_('Create New Wishlist')),
      };
      this.model = new WishlistModel();
    }

    // Configure fields for the form (specific to wishlist)
    this.fields = this.fieldsService.configureFields(this.editData);
  }

  override updateUi(model: WishlistModel) {
    // Check if the wishlist being updated is associated with the current user
    const isCurrentUserWishlist = this.#auth.currentUser()?.id === model.userId; // Assuming the WishlistModel has a userId property
    if (isCurrentUserWishlist) {
      const updatedWishlist = { ...model }; // Assuming you may need to update the wishlist in the auth context
      this.#auth.setWishlist(updatedWishlist); // Assuming setWishlist exists in AuthService
    }
  }
}
