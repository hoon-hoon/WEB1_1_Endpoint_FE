import { useState } from 'react';
import type { QuizAB as QuizABType } from '@/types';

function QuizAB({ quiz }: { quiz: QuizABType }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 임시 선택 비율
  const mockPercentages = {
    optionA: { percentage: 60, count: 61 },
    optionB: { percentage: 40, count: 40 },
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>
      <div className="space-y-4">
        {quiz.options.map((option, index) => {
          const isSelected = selectedOption !== null;
          const isOptionA = option === quiz.options[0];
          const percentage = isOptionA
            ? mockPercentages.optionA.percentage
            : mockPercentages.optionB.percentage;
          const count = isOptionA ? mockPercentages.optionA.count : mockPercentages.optionB.count;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border text-sm font-medium cursor-pointer ${
                !isSelected ? 'hover:bg-gray-100' : ''
              }`}
              onClick={() => handleOptionClick(option)}
              style={{
                background: isSelected
                  ? `linear-gradient(to right, ${
                      isOptionA ? '#FBBF24' : '#E5E7EB'
                    } ${percentage}%, #FFFFFF ${percentage}%)`
                  : '',
                color: isSelected ? (isOptionA ? '#FFFFFF' : '#6B7280') : '#000000',
                borderColor: isSelected ? (isOptionA ? '#FBBF24' : '#E5E7EB') : '#D1D5DB',
              }}
            >
              {option}{' '}
              {isSelected && (
                <span className="ml-2 font-semibold">
                  {percentage}% ({count}명)
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizAB;
