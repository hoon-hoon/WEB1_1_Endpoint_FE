export interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
}

export interface BaseQuiz {
  id: number;
  author: string;
  authorAvatar: string;
  question: string;
  correctAnswer: string | null;
  explanation: string;
  likes: number;
  comments: Comment[];
  options?: string[];
}

export interface QuizOX extends BaseQuiz {
  type: 'OX';
  options?: undefined;
}

export interface QuizAB extends BaseQuiz {
  type: 'ABTest';
  options: [string, string];
}

export interface QuizMul extends BaseQuiz {
  type: 'MultipleChoice';
  options: string[];
}

export type Quiz = QuizOX | QuizAB | QuizMul;
