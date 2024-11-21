// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';

// // 댓글 관련 API를 사용하기 위한 커스텀 훅
// export const useComments = (quizId: string) => {
//   const queryClient = useQueryClient();

//   // 1. 댓글 가져오기
//   const { data: comments, isLoading } = useQuery(['comments', quizId], async () => {
//     const response = await axios.get(`/api/quizzes/${quizId}/comments`);
//     return response.data;
//   });

//   // 2. 댓글 등록
//   const { mutate: addComment } = useMutation(
//     async (content: string) => {
//       await axios.post(`/api/quizzes/${quizId}/comments`, { content });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['comments', quizId]); // 댓글 목록 갱신
//       },
//     }
//   );

//   // 3. 댓글 삭제
//   const { mutate: deleteComment } = useMutation(
//     async (commentId: number) => {
//       await axios.delete(`/api/quizzes/${quizId}/comments/${commentId}`);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['comments', quizId]); // 댓글 목록 갱신
//       },
//     }
//   );

//   // 4. 댓글 수정
//   const { mutate: editComment } = useMutation(
//     async ({ commentId, content }: { commentId: number; content: string }) => {
//       await axios.put(`/api/quizzes/${quizId}/comments/${commentId}`, { content });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['comments', quizId]); // 댓글 목록 갱신
//       },
//     }
//   );

//   return {
//     comments,
//     isLoading,
