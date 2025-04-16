import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _ } from '@ngx-translate/core';
import { BlogFieldsService } from '@pages/blogs/services/blog-fields.service';
import { AuthService, BaseCreateUpdateComponent } from '@shared';
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
  #globalList = inject(GlobalListService);
  #auth = inject(AuthService);
  fieldsService = inject(BlogFieldsService);
  #list$ = this.#globalList.getGlobalList('blogs');

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      dialogData$: this.#list$,
      endpoints: {
        store: 'blog/store',
        update: 'blog/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Blog')),
        submitButtonLabel: this.translate.instant(_('Update Blog')),
      };
      this.model = new BlogModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create New Blog')),
        submitButtonLabel: this.translate.instant(_('Create New Blog')),
      };
      this.model = new BlogModel();
    }

    this.fields = this.fieldsService.configureFields(this.editData);
  }

  override updateUi(model: BlogModel) {
    // Optional: update UI state if needed
  }
}
