import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  provider: 'google' | 'kakao' | null;
  setAccessToken: (token: string, provider: 'google' | 'kakao') => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  provider: null,

  setAccessToken: (token, provider) => set({ accessToken: token, provider }),

  clearAuth: () => set({ accessToken: null, provider: null }),
}));
