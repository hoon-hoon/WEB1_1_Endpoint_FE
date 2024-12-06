import { Button } from '@/shadcn/ui/button';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import useOAuthHandler from '@/hooks/useOAuthHandler';

const KakaoLoginButton = () => {
  const { handleLogin } = useOAuthHandler('kakao');

  const handleKakaoLogin = () => {
    handleLogin();
  };

  return (
    <Button
      variant="kakao"
      size="lg"
      className="w-full flex items-center justify-center gap-2 text-lg py-6 "
      onClick={handleKakaoLogin}
    >
      <Icon icon="kakaotalk_login" size={48} />
      <span className="text-lg font-semibold ">카카오로 시작하기</span>
    </Button>
  );
};

export default KakaoLoginButton;
