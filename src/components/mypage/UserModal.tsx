import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import Container from '../layout/Container';
import Card from '../common/Card';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { useUserData } from '@/api/mypage/useUserData';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  const { data: profileData } = useUserData();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  useEffect(() => {
    if (profileData) {
      setPreviewImage(profileData.profileImageUrl);
    }
  }, [profileData]);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify({ name: nickname })], { type: 'application/json' }),
      );

      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await axiosInstance.put('/user/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      onClose();
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패', error);
      alert('프로필 업데이트에 실패했습니다.');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const validateNickname = () => {
    if (nickname.length < 2) {
      setNicknameError('닉네임은 최소 2글자 이상이어야 합니다.');
      return false;
    }
    setNicknameError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateNickname()) {
      updateProfileMutation.mutate();
    }
  };

  if (!isOpen) return null;

  return (
    <Container>
      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      >
        <Card className="w-full max-w-md">
          <div className="relative mb-4">
            <h3 className="text-center text-xl font-bold">프로필 수정</h3>
            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
            >
              <Icon icon="close" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24">
                <img
                  src={previewImage}
                  alt="프로필 이미지"
                  className="h-24 w-24 rounded-full object-cover border border-gray-300"
                />
                <input
                  type="file"
                  id="profileImage"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 h-8 w-8 flex items-center justify-center bg-white rounded-full cursor-pointer opacity-80 hover:bg-gray-100"
                >
                  <Icon icon="gear" size={16} />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                onBlur={validateNickname}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 
                  ${
                    nicknameError
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                placeholder="새로운 닉네임을 입력해주세요"
              />
              {nicknameError && <p className="mt-1 text-sm text-red-500">{nicknameError}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="rounded-lg w-full bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? '저장 중...' : '저장'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
