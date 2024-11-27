import { BaseQuizAPI } from '@/types';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import { useState } from 'react';
import { QuizAns, QuizFooter, QuizRenderer } from '.';
import BottomSheet from '../common/BottomSheet';
import { useComments } from '@/hooks';

interface QuizWrapperProps {
  quiz: BaseQuizAPI;
}

function QuizWrapper({ quiz }: QuizWrapperProps) {
  const [isLiked, setIsLiked] = useState(quiz.liked || false);
  const [likes, setLikes] = useState(quiz.count.like);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    quiz.answeredOption ? String(quiz.answeredOption) : null,
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  const { comments, loading, fetchComments } = useComments();

  const handleCommentsClick = () => {
    setBottomSheetOpen(true);
    fetchComments(quiz.id);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === quiz.answer.content);
  };

  return (
    <div className="flex justify-center h-full">
      <div className="w-full p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <Avatar size="S" image={quiz.avatarUrl || '/default-avatar.png'} />
          <div className="ml-4">
            <h4 className="text-md font-bold">{quiz.author || 'default'}</h4>
            <p className="text-sm text-gray-500">{quiz.type}</p>
          </div>
        </div>
        <QuizRenderer quiz={quiz} onAnswerSelect={handleAnswerSelect} />
        {selectedAnswer !== null && (
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isCorrect !== null ? 'max-h-[500px]' : 'max-h-0'
            }`}
          >
            <QuizAns isCorrect={isCorrect!} explanation={quiz.answer.explanation} />
          </div>
        )}
        <QuizFooter
          likes={likes}
          comments={quiz.count.comment}
          isLiked={isLiked}
          onToggleLike={handleToggleLike}
          onCommentsClick={handleCommentsClick}
        />
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        setOpen={setBottomSheetOpen}
        comments={comments}
        loading={loading}
      />
    </div>
  );
}

export default QuizWrapper;
