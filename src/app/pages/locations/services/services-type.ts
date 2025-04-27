export interface Locations {
  id: number;
  name: string;
  created_at: string;
}

export class LocationModel {
  id?: number | null;
  parentId: number | null;
  name: string | null;

  constructor(data?: LocationModel) {
    this.id = data?.id ?? null;
    this.parentId = data?.parentId ?? null;
    this.name = data?.name ?? null;
  }
}
