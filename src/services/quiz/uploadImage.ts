import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';

export const uploadImage = async (file: File): Promise<number> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('Uploading image:', file.name);
    const response = await axiosInstance.post('/quiz/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('이미지 업로드 성공:', response.data);

    // id-APekdxY의 형태로 동적 키가 생성됨 따라서 id-로 시작하는 키를 찾아서 이미지 ID를 추출
    const result = response.data.result;
    const dynamicKey = Object.keys(result).find((key) => key.startsWith('id-'));
    const imageId = dynamicKey ? result[dynamicKey] : null;

    if (!imageId) {
      throw new Error('이미지 ID를 추출할 수 없습니다.');
    }

    return imageId;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Axios Error:', error.response?.status, error.response?.data);
      throw new Error(`이미지 업로드 실패: ${error.response?.data?.message || error.message}`);
    } else {
      console.error('Unknown Error:', error);
      throw new Error('알 수 없는 에러가 발생했습니다.');
    }
  }
};
