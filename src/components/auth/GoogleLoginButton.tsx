import { Button } from '@/shadcn/ui/button';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import useOAuthHandler from '@/hooks/useOAuthHandler';

const GoogleLoginButton = () => {
  const { handleLogin } = useOAuthHandler('google');

  const handleGoogleLogin = () => {
    handleLogin();
  };

  return (
    <Button
      variant="google"
      size="lg"
      className="w-full flex items-center justify-center gap-2 text-xl py-6"
      onClick={handleGoogleLogin}
    >
      <Icon icon="google_color" size={48} />
      <span className="text-lg font-semibold">구글로 시작하기</span>
    </Button>
  );
};

export default GoogleLoginButton;
