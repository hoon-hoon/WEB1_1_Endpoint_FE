import axiosInstance from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface UpdateQuizRequest {
  id: number; // 퀴즈 ID
  category?: string;
  type?: string;
  content?: string;
  tags?: string[];
  options?: {
    optionNumber: number;
    content: string;
    imageId: number | null;
  }[];
}

interface UpdateQuizResponse {
  id: number;
  category: string;
  type: string;
  content: string;
  tags: string[];
  options: {
    optionNumber: number;
    content: string;
    imageId: number | null;
  }[];
  updatedAt: string;
}

async function updateQuiz(requestData: UpdateQuizRequest): Promise<UpdateQuizResponse> {
  const { id, ...data } = requestData; // `id`는 URL에 포함되고 나머지는 요청 본문에 포함
  const response = await axiosInstance.put(`/quiz/${id}`, data);
  return response.data.result;
}

function useUpdateQuiz() {
  return useMutation({
    mutationKey: ['updateQuiz'],
    mutationFn: (requestData: UpdateQuizRequest) => updateQuiz(requestData),
    onError: (error) => {
      console.error('퀴즈 수정 실패:', error);
    },
  });
}

export default useUpdateQuiz;
