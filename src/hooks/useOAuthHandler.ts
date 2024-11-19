import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

type Provider = 'google' | 'kakao';

const useOAuthHandler = (provider: Provider) => {
  const navigate = useNavigate();
  const processedRef = useRef(false);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    if (processedRef.current) return;

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    console.log('code: ', code);

    if (code) {
      axios
        .get('/mock-auth.json') // 임시 로그인 정보 mock-auth.json 파일

        // .post(`/api/v1/oauth2/callback/${provider}`, { code }, { withCredentials: true })
        .then((response) => {
          console.log('Response data:', response.data.result);
          const { accessToken } = response.data.result;

          // 액세스 토큰 저장
          setAccessToken(accessToken, provider);

          // 리다이렉트
          navigate('/');
        })
        .catch((error) => {
          console.error(`${provider} 로그인 실패:`, error);
          navigate('/login', { replace: true });
        });
    } else {
      navigate('/', { replace: true });
    }

    processedRef.current = true;
  }, [navigate, provider, setAccessToken]);

  return null;
};

export default useOAuthHandler;
