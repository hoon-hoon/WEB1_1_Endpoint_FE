import { useState, useEffect } from 'react';
import type { BaseQuizAPI } from '@/types';
import { Button } from '../common/Button';

interface QuizMulProps {
  quiz: BaseQuizAPI;
  onAnswerSelect: (answer: number) => void;
  selectedAnswer: number | null;
}

function QuizMul({ quiz, onAnswerSelect, selectedAnswer }: QuizMulProps) {
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(selectedAnswer);
  const [, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (selectedAnswer !== null) {
      setCurrentAnswer(selectedAnswer);
      setIsCorrect(selectedAnswer === quiz.answer?.answerNumber);
    }
  }, [selectedAnswer, quiz.answer?.answerNumber]);

  const handleAnswerSelect = (optionNo: number) => {
    if (currentAnswer !== null) return;
    const correctAnswer = quiz.answer?.answerNumber ?? null;
    setCurrentAnswer(optionNo);
    setIsCorrect(correctAnswer !== null && optionNo === correctAnswer);
    onAnswerSelect(optionNo);
  };

  return (
    <div>
      <h3 className="text-md font-semibold">{quiz.content}</h3>
      <ul className="space-y-2 mt-4">
        {quiz.options.map((option) => {
          let color: '#A0E2B0' | '#FAA4A3' | 'gray' = 'gray';
          let variant: 'fill' | 'unfill' = 'unfill';

          if (currentAnswer !== null) {
            if (option.no === quiz.answer?.answerNumber) {
              color = '#A0E2B0';
              variant = 'fill';
            } else if (option.no === currentAnswer) {
              color = '#FAA4A3';
              variant = 'fill';
            }
          }

          return (
            <li key={option.no}>
              <Button
                label={option.content}
                onClick={() => handleAnswerSelect(option.no)}
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
