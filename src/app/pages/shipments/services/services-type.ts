import { Locations } from '@pages/locations/services/services-type';

export interface Shipment {
  id?: number;
  type: 'item' | 'weight';
  kg_price: number;
  shipment_price: number;
  location: Locations;
}

export class ShipmentModel {
  id?: number | null;
  type: 'item' | 'weight';
  kgPrice: number | null;
  shipmentPrice: number | null;
  locationId: number | null;

  constructor(data?: ShipmentModel) {
    this.id = data?.id || null;
    this.type = data?.type || 'item';
    this.kgPrice = data?.kgPrice || null;
    this.shipmentPrice = data?.shipmentPrice || null;
    this.locationId = data?.locationId || null;
  }
}
