import { Product } from '@pages/products/services/services-type';
import { User } from '@pages/users/services/services-type';

export interface Review {
  id: number;
  isApproved: number;
  comment: string;
  rate: number;
  product: Product;
  createdBy: User;
  createdAt: string;
}

export class ReviewModel {
  id?: number | null;
  comment: string | null;
  rate: number | null;
  productId: number | null;
  reviewable_type: 'product' | 'blog';
  isApproved: boolean;

  constructor(data?: ReviewModel) {
    this.id = data?.id || null;
    this.comment = data?.comment || null;
    this.productId = data?.productId || null;
    this.rate = data?.rate || null;
    this.reviewable_type = data?.reviewable_type || 'product';
    this.isApproved = data?.isApproved ?? false;
  }
}
