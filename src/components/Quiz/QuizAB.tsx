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
          const isCurrentOption = selectedOption === option.no;

          return (
            <div
              key={option.no}
              className={`p-4 rounded-lg border text-sm font-medium cursor-pointer ${
                selectedOption === null ? 'hover:bg-gray-100' : ''
              }`}
              onClick={() => handleOptionClick(option.no)}
              style={{
                background:
                  selectedOption !== null
                    ? `linear-gradient(to right, ${
                        isCurrentOption ? '#FDBA94' : '#FEF2EA'
                      } ${option.selectionRatio * 100}%, #FFFFFF ${option.selectionRatio * 100}%)`
                    : '',
                color: selectedOption !== null && !isCurrentOption ? '#6B7280' : '#000000',
                borderColor:
                  selectedOption !== null ? (isCurrentOption ? '#FDBA94' : '#E5E7EB') : '#D1D5DB',
              }}
            >
              {option.content}
              {selectedOption !== null && (
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
