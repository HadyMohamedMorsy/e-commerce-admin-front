export interface CustomOrder {
  id?: number;
  totalPrice: number;
  status: OrderStatus;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  paymentMethod: {
    id: number;
    name: string;
    icon: string;
    slug: string;
  };
  books: {
    id: number;
    title: string;
    description: string;
    price: number;
    svg: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
