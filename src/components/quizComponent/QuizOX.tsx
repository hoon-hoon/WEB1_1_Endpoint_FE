import { BaseQuizAPI } from '@/types/QuizTypes';
import { useEffect, useState } from 'react';
import Button from '../common/Button/Button';


interface QuizOXProps {
  quiz: BaseQuizAPI;
  onAnswerSelect: (answer: number) => void;
  selectedAnswer: number | null;
}

function QuizOX({ quiz, onAnswerSelect, selectedAnswer }: QuizOXProps) {
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (selectedAnswer !== null) {
      setCurrentAnswer(selectedAnswer);
      setIsCorrect(selectedAnswer === quiz.answer?.answerNumber);
    }
  }, [selectedAnswer, quiz.answer?.answerNumber]);

  const handleAnswerSelect = (answer: number) => {
    if (currentAnswer !== null) return;
    const correctAnswer = quiz.answer?.answerNumber ?? null;

    setCurrentAnswer(answer);
    setIsCorrect(correctAnswer !== null && answer === correctAnswer);
    onAnswerSelect(answer);
  };

  return (
    <div>
      <h3 className="text-md font-semibold mb-4">{quiz.content}</h3>
      <div className="flex space-x-2">
        <Button
          label="O"
          onClick={() => handleAnswerSelect(1)}
          color={currentAnswer === 1 ? (isCorrect ? '#A0E2B0' : '#FAA4A3') : 'gray'}
          variant={currentAnswer === 1 ? 'fill' : 'unfill'}
          size="long"
        />
        <Button
          label="X"
          onClick={() => handleAnswerSelect(2)}
          color={currentAnswer === 2 ? (isCorrect ? '#A0E2B0' : '#FAA4A3') : 'gray'}
          variant={currentAnswer === 2 ? 'fill' : 'unfill'}
          size="long"
        />
      </div>
    </div>
  );
}

export default QuizOX;
