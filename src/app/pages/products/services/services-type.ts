export interface Product {
  id: number;
  name: string;
  description: string;
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
  summary: string | null;
  cover: string | null;
  constructor(data?: ProductModel) {
    this.id = data?.id || null;
    this.name = data?.name || null;
    this.description = data?.description || null;
    this.summary = data?.summary || null;
    this.cover = data?.cover || null;
  }
}
