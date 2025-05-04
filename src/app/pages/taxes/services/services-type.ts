export interface Tax {
  id?: number;
  name: string;
  rate: number;
  location: string;
  isActive: boolean;
  createdAt: string;
}

export class TaxModel {
  id?: number | null;
  name: string | null;
  rate: number | null;
  locationId: number | null;
  isActive: boolean;

  constructor(data?: TaxModel) {
    this.id = data?.id || null;
    this.name = data?.name || null;
    this.rate = data?.rate || null;
    this.locationId = data?.locationId || null;
    this.isActive = data?.isActive ?? true;
  }
}
