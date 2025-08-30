import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Quiz } from '@pages/quiz/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-quiz',
  standalone: true,
  imports: [ViewDialogComponent, TranslateModule],
  templateUrl: './view-quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViewQuizComponent {
  translate = inject(TranslateService);
  isShowDialog = model(false);
  quiz = input<Quiz>({} as Quiz);

  title = signal(this.#translate(_('Quiz Details')));
  data = computed(() => [
    {
      label: this.#translate(_('ID')),
      value: this.quiz()?.id || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Question')),
      value: this.quiz()?.question || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Created At')),
      value: this.quiz()?.createdAt || '',
      type: 'text',
    },
  ]);

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
