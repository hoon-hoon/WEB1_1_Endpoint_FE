export interface Choice {
  id: string;
  text: string;
}

export interface ReviewNoteItem {
  id: string;
  question: string;
  date: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  choices?: Choice[];
}
