export interface Locations {
  id: number;
  name: string;
  created_at: string;
}

export class LocationModel {
  id?: number | null;
  location_id: number | null;
  name: string | null;

  constructor(data?: LocationModel) {
    this.id = data?.id ?? null;
    this.location_id = data?.location_id ?? null;
    this.name = data?.name ?? null;
  }
}
