import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';

const deleteCommentAPI = async (commentId: number): Promise<void> => {
  const response = await axiosInstance.delete(`/quiz/comments/${commentId}`);
  console.log('댓글 삭제 응답:', response.data);
};

const useDeleteComment = (quizId: number) => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteComment', quizId],
    mutationFn: (commentId: number) => deleteCommentAPI(commentId),
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
