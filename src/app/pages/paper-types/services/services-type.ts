export interface PaperType {
  id?: number | null;
  paperName: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  orderCustoms?: any[];
  createdBy?: any;
}

export class PaperTypeModel {
  id: number | null;
  paperName: string | null;
  price: number | null;

  constructor(data?: PaperTypeModel) {
    this.id = data?.id || null;
    this.paperName = data?.paperName || null;
    this.price = data?.price || null;
  }
}
