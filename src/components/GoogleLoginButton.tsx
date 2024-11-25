import { Button } from "@/shadcn/ui/button";
import Icon from "@eolluga/eolluga-ui/icon/Icon";

const GoogleLoginButton = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI;
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`;

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    // <Button
    //   variant="google"
    //   size="lg"
    //   className="w-full flex items-center justify-center gap-2 text-lg"
    //   onClick={handleGoogleLogin}
    // >
    //   <Icon icon="google_color" size={36} />
    //   <span className="text-base font-semibold">구글로 시작하기</span>
    // </Button>
    <Button
      variant="google"
      size="lg"
      className="w-full flex items-center justify-center gap-2 text-xl py-6"
      onClick={handleGoogleLogin}
    >
      <Icon icon="google_color" size={48} />
      <span className="text-[17px] font-semibold">구글로 시작하기</span>
    </Button>
  );
};

export default GoogleLoginButton;
