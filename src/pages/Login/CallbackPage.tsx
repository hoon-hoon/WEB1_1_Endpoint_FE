import useOAuthHandler from '@/hooks/useOAuthHandler';

const CallbackPage = ({ provider }: { provider: 'google' | 'kakao' }) => {
  useOAuthHandler(provider);

  return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
