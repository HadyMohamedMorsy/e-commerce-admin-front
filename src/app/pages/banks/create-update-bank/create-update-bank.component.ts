import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { BankFieldsService } from '../services/bank-fields.service';
import { BankModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-bank',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [BankFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateBankComponent extends FormPageComponent {
  fieldsService = inject(BankFieldsService);

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.filtersQuery() ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('banks');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new BankModel(this.filterDataForUpdate(new BankModel()))
      : new BankModel();

    this.formTitle.set(isUpdate ? 'Update Bank' : 'Create New Bank');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'bank/update' : 'bank/store');
  }
}
