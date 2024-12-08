import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QuizWithAnswer } from '@/types/WrongQuizTypes';
import { fetchIncorrectAnswers, updateQuizReviewStatus } from '@/api/mypage/useReviewData';

export const useReviewNote = () => {
  const queryClient = useQueryClient();

  const {
    data: incorrectQuizzes = [],
    isPending,
    isError,
    error,
  } = useQuery<QuizWithAnswer[], Error>({
    queryKey: ['incorrectQuizzes'],
    queryFn: fetchIncorrectAnswers,
  });

  const updateQuizReviewStatusMutation = useMutation({
    mutationFn: updateQuizReviewStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incorrectQuizzes'] });
    },
    onError: (error) => {
      console.error('오답노트 상태 업데이트 실패:', error);
    },
  });

  return {
    incorrectQuizzes,
    isPending,
    isError,
    error,
    updateQuizReviewStatus: updateQuizReviewStatusMutation.mutate,
  };
};
