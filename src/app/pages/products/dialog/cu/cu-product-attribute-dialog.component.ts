import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ProductAttributeFieldsService } from '@pages/products/services/product-attribute-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { ProductAttributeModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-product-attribute-dialog',
  imports: [FormDialogComponent],
  providers: [ProductAttributeFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuProductAttributeDialogComponent extends BaseCreateUpdateComponent<ProductAttributeModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(ProductAttributeFieldsService);
  #list$ = this.#globalList.getGlobalList('product-attributes');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Product Attribute')
      : _('Update Product Attribute');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'product-attribute/store',
        update: 'product-attribute/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new ProductAttributeModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
