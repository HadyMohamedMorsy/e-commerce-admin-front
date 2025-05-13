export interface Coupon {
  id: number;
  code: string;
  coupon_type: string;
  discount: number;
  discountType: string;
  expiryDate: string;
  numberOfUsers: number;
  couponType: string;
  expiredAt: string;
  isActive: boolean;
  minOrderTotalPrice: number;
  minOrderItemCount: number;
  createdAt: string;
}

export enum CouponType {
  FREE_SHIPPING_ALL = 'free_shipping_all',
  FREE_SHIPPING_CATEGORY = 'free_shipping_category',
  FREE_SHIPPING_PRODUCT = 'free_shipping_product',
  BUY_ONE_GET_ONE_ALL = 'buy_one_get_one_all',
  BUY_ONE_GET_ONE_CATEGORY = 'buy_one_get_one_category',
  BUY_ONE_GET_ONE_PRODUCT = 'buy_one_get_one_product',
  DISCOUNT_ALL = 'discount_all',
  DISCOUNT_CATEGORY = 'discount_category',
  DISCOUNT_PRODUCT = 'discount_product',
}

export class CouponModel {
  id?: number | null;
  code: string | null;
  expiryDate: string | null;
  minOrderTotalPrice: number | null;
  minOrderItemCount: number | null;
  numberOfUsers: number | null;
  couponType: CouponType;
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
    this.couponType = data?.couponType || CouponType.DISCOUNT_PRODUCT;
    this.discountType = data?.discountType || 'fixed';
    this.discount = data?.discount ?? 0;
    this.isActive = data?.isActive ?? false;
  }
}
