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
import { Book } from '@pages/books/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [ViewDialogComponent, TranslateModule],
  templateUrl: './view-book.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViewBookComponent {
  translate = inject(TranslateService);
  isShowDialog = model(false);
  book = input<Book>({} as Book);

  title = signal(this.#translate(_('Book Details')));
  data = computed(() => [
    {
      label: this.#translate(_('ID')),
      value: this.book()?.id || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Title')),
      value: this.book()?.title || '',
      type: 'text',
    },
    {
      label: this.#translate(_('Price')),
      value: this.book()?.price || '',
      type: 'text',
    },
    {
      label: this.#translate(_('SVG')),
      value: this.book()?.svg || '',
      type: 'image',
    },
    {
      label: this.#translate(_('Created At')),
      value: this.book()?.createdAt || '',
      type: 'text',
    },
  ]);

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
