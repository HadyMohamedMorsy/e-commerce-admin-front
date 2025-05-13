export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export class CategoryModel {
  id: number | null;
  name: string | null;
  description: string | null;
  image: string | null;
  categoryType: 'product' | 'blog' | 'all';
  constructor(data?: CategoryModel) {
    this.id = data?.id || null;
    this.name = data?.name || null;
    this.description = data?.description || null;
    this.image = data?.image || null;
    this.categoryType = data?.categoryType || 'all';
  }
}
