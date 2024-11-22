import { BaseQuizAPI } from '@/types';
import { QuizAB, QuizMul, QuizOX } from '.';

interface QuizRendererProps {
  quiz: BaseQuizAPI;
  onAnswerSelect: (answer: string) => void;
}

const QuizRenderer = ({ quiz, onAnswerSelect }: QuizRendererProps) => {
  if (quiz.type === 'OX 퀴즈') {
    return <QuizOX quiz={quiz} onAnswerSelect={onAnswerSelect} />;
  } else if (quiz.type === 'ABTest') {
    return <QuizAB quiz={quiz} />;
  } else if (quiz.type === '객관식') {
    return <QuizMul quiz={quiz} onAnswerSelect={onAnswerSelect} />;
  }
  return null;
};

export default QuizRenderer;
