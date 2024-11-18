import type { QuizOX as QuizOXType } from '@/types';

interface QuizOXProps {
  quiz: QuizOXType;
  onAnswerSelect: (answer: string) => void;
}

function QuizOX({ quiz, onAnswerSelect }: QuizOXProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>

      <div className="flex justify-between">
        <button
          className="flex-1 text-center py-3 border border-gray-300 rounded-l-lg bg-white hover:bg-blue-100"
          onClick={() => onAnswerSelect('O')}
        >
          O
        </button>
        <button
          className="flex-1 text-center py-3 border border-gray-300 rounded-r-lg bg-white hover:bg-blue-100"
          onClick={() => onAnswerSelect('X')}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default QuizOX;
