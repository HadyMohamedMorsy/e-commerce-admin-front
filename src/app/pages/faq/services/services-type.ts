import { Product } from '@pages/products/services/services-type';
export class FaqModel {
  id?: number | null;
  selectQuestionableType: 'Product' | 'All';
  question: string | null;
  productId: number | null;
  answer: string | null;
  constructor(data?: FaqModel) {
    this.id = data?.id || null;
    this.selectQuestionableType = data?.selectQuestionableType || 'All';
    this.question = data?.question || null;
    this.answer = data?.answer || null;
    this.productId = data?.productId || null;
  }
}
export interface Faq {
  id: number;
  question: string;
  select_questionable_type: 'Product' | 'All';
  answer: string;
  Product: Product;
  created_at: string;
}
