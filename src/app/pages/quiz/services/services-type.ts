export class QuizModel {
  id?: number | null;
  question: string | null;

  constructor(data?: QuizModel) {
    this.id = data?.id || null;
    this.question = data?.question || null;
  }
}

export interface Quiz {
  id: number;
  question: string;
  createdAt: string;
}
