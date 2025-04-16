import { inject, Injectable, signal } from '@angular/core';
import { GlobalListService } from '@gService/global-list.service';
import { _, TranslateService } from '@ngx-translate/core';
import { FieldBuilderService } from '@shared';
import { EMPTY, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipmentFieldsService {
  translate = inject(TranslateService);
  #globalList = inject(GlobalListService);
  fieldBuilder = inject(FieldBuilderService);
  pageList$ = this.#globalList.getGlobalList('shipments', { type: 'shipment' });
  isSingleUploading = signal(false);

  configureFields(editData: any) {
    return [
      this.fieldBuilder.fieldBuilder([
        {
          key: 'shipment_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Shipment Name'),
          },
        },
        {
          key: 'shipment_code',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Shipment Code'),
          },
        },
        {
          key: 'full_shipment_name',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Full Shipment Name'),
          },
          hooks: {
            onInit: (field) => {
              const shipmentNameControl =
                field?.parent?.get?.('shipment_name')?.formControl;
              const shipmentCodeControl =
                field?.parent?.get?.('shipment_code')?.formControl;
              const fullShipmentNameControl = field?.formControl;

              if (
                !shipmentNameControl ||
                !shipmentCodeControl ||
                !fullShipmentNameControl
              ) {
                return EMPTY;
              }

              const nameCodeChanges$ = merge(
                shipmentNameControl.valueChanges.pipe(
                  startWith(shipmentNameControl.value),
                ),
                shipmentCodeControl.valueChanges.pipe(
                  startWith(shipmentCodeControl.value),
                ),
              ).pipe(
                tap(() => {
                  const fullShipmentName = `${
                    shipmentNameControl.value || ''
                  } ${shipmentCodeControl.value || ''}`.trim();
                  fullShipmentNameControl.setValue(fullShipmentName, {
                    emitEvent: false,
                  });
                  field.model['full_shipment_name'] = fullShipmentName;
                }),
              );

              const fullShipmentNameChanges$ =
                fullShipmentNameControl.valueChanges.pipe(
                  startWith(fullShipmentNameControl.value),
                  tap((fullShipmentName) => {
                    const trimmedFullName = fullShipmentName?.trim();
                    let parts = trimmedFullName?.split(/\s+/);
                    if (parts && parts.length) {
                      const [shipmentName, ...shipmentCodes] = parts;
                      const shipmentCode = shipmentCodes.join(' ');

                      if (shipmentNameControl.value !== shipmentName) {
                        shipmentNameControl.setValue(shipmentName, {
                          emitEvent: false,
                        });
                        field.model['shipment_name'] = shipmentName;
                      }
                      if (shipmentCodeControl.value !== shipmentCode) {
                        shipmentCodeControl.setValue(shipmentCode, {
                          emitEvent: false,
                        });
                        field.model['shipment_code'] = shipmentCode;
                      }
                    }
                  }),
                );

              return merge(nameCodeChanges$, fullShipmentNameChanges$);
            },
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'shipment_email',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Shipment Email Address'),
          },
          validators: {
            validation: ['email'],
          },
        },
        {
          key: 'shipment_phone',
          type: 'input-field',
          className: 'md:col-4 col-12',
          props: {
            type: 'number',
            label: _('Shipment Phone Number'),
          },
        },
        {
          key: 'start_shipment_process',
          type: 'checkbox-field',
          hide: editData,
          props: {
            label: _('Start Shipment Process'),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'shipment_timezone',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            label: _('Shipment Timezone'),
            options: this.pageList$.pipe(map(({ timezones }) => timezones)),
          },
        },
        {
          key: 'shipment_role_id',
          type: 'select-field',
          className: 'md:col-4 col-12',
          props: {
            required: true,
            label: _('Shipment Role'),
            options: this.pageList$.pipe(map(({ roles }) => roles)),
          },
        },
      ]),

      this.fieldBuilder.fieldBuilder([
        {
          key: 'shipment_avatar',
          type: 'file-field',
          props: {
            label: _('Shipment Avatar'),
            mode: editData ? 'update' : 'store',
            isUploading: this.isSingleUploading,
          },
        },
      ]),
    ];
  }

  configureFieldsShipmentPassword() {
    return [
      {
        fieldGroup: [
          this.fieldBuilder.fieldBuilder([
            {
              validators: {
                validation: [
                  {
                    name: 'fieldMatch',
                    options: { errorPath: 'shipment_password_confirmation' },
                  },
                ],
              },
              fieldGroup: [
                this.fieldBuilder.fieldBuilder([
                  {
                    key: 'shipment_password',
                    type: 'password-field',
                    className: 'md:col-4 col-12',
                    props: {
                      label: _('Shipment Password'),
                      placeholder: _('Shipment Password'),
                      toggleMask: true,
                    },
                  },
                  {
                    key: 'shipment_password_confirmation',
                    type: 'password-field',
                    className: 'md:col-4 col-12',
                    props: {
                      label: _('Shipment Password Confirmation'),
                      placeholder: _('Shipment Password Confirmation'),
                      toggleMask: true,
                    },
                  },
                ]),
              ],
            },
          ]),
        ],
      },
    ];
  }
}
