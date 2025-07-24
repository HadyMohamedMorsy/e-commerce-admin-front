export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export class CategoryModel {
  id: number | null;
  name: string | null;
  description: string | null;
  categoryId: number | null;
  image: string | null;
  categoryType: 'product' | 'blog' | 'all';
  icon: string | null;
  slug: string | null;
  constructor(data?: CategoryModel) {
    this.id = data?.id || null;
    this.name = data?.name || null;
    this.description = data?.description || null;
    this.categoryId = data?.categoryId || null;
    this.image = data?.image || null;
    this.categoryType = data?.categoryType || 'all';
    this.icon = data?.icon || null;
    this.slug = data?.slug || null;
  }
}
