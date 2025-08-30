export class AnswerModel {
  id?: number | null;
  answerText: string | null;
  questionId: number | null;
  bookId: number | null;

  constructor(data?: AnswerModel) {
    this.id = data?.id || null;
    this.answerText = data?.answerText || null;
    this.questionId = data?.questionId || null;
    this.bookId = data?.bookId || null;
  }
}

export interface Answer {
  id: number;
  answerText: string;
  questionId: number;
  bookId: number;
  createdAt: string;
}
