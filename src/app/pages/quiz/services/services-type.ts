export class QuizModel {
  id?: number | null;
  question: string | null;
  questionType: string | null;

  constructor(data?: QuizModel) {
    this.id = data?.id || null;
    this.question = data?.question || null;
    this.questionType = data?.questionType || null;
  }
}

export interface Quiz {
  id: number;
  question: string;
  questionType: string;
  createdAt: string;
}
