export interface ShapeCategory {
  id?: number;
  type: ShapeCategoryType;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export enum ShapeCategoryType {
  WOMAN = 'woman',
  MAN = 'man',
}

export class ShapeCategoryModel {
  id?: number | null;
  type: string | null;
  name: string | null;

  constructor(data?: ShapeCategoryModel) {
    this.id = data?.id || null;
    this.type = data?.type || null;
    this.name = data?.name || null;
  }
}
