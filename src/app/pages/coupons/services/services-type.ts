export interface Coupon {
  id: number;
  code: string;
  coupon_type: string;
  discount: number;
  discount_type: string;
  expiry_date: string;
  min_order_total_price: number;
  min_order_item_count: number;
  created_at: string;
}

export class CouponModel {
  id?: number | null;
  code: string | null;
  product: { title: string; id: number } | null;
  products_ids: number[] | null;
  product_category: { title: string; id: number } | null;
  categories_ids: number[] | null;
  expiry_date: string | null;
  min_order_total_price: number | null;
  min_order_item_count: number | null;
  number_of_users: number | null;
  coupon_type: 'per_order' | 'per_customer' | 'first_order';
  discount_type: 'fixed' | 'percentage';
  discount: number;
  is_active: boolean;

  constructor(data?: CouponModel) {
    this.id = data?.id || null;
    this.code = data?.code || null;
    this.product = data?.product || null;
    this.products_ids = data?.products_ids || null;
    this.product_category = data?.product_category || null;
    this.categories_ids = data?.categories_ids || null;
    this.expiry_date = data?.expiry_date || null;
    this.min_order_total_price = data?.min_order_total_price || null;
    this.min_order_item_count = data?.min_order_item_count || null;
    this.number_of_users = data?.number_of_users || null;
    this.coupon_type = data?.coupon_type || 'per_order';
    this.discount_type = data?.discount_type || 'fixed';
    this.discount = data?.discount ?? 0;
    this.is_active = data?.is_active ?? false;
  }
}
