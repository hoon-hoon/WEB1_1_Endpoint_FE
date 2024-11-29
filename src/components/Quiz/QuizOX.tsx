import { useState } from 'react';
import type { BaseQuizAPI } from '@/types';
import { Button } from '../common/Button';

interface QuizOXProps {
  quiz: BaseQuizAPI;
  onAnswerSelect: (answer: number) => void;
}

function QuizOX({ quiz, onAnswerSelect }: QuizOXProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null) return;
    const correctAnswer = quiz.answer?.answerNumber ?? null;

    setSelectedAnswer(answer);
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
          color={selectedAnswer === 1 ? (isCorrect ? '#A0E2B0' : '#FAA4A3') : 'gray'}
          variant={selectedAnswer === 1 ? 'fill' : 'unfill'}
          size="long"
        />
        <Button
          label="X"
          onClick={() => handleAnswerSelect(2)}
          color={selectedAnswer === 2 ? (isCorrect ? '#A0E2B0' : '#FAA4A3') : 'gray'}
          variant={selectedAnswer === 2 ? 'fill' : 'unfill'}
          size="long"
        />
      </div>
    </div>
  );
}

export default QuizOX;
