export interface Product {
  id: number;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  cover: string;
  createdAt: string;
  deletedAt: string;
}

export interface ProductSku {
  id: number;
  sku: string;
  price: number;
  quantity: number;
  createdAt: string;
  deletedAt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  deletedAt: string;
}

export class ProductModel {
  id: number | null;
  name: string | null;
  description: string | null;
  metaTitle: string | null;
  slug: string | null;
  metaDescription: string | null;
  summary: string | null;
  cover: string | null;
  images: string[] | null;
  categoryIds: number[] | null;
  constructor(data?: ProductModel) {
    this.id = data?.id || null;
    this.name = data?.name || null;
    this.slug = data?.slug || null;
    this.description = data?.description || null;
    this.metaTitle = data?.metaTitle || null;
    this.metaDescription = data?.metaDescription || null;
    this.summary = data?.summary || null;
    this.cover = data?.cover || null;
    this.images = data?.images || null;
    this.categoryIds = data?.categoryIds || null;
  }
}

export class ProductSkuModel {
  id: number | null;
  sku: string | null;
  price: number | null;
  quantity: number | null;
  productId: number | null;
  discountType: string | null;
  discount: number | null;

  constructor(data?: ProductSkuModel) {
    this.id = data?.id || null;
    this.sku = data?.sku || null;
    this.price = data?.price || null;
    this.quantity = data?.quantity || null;
    this.productId = data?.productId || null;
    this.discountType = data?.discountType || null;
    this.discount = data?.discount || null;
  }
}

export class ProductAttributeModel {
  productId: number | null;
  attributes:
    | {
        id: number | null;
        name: string | null;
        value: string | null;
        image: string | null;
        images: string[] | null;
        quantity: number | null;
        priceChange: number | null;
      }[]
    | null;

  constructor(data?: ProductAttributeModel) {
    this.productId = data?.productId || null;
    this.attributes = data?.attributes || [
      {
        id: null,
        name: null,
        value: null,
        image: null,
        images: null,
        quantity: null,
        priceChange: null,
      },
    ];
  }
}
