import { useState } from 'react';
import type { QuizMul as QuizMulType } from '@/types';

interface QuizMulProps {
  quiz: QuizMulType;
  onAnswerSelect: (answer: string) => void;
}

function QuizMul({ quiz, onAnswerSelect }: QuizMulProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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
        {quiz.options.map((option, index) => (
          <li key={index}>
            <button
              className={`w-full px-4 py-2 rounded transition-colors duration-300 border ${
                selectedAnswer
                  ? option === quiz.correctAnswer
                    ? 'bg-pastelGreen text-white'
                    : option === selectedAnswer
                      ? 'bg-pastelRed text-white'
                      : 'text-gray-800'
                  : 'text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => handleAnswerSelect(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizMul;
