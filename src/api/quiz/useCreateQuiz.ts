import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface QuizOption {
  optionNumber: number;
  content: string;
  imageId: number | null;
}

interface CreateQuizRequest {
  category: string; // 카테고리 (예: "ALGORITHM")
  type: string; // 퀴즈 유형 (예: "AB_TEST")
  content: string; // 퀴즈 내용
  tags: string[]; // 태그 배열
  options: QuizOption[]; // 옵션 리스트
}

interface CreateQuizResponse {
  id: number;
  category: string;
  type: string;
  content: string;
  tags: string[];
  options: QuizOption[];
  createdAt: string;
  modifiedAt: string;
}

async function createQuiz(requestData: CreateQuizRequest): Promise<CreateQuizResponse> {
  const response = await axiosInstance.post('/quiz', requestData);
  return response.data.result;
}

function useCreateQuiz() {
  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: ['createQuiz'],
    mutationFn: (requestData: CreateQuizRequest) => createQuiz(requestData),
    onError: (error) => {
      console.error('퀴즈 등록 실패:', error);
    },
  });

  return { mutate, isError, isSuccess };
}

export default useCreateQuiz;
