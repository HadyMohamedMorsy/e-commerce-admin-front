import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { CustomersFieldsService } from '../services/customers-fields.service';
import { UserModel } from '../services/services-type';
import { UserFieldsService } from '../services/wishlist-fields.service';

@Component({
  selector: 'app-create-update-wishlist',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [CustomersFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateWishlistComponent extends FormPageComponent {
  fieldsService = inject(UserFieldsService);

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('wishlist');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new UserModel(this.filterDataForUpdate(new UserModel()))
      : new UserModel();

    this.formTitle.set(isUpdate ? 'Update wishlist' : 'Create New wishlist');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'auth/users/user/update' : 'auth/users/user');
  }
}
