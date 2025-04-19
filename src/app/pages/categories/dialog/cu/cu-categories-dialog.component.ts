import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { CategoryFieldsService } from '@pages/categories/services/categories-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { CategoryModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-category-dialog',
  imports: [FormDialogComponent],
  providers: [CategoryFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuCategoryDialogComponent extends BaseCreateUpdateComponent<CategoryModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(CategoryFieldsService);
  #list$ = this.#globalList.getGlobalList('categories');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Category')
      : _('Update Category');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'category/store',
        update: 'category/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new CategoryModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
