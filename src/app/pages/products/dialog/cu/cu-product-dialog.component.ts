import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ProductFieldsService } from '@pages/products/services/product-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { ProductModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-product-dialog',
  imports: [FormDialogComponent],
  providers: [ProductFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuProductDialogComponent extends BaseCreateUpdateComponent<ProductModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(ProductFieldsService);
  #list$ = this.#globalList.getGlobalList('product');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Product')
      : _('Update Product');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'product/store',
        update: 'product/update',
      },
      dialogTitle,
      submitButtonLabel,
    };
    
    const model = {
      ...this.editData,
      ...(!isCreateMode && {
        categoryIds: this.editData.categories.map(
          (category: any) => category.id,
        ),
      }),
    };

    this.model = new ProductModel(model);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
