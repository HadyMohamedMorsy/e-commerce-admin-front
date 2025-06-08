import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ProductSkuFieldsService } from '@pages/products/services/product-sku-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { ProductSkuModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-product-sku-dialog',
  imports: [FormDialogComponent],
  providers: [ProductSkuFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuProductSkuDialogComponent extends BaseCreateUpdateComponent<ProductSkuModel> {
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(ProductSkuFieldsService);
  #list$ = this.#globalList.getGlobalList('product');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Product SKU')
      : _('Update Product SKU');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'product-sku/store',
        update: 'product-sku/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    const model = {
      ...this.editData,
      ...(!isCreateMode && {
        productId: this.editData.product.id,
      }),
    };

    this.model = new ProductSkuModel(model);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
