import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
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
  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.shape()?.id,
      },
      {
        label: 'Name',
        value: this.shape()?.type,
      },
      {
        label: 'Image',
        value: this.shape()?.image,
        type: 'image',
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
}
