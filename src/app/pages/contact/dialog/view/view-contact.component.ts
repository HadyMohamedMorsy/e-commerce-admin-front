import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Contact } from '@pages/contact/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-contact',
  standalone: true,
  imports: [ViewDialogComponent],
  templateUrl: './view-contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewContactComponent {
  isShowDialog = model(false);
  contact = input.required<Contact>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.contact()?.id,
      },
    ];
  });
}
