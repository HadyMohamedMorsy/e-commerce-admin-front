import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import ViewQuizComponent from '../dialog/view/view-quiz.component';
import { Quiz } from '../services/services-type';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    ViewQuizComponent,
    TranslateModule,
    MenuModule,
    TranslateModule,
    Dialog,
  ],
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class QuizComponent extends BaseIndexComponent<Quiz> {
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'quiz/index',
        delete: 'quiz/delete',
      },
      navigateCreatePage: 'new-quiz',
      displayViewButton: true,
      displayFilterButton: false,
      indexTitle: this.#translate(_('Quiz')),
      indexIcon: 'pi pi-question-circle',
      createBtnLabel: this.#translate(_('Create Quiz')),
      indexTableKey: 'QUIZ_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Question Type')),
          name: `questionType`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Question')),
          name: `question`,
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
