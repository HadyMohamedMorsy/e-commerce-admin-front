export class BookModel {
  id?: number | null;
  title: string | null;
  description: string | null;
  price: number | null;
  svg: string | null;

  constructor(data?: BookModel) {
    this.id = data?.id || null;
    this.title = data?.title || null;
    this.description = data?.description || null;
    this.price = data?.price || null;
    this.svg = data?.svg || null;
  }
}

export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  svg: string;
  createdAt: string;
}
