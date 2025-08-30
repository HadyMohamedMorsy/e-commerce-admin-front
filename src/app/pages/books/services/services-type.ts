export class BookModel {
  id?: number | null;
  title: string | null;
  type : 'cover' | 'page' ;
  price: number | null;
  svg: string | null;

  constructor(data?: BookModel) {
    this.id = data?.id || null;
    this.title = data?.title || null;
    this.type = data?.type || 'page';
    this.price = data?.price || null;
    this.svg = data?.svg || null;
  }
}

export interface Book {
  id: number;
  title: string;
  type: 'cover' | 'page';
  price: number;
  svg: string;
  createdAt: string;
}
