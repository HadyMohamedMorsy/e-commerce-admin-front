export class AnswerModel {
  id?: number | null;
  answerText: string | null;
  questionId: number | null;
  bookIds: number | null;

  constructor(data?: AnswerModel) {
    this.id = data?.id || null;
    this.answerText = data?.answerText || null;
    this.questionId = data?.questionId || null;
    this.bookIds = data?.bookIds || null;
  }
}

export interface Answer {
  id: number;
  answerText: string;
  questionId: number;
  bookIds: number[];
  createdAt: string;
}
