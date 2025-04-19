import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { FaqFieldsService } from '../services/faq-fields.service';
import { faqModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-faq',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [FaqFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateFaqComponent extends FormPageComponent {
  fieldsService = inject(FaqFieldsService);

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('faqs');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new faqModel(this.filterDataForUpdate(new faqModel()))
      : new faqModel();

    this.formTitle.set(isUpdate ? 'Update FAQ' : 'Create New FAQ');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'faq/update' : 'faq/store');
  }
}
