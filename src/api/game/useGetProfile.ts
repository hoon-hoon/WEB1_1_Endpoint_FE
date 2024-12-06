import axiosInstance from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

async function fetchProfile() {
  const response = await axiosInstance.get('/user/me');
  return response.data.result;
}

function useGetProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['useGetProfile'],
    queryFn: fetchProfile,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, error };
}

export default useGetProfile;
