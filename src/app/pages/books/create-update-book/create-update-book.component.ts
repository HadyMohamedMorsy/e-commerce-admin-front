import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@shared';
import { map } from 'rxjs';
import { FormPageComponent } from 'src/app/shared/components/form-page/form-page.component';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { BookFieldsService } from '../services/book-fields.service';
import { BookModel } from '../services/services-type';

@Component({
  selector: 'app-create-update-book',
  imports: [AsyncPipe, FormComponent, SpinnerComponent],
  templateUrl: '../../../shared/components/form-page/form-page.component.html',
  providers: [BookFieldsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUpdateBookComponent extends FormPageComponent {
  fieldsService = inject(BookFieldsService);
  #queryData = {} as { [key: string]: any };

  ngOnInit() {
    this.pageList$ = this.fieldsService.pageList$;
    this.#queryData = JSON.parse(this.filtersQuery() || '{}');
    const isCreate = this.filtersQuery() && this.#queryData.method !== 'create';
    isCreate ? this.setupForm(true) : this.setupForm(false);
    this.fields.set(this.fieldsService.configureFields(this.filtersQuery()));
    this.navigateAfterSubmit.set('books');
  }

  setupForm(isUpdate: boolean) {
    this.model = isUpdate
      ? new BookModel(this.filterDataForUpdate(new BookModel()))
      : new BookModel({} as BookModel);

    this.formTitle.set(isUpdate ? 'Update Book' : 'Create New Book');
    this.submitLabel.set(isUpdate ? 'Update' : 'Create');
    this.endpoint.set(isUpdate ? 'books/update' : 'books/store');
  }
}
