import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { CategoriesFieldsService } from '@pages/categories/services/categories-fields.service'; // adjust path as needed
import { AuthService, BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { CategoryModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-category-dialog',
  imports: [FormDialogComponent],
  providers: [CategoriesFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuCategoryDialogComponent extends BaseCreateUpdateComponent<CategoryModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(CategoriesFieldsService);
  #list$ = this.#globalList.getGlobalList('categories');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'auth/categories/create',
        update: 'auth/categories/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Category')),
        submitButtonLabel: this.translate.instant(_('Update Category')),
      };
      this.model = new CategoryModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Category')),
        submitButtonLabel: this.translate.instant(_('Create New Category')),
      };
      this.model = new CategoryModel();
    }

    this.fields = this.fieldsService.configureFields(this.editData);
  }

  // Optional: update auth context if categories are somehow tied to the user session
  override updateUi(model: CategoryModel) {
    // No currentUser update logic unless needed for categories
  }
}
