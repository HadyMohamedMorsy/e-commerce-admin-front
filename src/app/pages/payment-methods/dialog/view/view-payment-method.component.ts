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
import { PaymentMethod } from '@pages/payment-methods/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-payment-method',
  imports: [ViewDialogComponent, TranslateModule],
  templateUrl: './view-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPaymentMethodComponent {
  translate = inject(TranslateService);
  isShowDialog = model(false);
  paymentMethod = input<PaymentMethod>({} as PaymentMethod);

  title = signal(this.#translate(_('Payment Method Details')));
  data = computed(() => [
    {
      label: this.#translate(_('ID')),
      value: '',
      type: 'text',
    },
    {
      label: this.#translate(_('Name')),
      value: '',
      type: 'text',
    },
    {
      label: this.#translate(_('Slug')),
      value: '',
      type: 'text',
    },
    {
      label: this.#translate(_('Icon')),
      value: '',
      type: 'image',
    },
    {
      label: this.#translate(_('Created At')),
      value: '',
      type: 'text',
    },
  ]);

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
