import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ViewInvoiceComponent } from '@pages/invoices/dialog/view/view-invoice/view-invoice.component';
import { ApiService, SpinnerComponent } from '@shared';
import { filter, finalize, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-show-invoice',
  imports: [ViewInvoiceComponent, SpinnerComponent],
  templateUrl: './show-invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowInvoiceComponent {
  #api = inject(ApiService);
  invoiceId = input.required<number>();
  isLoading = signal(true);
  isShowDialog = model(false);

  invoice$ = toObservable(this.invoiceId).pipe(
    filter((v) => !!v),
    tap(() => this.isLoading.set(true)),
    switchMap((id) => {
      return this.#api
        .request('post', `invoices/invoices/show`, {
          id,
          _method: 'GET',
        })
        .pipe(
          map(({ data }) => data),
          finalize(() => {
            this.isLoading.set(false);
          }),
        );
    }),
  );

  invoice = toSignal(this.invoice$, { initialValue: null });
}
