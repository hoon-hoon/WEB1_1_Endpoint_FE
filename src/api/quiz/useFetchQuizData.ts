import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { toKoreanCategory } from '@/utils/categoryConverter';

interface QuizData {
  type: string;
  category: string;
  content: string;
  options: { optionNumber: number; content: string; imageId?: number | null }[];
  answerNumber?: number | null;
  explanation?: string;
  tags: string[];
}
// 이미지 URL 가져오기 (미리보기용)
export const fetchImageUrl = async (imageId: number | null): Promise<string | null> => {
  if (!imageId) return null;
  try {
    const response = await axiosInstance.get(`/quiz/images/${imageId}`);
    return response.data.result.url;
  } catch (error) {
    console.error(`이미지 URL 가져오기 실패 (ID: ${imageId}):`, error);
    return null;
  }
};

// 퀴즈 데이터 가져오기
const fetchQuizData = async (id: string): Promise<QuizData> => {
  if (!id) {
    throw new Error('퀴즈 ID가 필요합니다.');
  }

  try {
    const response = await axiosInstance.get(`/quiz/${id}`);
    const { result } = response.data;

    return {
      type: result.type,
      category: toKoreanCategory(result.category),
      content: result.content,
      options: result.options.map((option: any) => ({
        optionNumber: option.optionNumber,
        content: option.content,
        imageId: option.imageId,
      })),
      answerNumber: result.answerNumber || null,
      explanation: result.explanation || '',
      tags: result.tags || [],
    };
  } catch (error) {
    console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// React Query 훅
export const useFetchQuizData = (id: string) => {
  return useQuery({
    queryKey: ['quizData', id],
    queryFn: () => fetchQuizData(id),
    enabled: !!id, // ID가 존재할 때만 실행
    staleTime: 1000 * 60, // 1분 동안 캐시 데이터 유지
    retry: 2, // 실패 시 2회 재시도
  });
};

export default useFetchQuizData;
