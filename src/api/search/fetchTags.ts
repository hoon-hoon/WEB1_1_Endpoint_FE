import axiosInstance from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

const fetchTagsAPI = async (): Promise<string[]> => {
  const response = await axiosInstance.get('/quiz/search/trending');
  console.log('인기 태그 응답 데이터:', response.data);
  return response.data.result.keywords;
};

const useGetTags = () => {
  return useQuery<string[], Error>({
    queryKey: ['trendingTags'],
    queryFn: fetchTagsAPI,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetTags;
