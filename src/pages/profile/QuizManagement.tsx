import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteQuiz from '@/api/quiz/useDeleteQuiz';
import { useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import { Button } from '@/shadcn/ui/button';
import Container from '@/components/layout/Container';
import FlexBox from '@/components/layout/FlexBox';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import BadgeIcon from '@eolluga/eolluga-ui/Display/BadgeIcon';
import Dialog from '@/components/common/Dialog';
import { convertQuizTypeForURL, convertQuizTypeForDisplay } from '@/utils/quizTypeConverter';

export default function MyQuizManagement() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 무한 스크롤용 상태
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null); // 선택한 퀴즈 ID
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // 모달 표시 여부

  // API 호출 함수
  const fetchQuizzes = async (page: number) => {
    setIsFetching(true);
    const size = 10; // 페이지 크기
    const response = await axiosInstance.get('/quiz/my-quizzes', {
      params: { page, size },
    });

    const data = response.data.result;
    setQuizzes((prev) => [...prev, ...data.content]); // 기존 데이터에 새 데이터를 추가
    setHasNext(!data.last); // 다음 페이지가 있는지 여부 설정
    setIsFetching(false);
  };

  useEffect(() => {
    fetchQuizzes(page); // 초기 데이터 로드
  }, [page]);

  // 무한 스크롤 처리
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isFetching &&
      hasNext
    ) {
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, hasNext]);

  // 관리 페이지로 돌아왔을 때 캐시를 무효화하여 최신 데이터 Fetch
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['myQuizzes'] });
  }, [queryClient]);

  // 수정 페이지로 이동
  const handleEdit = (quizType: string, id: number) => {
    const urlType = convertQuizTypeForURL(quizType);
    navigate(`/quiz/edit/${urlType}/${id}`);
  };

  const { mutate: deleteQuiz } = useDeleteQuiz({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myQuizzes'] }); // 캐시 무효화
      console.log('퀴즈가 성공적으로 삭제되었습니다.');
      setShowDeleteDialog(false); // 모달 닫기
    },
    onError: (error) => {
      console.error('퀴즈 삭제 실패:', error);
      setShowDeleteDialog(false); // 모달 닫기
    },
  });

  const handleDeleteConfirm = () => {
    if (selectedQuizId) {
      deleteQuiz(selectedQuizId);
    }
  };

  const handleDelete = (id: number) => {
    setSelectedQuizId(id); // 선택된 퀴즈 ID 저장
    setShowDeleteDialog(true);
  };

  // 문제 풀이 여부 확인 함수
  const isQuizSolved = (options: { selectionCount: number }[]) => {
    return options.some((option) => option.selectionCount > 0);
  };

  if (isFetching && quizzes.length === 0) return <p>로딩 중...</p>;

  return (
    <Container>
      <TopBar leftIcon="left" leftText="내 퀴즈 관리" onClickLeft={() => navigate('/profile')} />
      <FlexBox>
        <div className="w-full space-y-3">
          {quizzes.map((quiz) => {
            const solved = isQuizSolved(quiz.options);

            return (
              <Card key={quiz.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p
                      className="text-gray-900 mb-1 break-words"
                      style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 1, // 최대 2줄로 제한
                        WebkitBoxOrient: 'vertical', // 다중 라인 클램프 설정
                      }} //TODO: line-clamp로 최적화 가능?
                    >
                      {quiz.content}
                    </p>
                    <span className="text-sm text-neutral-500">
                      {convertQuizTypeForDisplay(quiz.type)}
                    </span>
                  </div>
                  {/* 수정 버튼 */}
                  <Button
                    onClick={() => handleEdit(quiz.type, quiz.id)}
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-1 ml-4 ${solved ? 'opacity-80 pointer-events-none' : ''}`}
                  >
                    {solved ? (
                      <BadgeIcon icon="warning_circle_outlined" size={24} state="warning" />
                    ) : (
                      <Icon icon="paper_square" size={24} />
                    )}
                  </Button>

                  {/* 삭제 버튼 */}
                  <Button
                    onClick={() => handleDelete(quiz.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 ml-1"
                  >
                    <Icon icon="delete" size={24} className="fill-Red-60" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </FlexBox>
      <Dialog
        open={showDeleteDialog}
        title="삭제 확인"
        description="정말로 이 퀴즈를 삭제하시겠습니까?"
        leftText="삭제"
        rightText="취소"
        leftOnClick={handleDeleteConfirm}
        rightOnClick={() => setShowDeleteDialog(false)}
        onClose={() => setShowDeleteDialog(false)}
      />
    </Container>
  );
}
