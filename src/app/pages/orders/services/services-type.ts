export interface Order {
  id: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export class OrderModel {
  id: number | null;
  total: number | null;
  constructor(data?: OrderModel) {
    this.id = data?.id || null;
    this.total = data?.total || null;
  }
}
