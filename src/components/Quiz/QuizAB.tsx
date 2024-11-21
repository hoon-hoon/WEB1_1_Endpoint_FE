import { useState } from 'react';
import type { BaseQuizAPI } from '@/types';

function QuizAB({ quiz }: { quiz: BaseQuizAPI }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (optionNo: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionNo);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{quiz.content}</h3>
      <div className="space-y-4">
        {quiz.options.map((option) => {
          const isSelected = selectedOption !== null;
          const isCurrentOption = selectedOption === option.no;

          return (
            <div
              key={option.no}
              className={`p-4 rounded-lg border text-sm font-medium cursor-pointer ${
                !isSelected ? 'hover:bg-gray-100' : ''
              }`}
              onClick={() => handleOptionClick(option.no)}
              style={{
                background: isSelected
                  ? `linear-gradient(to right, ${
                      isCurrentOption ? '#FBBF24' : '#E5E7EB'
                    } ${option.selectionRatio * 100}%, #FFFFFF ${option.selectionRatio * 100}%)`
                  : '',
                color: isSelected ? (isCurrentOption ? '#FFFFFF' : '#6B7280') : '#000000',
                borderColor: isSelected ? (isCurrentOption ? '#FBBF24' : '#E5E7EB') : '#D1D5DB',
              }}
            >
              {option.content}{' '}
              {isSelected && (
                <span className="ml-2 font-semibold">
                  {(option.selectionRatio * 100).toFixed(1)}% (
                  {Math.round(option.selectionRatio * 100)}명)
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
