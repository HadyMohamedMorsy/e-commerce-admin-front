export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export class CategoryModel {
  id: number | null;
  name: string | null;
  description: string | null;
  image: string | null;
  constructor(data?: CategoryModel) {
    this.id = data?.id || null;
    this.name = data?.name || null;
    this.description = data?.description || null;
    this.image = data?.image || null;
  }
}
