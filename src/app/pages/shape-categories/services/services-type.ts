export interface ShapeCategory {
  id?: number;
  type: ShapeCategoryType;
  shpeType: ShapeType;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export enum ShapeCategoryType {
  WOMAN = 'woman',
  MAN = 'man',
}

export enum ShapeType {
  NORMAL = 'normal',
  GIRL_S_BODY = 'Girl_s_body',
  WEIGHT_GAIN = 'Weight_gain',
  AVERAGE_WEIGHT = 'Average_weight',
  SLIM = 'slim',
  middle = 'middle',
  NATURAL = 'natural',
  VERY_FAT = 'Very_fat',
  SLIM_2 = 'slim-2',
}

export class ShapeCategoryModel {
  id?: number | null;
  type: 'Layer_4' | 'Layer_2' | null;
  name: string | null;
  shapeType: ShapeType | null;

  constructor(data?: ShapeCategoryModel) {
    this.id = data?.id || null;
    this.type = data?.type || 'Layer_4';
    this.name = data?.name || null;
    this.shapeType = data?.shapeType || null;
  }
}
