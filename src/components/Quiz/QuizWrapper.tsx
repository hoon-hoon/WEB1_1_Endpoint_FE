import { Quiz } from '@/types';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import { useState } from 'react';
import { QuizAB, QuizAns, QuizFooter, QuizMul, QuizOX } from '.';
import BottomSheet from '../common/BottomSheet';

interface QuizWrapperProps {
  quiz: Quiz;
}

function QuizWrapper({ quiz }: QuizWrapperProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(quiz.likes);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === quiz.correctAnswer);
  };

  const renderQuizContent = () => {
    if (quiz.type === 'OX') {
      return <QuizOX quiz={quiz} onAnswerSelect={handleAnswerSelect} />;
    } else if (quiz.type === 'ABTest') {
      return <QuizAB quiz={quiz} />;
    } else if (quiz.type === 'MultipleChoice') {
      return <QuizMul quiz={quiz} onAnswerSelect={handleAnswerSelect} />;
    }
    return null;
  };

  return (
    <div className="flex items-center h-full">
      <div className="w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Avatar size="S" />
          <div className="ml-4">
            <h4 className="text-md font-bold">{quiz.author}</h4>
            <p className="text-sm text-gray-500">
              {quiz.type === 'OX' ? 'OX 퀴즈' : quiz.type === 'ABTest' ? 'A/B 테스트' : '객관식'}
            </p>
          </div>
        </div>
        {renderQuizContent()}
        {selectedAnswer !== null && isCorrect !== null && (
          <QuizAns isCorrect={isCorrect} explanation={quiz.explanation} />
        )}
        <QuizFooter
          likes={likes}
          comments={quiz.comments}
          isLiked={isLiked}
          onToggleLike={handleToggleLike}
          onCommentsClick={() => setBottomSheetOpen(true)}
        />
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        setOpen={setBottomSheetOpen}
        comments={quiz.comments}
      />
    </div>
  );
}

export default QuizWrapper;
