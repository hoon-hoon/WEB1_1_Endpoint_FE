export interface QuizOption {
  optionNumber: number;
  content: string;
  selectionCount: number;
}

export interface WrongQuiz {
  id: number;
  category: string;
  type: 'OX' | 'MULTIPLE_CHOICE';
  content: string;
  tags: string[];
  options: QuizOption[];
  createdAt: string;
  modifiedAt: string;
  answerNumber: number;
  explanation: string;
  correctRate: number;
}

export interface UserAnswer {
  userId: number;
  quizId: number;
  choiceNumber: number;
  answeredAt: string;
  correct: boolean;
}

export interface QuizWithAnswer {
  quiz: WrongQuiz;
  userAnswer: UserAnswer;
}
