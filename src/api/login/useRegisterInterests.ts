import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

interface RegisterInterestsRequest {
  interests: string[];
}

async function registerInterests(requestData: RegisterInterestsRequest): Promise<void> {
  await axiosInstance.post('/quiz/users/interests', requestData.interests, {});
}

function useRegisterInterests(onSuccess?: () => void, onError?: (error: any) => void) {
  return useMutation({
    mutationKey: ['registerInterests'],
    mutationFn: registerInterests,
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error('관심사 등록 실패:', error);
      if (onError) onError(error);
    },
  });
}

export default useRegisterInterests;
