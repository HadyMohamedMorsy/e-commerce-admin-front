import { Locations } from '@pages/locations/services/services-type';

export interface Shipment {
  id?: number;
  type: 'item' | 'weight';
  shipment_price: number;
  location: Locations;
}

export class ShipmentModel {
  id?: number | null;
  type: 'item' | 'weight';
  shipmentPrice: number | null;
  locationId: number | null;

  constructor(data?: ShipmentModel) {
    this.id = data?.id || null;
    this.type = data?.type || 'item';
    this.shipmentPrice = data?.shipmentPrice || null;
    this.locationId = data?.locationId || null;
  }
}
