import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

interface UseWithdrawOptions {
  onError?: () => void;
}

const withdrawUser = async () => {
  const response = await axiosInstance.delete('/user/me');
  return response.data;
};

export const useWithdrawUser = (options?: UseWithdrawOptions) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: withdrawUser,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      navigate('/', {
        replace: true,
      });
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패', error);
      options?.onError?.();
    },
  });
};
