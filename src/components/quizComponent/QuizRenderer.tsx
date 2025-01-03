import QuizOX from './QuizOX';
import QuizAB from './QuizAB';
import QuizMul from './QuizMul';
import { BaseQuizAPI } from '@/types/QuizTypes';

interface QuizRendererProps {
  quiz: BaseQuizAPI;
  onAnswerSelect: (answer: number) => void;
  selectedAnswer: number | null;
}

const QuizRenderer = ({ quiz, onAnswerSelect, selectedAnswer }: QuizRendererProps) => {
  if (quiz.type === 'OX 퀴즈') {
    return <QuizOX quiz={quiz} onAnswerSelect={onAnswerSelect} selectedAnswer={selectedAnswer} />;
  } else if (quiz.type === 'AB 테스트') {
    return <QuizAB quiz={quiz} onAnswerSelect={onAnswerSelect} selectedAnswer={selectedAnswer}  />;
  } else if (quiz.type === '객관식') {
    return <QuizMul quiz={quiz} onAnswerSelect={onAnswerSelect} selectedAnswer={selectedAnswer} />;
  }
  return null;
};

export default QuizRenderer;
