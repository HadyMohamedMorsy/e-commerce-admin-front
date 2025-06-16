import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { ReviewFieldsService } from '../services/reviews-fields.service';
import { ReviewModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-review',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [ReviewFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateReviewComponent extends FormPageComponent {
  fieldsService = inject(ReviewFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method === 'create';
    isCreate ? this.setupForm(false) : this.setupForm(true);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('reviews');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new ReviewModel(this.filterDataForUpdate(new ReviewModel()))
      : new ReviewModel({
          productId: this.#queryData.productId,
          reviewable_type: 'product',
          isApproved: true,
        } as ReviewModel);

    this.formTitle.set(isUpdate ? 'Update Review' : 'Create New Review');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'review/update' : 'review/store');
  }
}
