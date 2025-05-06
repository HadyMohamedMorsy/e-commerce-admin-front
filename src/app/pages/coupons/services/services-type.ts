export interface Coupon {
  id: number;
  code: string;
  coupon_type: string;
  discount: number;
  discountType: string;
  expiryDate: string;
  minOrderTotalPrice: number;
  minOrderItemCount: number;
  createdAt: string;
}

export class CouponModel {
  id?: number | null;
  code: string | null;
  expiryDate: string | null;
  minOrderTotalPrice: number | null;
  minOrderItemCount: number | null;
  numberOfUsers: number | null;
  couponType: 'per_order' | 'per_customer' | 'first_order';
  discountType: 'fixed' | 'percentage';
  discount: number;
  isActive: boolean;

  constructor(data?: CouponModel) {
    this.id = data?.id || null;
    this.code = data?.code || null;
    this.expiryDate = data?.expiryDate || null;
    this.minOrderTotalPrice = data?.minOrderTotalPrice || null;
    this.minOrderItemCount = data?.minOrderItemCount || null;
    this.numberOfUsers = data?.numberOfUsers || null;
    this.couponType = data?.couponType || 'per_order';
    this.discountType = data?.discountType || 'fixed';
    this.discount = data?.discount ?? 0;
    this.isActive = data?.isActive ?? false;
  }
}
