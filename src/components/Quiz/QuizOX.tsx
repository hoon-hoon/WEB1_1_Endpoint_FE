import { useState } from 'react';
import type { BaseQuizAPI } from '@/types';
import { Button } from '../common/Button';

interface QuizOXProps {
  quiz: BaseQuizAPI;
  onAnswerSelect: (answer: string) => void;
}

function QuizOX({ quiz, onAnswerSelect }: QuizOXProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setIsCorrect(answer === quiz.answer.content);
    onAnswerSelect(answer);
  };

  return (
    <div>
      <h3 className="text-md font-semibold mb-4">{quiz.content}</h3>
      <div className="flex space-x-2">
        <Button
          label="O"
          onClick={() => handleAnswerSelect('O')}
          color={selectedAnswer === 'O' ? (isCorrect ? '#A0E2B0' : '#FAA4A3') : 'gray'}
          variant={selectedAnswer === 'O' ? 'fill' : 'unfill'}
          size="long"
        />
        <Button
          label="X"
          onClick={() => handleAnswerSelect('X')}
          color={
            selectedAnswer === 'X'
              ? isCorrect
                ? '#A0E2B0'
                : '#FAA4A3'
              : 'gray'
          }
          variant={selectedAnswer === 'X' ? 'fill' : 'unfill'}
          size="long"
        />
      </div>
    </div>
  );
}

export default QuizOX;
