import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import { Comment } from '@/types';

const deleteCommentAPI = async (commentId: number): Promise<void> => {
  await axiosInstance.delete(`/quiz/comments/${commentId}`);
};

const useDeleteComment = (quizId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteCommentAPI(commentId),
    onMutate: async (commentId) => {
      // 이전 상태 저장
      const previousComments = queryClient.getQueryData<Comment[]>(['comments', quizId]);

      // 낙관적 업데이트
      queryClient.setQueryData<Comment[]>(['comments', quizId], (old = []) =>
        old.filter((comment) => comment.id !== commentId),
      );

      return { previousComments };
    },
    onError: (err, _commentId, context) => {
      // 오류 발생 시 이전 상태 복원
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', quizId], context.previousComments);
      }
      console.error('댓글 삭제 실패:', err);
    },
    onSettled: () => {
      // 삭제 후 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['comments', quizId],
      });
    },
  });
};

export default useDeleteComment;
