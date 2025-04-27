import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Faq } from '@pages/faq/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-faq',
  imports: [ViewDialogComponent],
  templateUrl: './view-faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewFaqComponent {
  isShowDialog = model(false);
  faq = input.required<Faq>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.faq()?.id,
      },
    ];
  });
}
