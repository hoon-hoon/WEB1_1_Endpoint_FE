import axiosInstance from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

const fetchTagsAPI = async (): Promise<string[]> => {
  const response = await axiosInstance.get('/quiz/search/trending');
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
