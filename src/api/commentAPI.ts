import { Comment } from '@/types';
import axiosInstance from './axiosInstance';

// 댓글 조회 API
export const fetchCommentsAPI = async (quizId: number): Promise<Comment[]> => {
  const response = await axiosInstance.get(`/quiz/comments`, { params: { quizId } });
  console.log('댓글 조회 응답:', response.data);
  return response.data.result;
};

// 댓글 등록 API


// 댓글 수정 API
export const updateCommentAPI = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}): Promise<void> => {
  const response = await axiosInstance.put(`/quiz/comments/${commentId}`, { content });
  console.log('댓글 수정 응답:', response.data);
};

// 댓글 삭제 API
export const deleteCommentAPI = async (commentId: number): Promise<void> => {
  const response = await axiosInstance.delete(`/quiz/comments/${commentId}`);
  console.log('댓글 삭제 응답:', response.data);
};
