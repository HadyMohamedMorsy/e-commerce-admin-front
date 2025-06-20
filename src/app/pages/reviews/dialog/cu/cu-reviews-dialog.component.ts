import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ReviewFieldsService } from '@pages/reviews/services/reviews-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { ReviewModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-review-dialog',
  imports: [FormDialogComponent],
  providers: [ReviewFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuReviewDialogComponent extends BaseCreateUpdateComponent<ReviewModel> {
  #globalList = inject(GlobalListService);
  fieldsService = inject(ReviewFieldsService);
  #list$ = of([]);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode
      ? _('Create New Review')
      : _('Update Review');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'review/store',
        update: 'review/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new ReviewModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
