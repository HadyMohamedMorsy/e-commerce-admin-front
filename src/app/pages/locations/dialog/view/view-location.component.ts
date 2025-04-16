import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Locations } from '@pages/locations/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-location',
  imports: [ViewDialogComponent],
  templateUrl: './view-location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewLocationComponent {
  isShowDialog = model(false);
  location = input.required<Locations>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.location()?.id,
      },
      {
        label: 'Created At',
        value: this.location()?.created_at,
      },
    ];
  });
}
