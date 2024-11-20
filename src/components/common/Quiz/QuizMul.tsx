import { useState } from 'react';
import type { QuizMul as QuizMulType } from '@/types';
import { Button } from '../Button';

interface QuizMulProps {
  quiz: QuizMulType;
  onAnswerSelect: (answer: string) => void;
}

function QuizMul({ quiz, onAnswerSelect }: QuizMulProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    setIsCorrect(option === quiz.correctAnswer);
    onAnswerSelect(option);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">{quiz.question}</h3>
      <ul className="space-y-2 mt-4">
        {quiz.options.map((option, index) => {
          let color: '#A0E2B0' | '#FAA4A3' | 'gray' = 'gray';
          let variant: 'fill' | 'unfill' = 'unfill';

          if (selectedAnswer) {
            if (option === quiz.correctAnswer) {
              color = '#A0E2B0';
              variant = 'fill';
            } else if (option === selectedAnswer) {
              color = '#FAA4A3';
              variant = 'fill';
            }
          }

          return (
            <li key={index}>
              <Button
                label={option}
                onClick={() => handleAnswerSelect(option)}
                color={color}
                variant={variant}
                size="long"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuizMul;
