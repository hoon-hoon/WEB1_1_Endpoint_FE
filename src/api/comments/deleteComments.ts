import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';

const deleteCommentAPI = async (commentId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/quiz/comments/${commentId}`);
    console.log('댓글 삭제 응답 성공:', response.data);
  } catch (error) {
    console.error('댓글 삭제 API 호출 실패:', error);
    throw error;
  }
};

const useDeleteComment = (quizId: number) => {
  return useMutation({
    mutationKey: ['deleteComment', quizId],
    mutationFn: (commentId: number) => {
      return deleteCommentAPI(commentId);
    },
    onSuccess: () => {
      console.log('댓글 삭제 성공');
      //   queryClient.invalidateQueries(['comments', quizId]);
    },
    onError: (error: Error) => {
      console.error('댓글 삭제 실패:', error.message);
    },
  });
};

export default useDeleteComment;
