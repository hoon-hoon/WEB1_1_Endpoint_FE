import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { Provider } from '@/types/AuthType';

const useOAuthHandler = (provider: Provider) => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleLogin = useCallback(() => {
    const redirectURI =
      provider === 'kakao'
        ? import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI
        : import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI;

    // 백엔드 인증 URL로 리다이렉트
    window.location.href = redirectURI;
  }, []);

  const handleRedirectCallback = useCallback(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/main');
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get('token');
    const guest = searchParams.get('guest') === 'true';
    const error = searchParams.get('error');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken, provider);

      if (guest) {
        navigate('/interest');
      } else {
        navigate('/main');
      }
    }

    if (error) {
      const decodedError = decodeURIComponent(error);
      console.error('로그인 실패:', decodedError);
      navigate('/');
      return;
    } else {
      console.error('Access Token이 없습니다.');
      navigate('/');
    }
  }, [setAccessToken, provider]);

  return { handleLogin, handleRedirectCallback };
};

export default useOAuthHandler;
