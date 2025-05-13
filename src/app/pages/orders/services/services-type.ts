import { Product } from '@pages/products/services/services-type';
import { User } from '@pages/users/services/services-type';

export interface Order {
  id: number;
  payment: 'pending' | 'completed' | 'failed' | 'refunded';
  total: number;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

export class OrderModel {
  id: number | null;
  total: number | null;
  constructor(data?: OrderModel) {
    this.id = data?.id || null;
    this.total = data?.total || null;
  }
}

export interface OrderItem {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}
