import { QuizWrapper } from '@/components';

interface QuizCardProps {
  quiz: any;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <div className="flex h-full w-full">
      <div className="h-full w-full min-h-full min-w-full rounded-lg overflow-hidden">
        <QuizWrapper quiz={quiz} />
      </div>
    </div>
  );
};

export default QuizCard;
