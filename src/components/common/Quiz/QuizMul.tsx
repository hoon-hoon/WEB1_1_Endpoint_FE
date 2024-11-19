import type { QuizMul as QuizMulType } from '@/types';

interface QuizMulProps {
  quiz: QuizMulType;
  onAnswerSelect: (answer: string) => void;
}

function QuizMul({ quiz, onAnswerSelect }: QuizMulProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{quiz.question}</h3>
      <ul className="space-y-2 mt-4">
        {quiz.options.map((option, index) => (
          <li key={index}>
            <button
              className="w-full px-4 py-2 bg-gray-200 rounded"
              onClick={() => onAnswerSelect(option)}
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
