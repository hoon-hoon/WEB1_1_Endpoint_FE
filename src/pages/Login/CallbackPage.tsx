import useOAuthHandler from '@/hooks/useOAuthHandler';

const CallbackPage = ({ provider }: { provider: 'google' | 'kakao' }) => {
  useOAuthHandler(provider);
  console.log('로그인 처리중...');
  return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
