import { QuizWrapper } from '@/components';
import { ChevronDown } from 'lucide-react';

interface QuizCardProps {
  quiz: any;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full min-h-full min-w-full rounded-lg overflow-hidden">
        <QuizWrapper quiz={quiz} />
        <div className="mt-6 text-center text-gray-500">
          <p>위아래로 스와이프하여 퀴즈를 볼 수 있습니다</p>
          <ChevronDown className="h-6 w-6 mx-auto mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
