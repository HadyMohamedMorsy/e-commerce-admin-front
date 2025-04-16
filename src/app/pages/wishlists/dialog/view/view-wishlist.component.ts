import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Wishlist } from '@pages/wishlists/services/services-type';
import { ViewDialogComponent } from 'src/app/shared/components/view-dialog/view-dialog.component';

@Component({
  selector: 'app-view-wishlist',
  imports: [ViewDialogComponent],
  templateUrl: './view-wishlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewWishlistComponent {
  isShowDialog = model(false);
  wishlist = input.required<Wishlist>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.wishlist()?.id,
      },
    ];
  });
}
