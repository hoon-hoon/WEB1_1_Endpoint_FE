import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ACCESS_TOKEN_KEY = 'accessToken';

type AuthState = {
  accessToken: string | null;
  provider: 'google' | 'kakao' | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string, provider: 'google' | 'kakao') => void;
  clearAuth: () => void;
};

export const useAuthStore = create(
  // [May]: persist를 사용하여 영속 상태 관리 로직을 개선해보시는게 좋을거같습니다.
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      provider: null,
      isAuthenticated: false,
      setAccessToken: (token, provider) =>
        set({ accessToken: token, provider, isAuthenticated: true }),
      clearAuth: () => set({ accessToken: null, provider: null, isAuthenticated: false }),
    }),
    {
      name: ACCESS_TOKEN_KEY,
    },
  ),
);
