import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { BookFieldsService } from '../../services/book-fields.service';
import { BookModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-book-dialog',
  imports: [FormDialogComponent],
  providers: [BookFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CuBookDialogComponent extends BaseCreateUpdateComponent<BookModel> {
  private bookFieldsService = inject(BookFieldsService);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode ? _('Create New Book') : _('Update Book');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: of(1),
      endpoints: {
        store: 'books/store',
        update: 'books/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new BookModel(this.editData);
    this.fields = this.bookFieldsService.configureFields(this.editData);
  }
}
