export interface Shape {
  id?: number;
  type: FacialFeatureType;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export enum FacialFeatureType {
  BEARD = 'beard',
  MUSTACHE = 'mustache',
  GOATEE = 'goatee',
  SKIN_FACIAL_HAIR = 'skin_facial_hair',
  EYE_BROWS = 'eye_brows',
  NOSE = 'nose',
  HATES = 'hates',
  BODY_TYPE = 'body_type',
  SHOES = 'shoes',
  EYES = 'eyes',
  MOUTH = 'mouth',
  CHIN = 'chin',
  NECK = 'neck',
  BOTTOOMS = 'bottooms',
  TOPES = 'topes',
}

export class ShapeModel {
  id?: number | null;
  type: string | null;
  image: string | null;

  constructor(data?: ShapeModel) {
    this.id = data?.id || null;
    this.type = data?.type || null;
    this.image = data?.image || null;
  }
}
