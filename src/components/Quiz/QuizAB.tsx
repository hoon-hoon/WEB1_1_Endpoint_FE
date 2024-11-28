import { useState } from 'react';
import type { BaseQuizAPI } from '@/types';

function QuizAB({ quiz }: { quiz: BaseQuizAPI }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (optionContent: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionContent);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{quiz.content}</h3>
      <div className="grid grid-cols-2 gap-4">
        {quiz.options.map((option) => (
          <div key={option.no} className="flex flex-col items-center gap-4">
            {option.imagePath && (
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <img
                  src={option.imagePath}
                  alt={option.content}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
            <div
              className={`p-4 rounded-lg border text-sm font-medium cursor-pointer text-center w-full ${
                selectedOption === null ? 'hover:bg-gray-100' : ''
              }`}
              onClick={() => handleOptionClick(option.content)}
              style={{
                background:
                  selectedOption !== null
                    ? `linear-gradient(to right, ${
                        selectedOption === option.content ? '#FDBA94' : '#FEF2EA'
                      } ${option.selectionRatio * 100}%, #FFFFFF ${option.selectionRatio * 100}%)`
                    : '',
                color:
                  selectedOption !== null && selectedOption !== option.content
                    ? '#6B7280'
                    : '#000000',
                borderColor:
                  selectedOption !== null
                    ? selectedOption === option.content
                      ? '#FDBA94'
                      : '#E5E7EB'
                    : '#D1D5DB',
              }}
            >
              {option.content}
              {selectedOption !== null && (
                <span className="block mt-2 font-semibold">
                  {(option.selectionRatio * 100).toFixed(1)}% (
                  {Math.round(option.selectionRatio * 100)}명)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizAB;
