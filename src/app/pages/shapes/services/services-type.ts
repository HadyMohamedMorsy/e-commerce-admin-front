export interface Shape {
  id?: number;
  type: string;
  image: string;
  shapeType: string;
  colorCode: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class ShapeModel {
  id?: number | null;
  type: string | null;
  image: string | null;
  shapeType: string | null;
  name: string | null;
  colorCode: string | null;

  constructor(data?: ShapeModel) {
    this.id = data?.id || null;
    this.type = data?.type || null;
    this.image = data?.image || null;
    this.shapeType = data?.shapeType || null;
    this.name = data?.name || null;
    this.colorCode = data?.colorCode || null;
  }
}
