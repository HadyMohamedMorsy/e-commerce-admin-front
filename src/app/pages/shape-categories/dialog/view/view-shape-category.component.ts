import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ShapeCategory } from '@pages/shape-categories/services/services-type';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-shape-category',
  templateUrl: './view-shape-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, TranslateModule, ViewDialogComponent],
})
export class ViewShapeCategoryComponent {
  isShowDialog = model(false);
  shapeCategory = input.required<ShapeCategory>();
  #dateFormatter = new DateFormatterPipe();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.shapeCategory()?.id,
      },
      {
        label: 'Type',
        value: this.shapeCategory()?.type,
      },
      {
        label: 'Name',
        value: this.shapeCategory()?.name,
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.shapeCategory()?.createdAt,
          'relative',
        ),
      },
    ];
  });
}
