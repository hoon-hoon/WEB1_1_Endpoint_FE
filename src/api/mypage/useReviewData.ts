import axiosInstance from '@/api/axiosInstance';
import { QuizWithAnswer } from '@/types/WrongQuizTypes';

export const fetchIncorrectAnswers = async () => {
  const response = await axiosInstance.get<{ result: { content: QuizWithAnswer[] } }>(
    '/quiz/user-answers/incorrect',
  );
  return response.data.result.content;
};

export const updateQuizReviewStatus = async (quizId: number) => {
  const response = await axiosInstance.patch('/quiz/user-answers', {
    quizId: quizId,
    reviewStatus: 'UNDERSTOOD',
  });
  return response.data;
};
