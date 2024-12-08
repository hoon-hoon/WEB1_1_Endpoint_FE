import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

const toggleLikeAPI = (quizId: number) => {
  const requestData = { quizId };
  return axiosInstance.post('/quiz/likes', requestData).then((res) => {
    return res.data;
  });
};

export const useToggleLike = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: Error) => void,
) => {
  return useMutation<void, Error, number>({
    mutationFn: toggleLikeAPI,
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      console.error('좋아요 요청 실패:', error);
      if (onErrorCallback) onErrorCallback(error);
    },
  });
};
