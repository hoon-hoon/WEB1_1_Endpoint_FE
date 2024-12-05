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
  console.log('퀴즈 수정 성공:', response.data);
  return response.data.result;
}

function useUpdateQuiz(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
}) {
  return useMutation({
    mutationKey: ['updateQuiz'],
    mutationFn: updateQuiz,
    ...options, // 동적으로 전달된 옵션을 적용
  });
}

export default useUpdateQuiz;
