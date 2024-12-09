import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';

interface AddCommentVariables {
  parentCommentId: number;
  content: string;
}

const addCommentAPI = async ({
  quizId,
  parentCommentId,
  content,
}: {
  quizId: number;
  parentCommentId: number;
  content: string;
}): Promise<void> => {
  await axiosInstance.post('/quiz/comments', {
    quizId,
    parentCommentId,
    content,
  });
};

const useAddComment = (quizId: number) => {
  return useMutation({
    mutationFn: (newComment: AddCommentVariables) => addCommentAPI({ quizId, ...newComment }),
    onError: (error: Error) => {
      console.error('댓글 등록 실패:', error.message);
    },
  });
};

export default useAddComment;
