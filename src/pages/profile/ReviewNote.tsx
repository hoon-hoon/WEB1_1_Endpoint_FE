import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/common/TopBar';
import ReviewNoteCard from '@/components/mypage/ReviewNoteCard';
import Container from '@/components/layout/Container';
import FlexBox from '@/components/layout/FlexBox';
import { Loader2 } from 'lucide-react';
import { useReviewNote } from '@/hooks/useReviewNote';

export default function ReviewNote() {
  const { incorrectQuizzes, isPending, isError, error, updateQuizReviewStatus } = useReviewNote();
  const navigate = useNavigate();

  return (
    <Container>
      <TopBar leftIcon="left" leftText="오답노트" onClickLeft={() => navigate('/profile')} />
      {isPending ? (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        </div>
      ) : isError ? (
        <div>오류가 발생했습니다: {error!.message}</div>
      ) : incorrectQuizzes.length === 0 ? (
        <div className="flex justify-center items-center h-[calc(100vh-100px)] text-gray-500">
          틀린 문제가 없습니다
        </div>
      ) : (
        <FlexBox direction="col" className="gap-4">
          {incorrectQuizzes.map((quizData) => (
            <div key={quizData.quiz.id} className="w-full">
              <ReviewNoteCard quizData={quizData} onUpdate={updateQuizReviewStatus} />
            </div>
          ))}
        </FlexBox>
      )}
    </Container>
  );
}
