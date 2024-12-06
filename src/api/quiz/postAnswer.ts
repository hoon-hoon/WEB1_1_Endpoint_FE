import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

const submitAnswerAPI = async (quizId: number, choiceNumber: number): Promise<void> => {
  const requestData = { quizId, choiceNumber };
  const response = await axiosInstance.post('/quiz/user-answers', requestData);
  console.log('API 응답:', response.data);
};

export const usePostAnswer = () =>
  useMutation<void, Error, { quizId: number; choiceNumber: number }>({
    mutationFn: ({ quizId, choiceNumber }) => submitAnswerAPI(quizId, choiceNumber),
  });
