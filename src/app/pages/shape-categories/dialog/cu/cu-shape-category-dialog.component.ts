import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ShapeCategoryModel } from '@pages/shape-categories/services/services-type';
import { ShapeCategoryFieldsService } from '@pages/shape-categories/services/shape-category-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';

@Component({
  selector: 'app-cu-shape-category-dialog',
  imports: [FormDialogComponent],
  providers: [ShapeCategoryFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuShapeCategoryDialogComponent extends BaseCreateUpdateComponent<ShapeCategoryModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(ShapeCategoryFieldsService);
  #list$ = this.#globalList.getGlobalList('shapeCategoryType');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Shape Category')
      : _('Update Shape Category');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'shape-categories/store',
        update: 'shape-categories/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new ShapeCategoryModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
