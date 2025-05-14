import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Locations } from '@pages/locations/services/services-type';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-location',
  imports: [ViewDialogComponent],
  templateUrl: './view-location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewLocationComponent {
  isShowDialog = model(false);
  location = input.required<Locations>();
  #dateFormatter = new DateFormatterPipe();
  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.location()?.id,
      },
      {
        label: 'Name',
        value: this.location()?.name,
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.location()?.created_at,
          'relative',
        ),
      },
    ];
  });
}
