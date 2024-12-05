import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

export interface UserData {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
  rating: number;
  totalAnswered: number;
  correctRate: number;
  achievements: string[];
}

const getUserData = async (): Promise<UserData> => {
  const response = await axiosInstance.get('/user/me');
  return response.data.result;
};

export const useUserData = () => {
  return useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: getUserData,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
