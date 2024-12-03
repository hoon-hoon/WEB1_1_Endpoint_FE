import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const withdrawUser = async () => {
  const response = await axiosInstance.delete('/user/me');
  return response.data;
};

export const useWithdrawUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: withdrawUser,
    onSuccess: () => {
      localStorage.removeItem('accessToken');

      navigate('/', {
        replace: true,
        state: {
          message: '회원 탈퇴가 완료되었습니다.',
        },
      });
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    },
  });
};
