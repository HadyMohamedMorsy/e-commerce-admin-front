import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { _ } from '@ngx-translate/core';
import { BlogFieldsService } from '@pages/blogs/services/blog-fields.service';
import { BaseCreateUpdateComponent } from '@shared';
import { of } from 'rxjs';
import { FormDialogComponent } from 'src/app/shared/components/base-create-update/form-dialog/form-dialog.component';
import { BlogModel } from '../../services/services-type';

@Component({
  selector: 'app-cu-blog-dialog',
  standalone: true,
  imports: [FormDialogComponent],
  providers: [BlogFieldsService],
  templateUrl:
    '../../../../shared/components/base-create-update/base-create-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuBlogDialogComponent extends BaseCreateUpdateComponent<BlogModel> {
  fieldsService = inject(BlogFieldsService);
  #list$ = of(1);

  ngOnInit() {
    const isCreateMode = !this.editData || this.editData.method === 'create';
    const dialogTitle = isCreateMode ? _('Create New Blog') : _('Update Blog');
    const submitButtonLabel = isCreateMode ? _('create') : _('update');

    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'blog/store',
        update: 'blog/update',
      },
      dialogTitle,
      submitButtonLabel,
    };

    this.model = new BlogModel(this.editData);
    this.fields = this.fieldsService.configureFields(this.editData);
  }
}
