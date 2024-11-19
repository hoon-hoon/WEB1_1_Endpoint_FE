import { useState } from 'react';
import type { QuizOX as QuizOXType } from '@/types';

interface QuizOXProps {
  quiz: QuizOXType;
  onAnswerSelect: (answer: string) => void;
}

function QuizOX({ quiz, onAnswerSelect }: QuizOXProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setIsCorrect(answer === quiz.correctAnswer);
    onAnswerSelect(answer);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>

      <div className="flex justify-between">
        <button
          className={`flex-1 text-center py-3 border border-gray-300 rounded-l-lg transition-colors duration-300 ${
            selectedAnswer
              ? selectedAnswer === 'O' && isCorrect
                ? 'bg-pastelGreen text-white'
                : selectedAnswer === 'O' && !isCorrect
                  ? 'bg-pastelRed text-white'
                  : 'bg-white'
              : 'bg-white hover:bg-blue-100'
          }`}
          onClick={() => handleAnswerSelect('O')}
          disabled={!!selectedAnswer}
        >
          O
        </button>
        <button
          className={`flex-1 text-center py-3 border border-gray-300 rounded-r-lg transition-colors duration-300 ${
            selectedAnswer
              ? selectedAnswer === 'X' && isCorrect
                ? 'bg-pastelGreen text-white'
                : selectedAnswer === 'X' && !isCorrect
                  ? 'bg-pastelRed text-white'
                  : 'bg-white'
              : 'bg-white hover:bg-blue-100'
          }`}
          onClick={() => handleAnswerSelect('X')}
          disabled={!!selectedAnswer}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default QuizOX;
