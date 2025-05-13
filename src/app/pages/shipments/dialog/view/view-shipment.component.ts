import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { Shipment } from '@pages/shipments/services/services-type';
import { ViewDialogComponent } from '@shared';

@Component({
  selector: 'app-view-shipment',
  imports: [ViewDialogComponent],
  templateUrl: './view-shipment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewShipmentComponent {
  isShowDialog = model(false);
  shipment = input.required<Shipment>();

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.shipment()?.id,
      },
      {
        label: 'shipment price',
        value: this.shipment()?.shipment_price,
      },
      {
        label: 'Location',
        value: this.shipment()?.location?.name,
      },
      {
        label: 'Type',
        value: this.shipment()?.type,
      },
    ];
  });
}
