import { BaseQuizAPI } from '@/types';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import { useState } from 'react';
import { QuizAB, QuizAns, QuizFooter, QuizMul, QuizOX } from '.';
import BottomSheet from '../common/BottomSheet';
import { dummyComments } from '@/data/dummyComment';
import { Comment } from '@/types';

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

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const fetchComments = async (quizId: number) => {
    setLoadingComments(true);
    setComments([]);

    // 더미 데이터에서 해당 퀴즈 ID에 맞는 댓글 가져오기
    const response = dummyComments.filter((comment) => comment.quizId === quizId);

    // 임의의 딜레이 추가 (로딩 효과를 모방)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setComments(response);
    setLoadingComments(false);
  };

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

  const renderQuizContent = () => {
    if (quiz.type === 'OX 퀴즈') {
      return <QuizOX quiz={quiz} onAnswerSelect={handleAnswerSelect} />;
    } else if (quiz.type === 'ABTest') {
      return <QuizAB quiz={quiz} />;
    } else if (quiz.type === '객관식') {
      return <QuizMul quiz={quiz} onAnswerSelect={handleAnswerSelect} />;
    }
    return null;
  };

  return (
    <div className="flex items-center h-full">
      <div className="w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Avatar size="S" image={quiz.avatarUrl || '/default-avatar.png'} />
          <div className="ml-4">
            <h4 className="text-md font-bold">{quiz.author || 'default'}</h4>
            <p className="text-sm text-gray-500">{quiz.type}</p>
          </div>
        </div>
        {renderQuizContent()}
        {selectedAnswer !== null && isCorrect !== null && (
          <QuizAns isCorrect={isCorrect} explanation={quiz.answer.explanation} />
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
        loading={loadingComments}
      />
    </div>
  );
}

export default QuizWrapper;
