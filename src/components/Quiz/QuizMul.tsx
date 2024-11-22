import { useState } from 'react';
import type { BaseQuizAPI } from '@/types';
import { Button } from '../common/Button';

interface QuizMulProps {
  quiz: BaseQuizAPI;
  onAnswerSelect: (answer: string) => void;
}

function QuizMul({ quiz, onAnswerSelect }: QuizMulProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (optionContent: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(optionContent);
    setIsCorrect(optionContent === quiz.answer.content);
    onAnswerSelect(optionContent);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">{quiz.content}</h3>
      <ul className="space-y-2 mt-4">
        {quiz.options.map((option) => {
          let color: '#A0E2B0' | '#FAA4A3' | 'gray' = 'gray';
          let variant: 'fill' | 'unfill' = 'unfill';

          if (selectedAnswer) {
            if (option.content === quiz.answer.content) {
              color = '#A0E2B0';
              variant = 'fill';
            } else if (option.content === selectedAnswer) {
              color = '#FAA4A3';
              variant = 'fill';
            }
          }

          return (
            <li key={option.no}>
              <Button
                label={option.content}
                onClick={() => handleAnswerSelect(option.content)}
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
