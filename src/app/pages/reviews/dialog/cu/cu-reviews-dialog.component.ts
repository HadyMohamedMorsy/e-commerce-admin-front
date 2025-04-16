import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { ReviewFieldsService } from '@pages/reviews/services/reviews-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
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
  #auth = inject(AuthService);
  fieldsService = inject(ReviewFieldsService);
  #list$ = this.#globalList.getGlobalList('reviews');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'review/store',
        update: 'review/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Review')),
        submitButtonLabel: this.translate.instant(_('Update Review')),
      };
      this.model = new ReviewModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Review')),
        submitButtonLabel: this.translate.instant(_('Create New Review')),
      };
      this.model = new ReviewModel();
    }

    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
