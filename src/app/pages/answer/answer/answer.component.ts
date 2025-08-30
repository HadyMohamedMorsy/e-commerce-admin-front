import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import CuAnswerDialogComponent from '../dialog/cu/cu-answer-dialog.component';
import ViewAnswerComponent from '../dialog/view/view-answer.component';
import { Answer } from '../services/services-type';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    MenuModule,
    TranslateModule,
    ViewAnswerComponent,
    Dialog,
  ],
  templateUrl: './answer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnswerComponent extends BaseIndexComponent<Answer> {
  ngOnInit() {
    this.dialogComponent = CuAnswerDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'answer/index',
        delete: 'answer/delete',
      },
      navigateCreatePage: 'new-answer',
      displayViewButton: true,
      indexTitle: this.#translate(_('Answers')),
      indexIcon: 'pi pi-comments',
      createBtnLabel: this.#translate(_('Create Answer')),
      indexTableKey: 'ANSWERS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Answer Text')),
          name: `answerText`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };
    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
