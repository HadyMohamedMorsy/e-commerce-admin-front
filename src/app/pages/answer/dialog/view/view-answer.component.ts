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
import { Answer } from '@pages/answer/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-answer',
  standalone: true,
  imports: [ViewDialogComponent, TranslateModule],
  templateUrl: './view-answer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViewAnswerComponent {
  translate = inject(TranslateService);
  isShowDialog = model(false);
  answer = input<Answer>({} as Answer);

  title = signal(this.#translate(_('Answer Details')));
  data = computed(() => [
    {
      label: this.#translate(_('ID')),
      value: this.answer()?.id || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Answer Text')),
      value: this.answer()?.answerText || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Question ID')),
      value: this.answer()?.questionId || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Book ID')),
      value: this.answer()?.bookId || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Created At')),
      value: this.answer()?.createdAt || '',
      type: 'text',
    },
  ]);

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
