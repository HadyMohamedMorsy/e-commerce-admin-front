export class faqModel {
  id?: number | null;
  select_questionable_type: 'Product' | 'All';
  question: string | null;
  answer: string | null;
  constructor(data?: faqModel) {
    this.id = data?.id || null;
    this.select_questionable_type = data?.select_questionable_type || 'All';
    this.question = data?.question || null;
    this.answer = data?.answer || null;
  }
}
export interface Faq {
  id: number;
  question: string;
  select_questionable_type: 'Product' | 'All';
  answer: string;
  created_at: string;
}
