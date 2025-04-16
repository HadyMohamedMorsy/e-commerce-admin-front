import { Locations } from '@pages/locations/services/services-type';

export interface Shipment {
  id?: number;
  type: 'item' | 'weight';
  is_active: boolean;
  kg_price: number;
  shipment_price: number;
  location: Locations;
}

export class ShipmentModel {
  id?: number | null;
  type: 'item' | 'weight';
  is_active: boolean;
  kg_price: number | null;
  shipment_price: number | null;
  location_id: number | null;

  constructor(data?: ShipmentModel) {
    this.id = data?.id || null;
    this.type = data?.type || 'item';
    this.is_active = data?.is_active ?? false;
    this.kg_price = data?.kg_price || null;
    this.shipment_price = data?.shipment_price || null;
    this.location_id = data?.location_id || null;
  }
}
