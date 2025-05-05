import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ProductFieldsService } from '@pages/products/services/product-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
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
  #auth = inject(AuthService);
  fieldsService = inject(ProductFieldsService);
  #list$ = this.#globalList.getGlobalList('product');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'product/store',
        update: 'product/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Product')),
        submitButtonLabel: this.translate.instant(_('Update Product')),
      };
      this.model = new ProductModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Product')),
        submitButtonLabel: this.translate.instant(_('Create New Product')),
      };
      this.model = new ProductModel();
    }
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
