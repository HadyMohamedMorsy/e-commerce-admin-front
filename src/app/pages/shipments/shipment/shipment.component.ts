import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuShipmentDialogComponent } from '../dialog/cu/cu-shipment-dialog.component';
import { ViewShipmentComponent } from '../dialog/view/view-shipment.component';
import { Shipment } from '../services/services-type';

@Component({
  selector: 'app-shipments',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    ViewShipmentComponent,
    TooltipModule,
    TranslateModule,

    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './shipment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShipmentsComponent extends BaseIndexComponent<Shipment> {
  ngOnInit() {
    this.dialogComponent = CuShipmentDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'shipment/index',
        delete: 'shipment/delete',
      },
      navigateCreatePage: 'new-shipment',
      displayViewButton: true,
      indexTitle: this.#translate(_('Shipments')),
      indexIcon: 'pi pi-box',
      createBtnLabel: this.#translate(_('Create Shipment')),
      indexTableKey: 'SHIPMENTS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('type')),
          name: `type`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('kg Price')),
          name: `kgPrice`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('shipment Price')),
          name: `shipmentPrice`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('location')),
          name: `location.name`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
