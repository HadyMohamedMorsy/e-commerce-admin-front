import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { WishlistFieldsService } from '../services/wishlist-fields.service'; // Updated service
import { WishlistModel } from '../services/services-type'; // Updated model

@Component({
  selector: 'app-create-update-wishlist',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [WishlistFieldsService], // Updated service to WishlistFieldsService
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateWishlistComponent extends FormPageComponent {
  fieldsService = inject(WishlistFieldsService); // Inject WishlistFieldsService

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('wishlist'); // Navigate to wishlist after submit
  }

  setupForm(isUpdate: boolean) {
    // Create or update Wishlist model instead of User model
    this.model = isUpdate
      ? new WishlistModel(this.filterDataForUpdate(new WishlistModel())) // Updated to WishlistModel
      : new WishlistModel();

    // Set form title and submit label dynamically based on the action
    this.formTitle.set(isUpdate ? 'Update Wishlist' : 'Create New Wishlist');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');

    // Set the appropriate endpoint for create or update operation
    this.endpoint.set(
      isUpdate ? 'auth/wishlist/wishlist/update' : 'auth/wishlist/wishlist',
    ); // Updated endpoint for wishlist
  }
}
