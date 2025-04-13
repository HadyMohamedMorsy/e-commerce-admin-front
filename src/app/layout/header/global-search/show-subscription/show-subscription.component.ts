import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ViewSubscriptionComponent } from '@pages/subscriptions/dialog/view/view-subscription/view-subscription.component';
import { ApiService, SpinnerComponent } from '@shared';
import { filter, finalize, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-show-subscription',
  imports: [ViewSubscriptionComponent, SpinnerComponent],
  templateUrl: './show-subscription.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowSubscriptionComponent {
  #api = inject(ApiService);
  subscriptionId = input.required<number>();
  isLoading = signal(true);
  isShowDialog = model(false);

  subscription$ = toObservable(this.subscriptionId).pipe(
    filter((v) => !!v),
    tap(() => this.isLoading.set(true)),
    switchMap((id) => {
      return this.#api
        .request('post', `subscriptions/subscriptions/show`, {
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

  subscription = toSignal(this.subscription$, { initialValue: null });
}
