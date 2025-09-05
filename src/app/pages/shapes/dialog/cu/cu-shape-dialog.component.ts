import { Quiz } from './../../../quiz/services/services-type';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ShapeFieldsService } from '@pages/shapes/services/shape-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { ShapeModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-shape-dialog',
  imports: [FormDialogComponent],
  providers: [ShapeFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuShapeDialogComponent extends BaseCreateUpdateComponent<ShapeModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(ShapeFieldsService);
  #list$ = this.#globalList.getGlobalList('quiz');

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Shape')
      : _('Update Shape');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'shapes/store',
        update: 'shapes/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new ShapeModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
