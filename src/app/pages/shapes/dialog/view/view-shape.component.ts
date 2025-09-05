import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Shape } from '../../services/services-type';

@Component({
  selector: 'app-view-shape',
  templateUrl: './view-shape.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, TranslateModule, ViewDialogComponent],
})
export class ViewShapeComponent {
  isShowDialog = model(false);
  shape = input.required<Shape>();
  #dateFormatter = new DateFormatterPipe();
  private sanitizer = inject(DomSanitizer);
  list = computed<
    { label: string; value: any; hasToolTip?: boolean; type?: string }[]
  >(() => {
    return [
      {
        label: '#ID',
        value: this.shape()?.id,
      },
      {
        label: 'Name',
        value: this.shape()?.name || this.shape()?.type,
      },
      {
        label: 'Type',
        value: this.shape()?.type,
      },
      {
        label: 'Shape Type',
        value: this.shape()?.shapeType,
      },
      {
        label: 'Color Code',
        value: this.shape()?.colorCode,
        type: 'color',
      },
      {
        label: 'SVG Image',
        value: this.shape()?.image,
        type: 'svg',
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.shape()?.createdAt,
          'relative',
        ),
      },
    ];
  });

  sanitizeHtml(html: string): SafeHtml {
    if (!html) return '';
    if (html.includes('<svg') || html.includes('</svg>')) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    return this.sanitizer.sanitize(1, html) || '';
  }
}
