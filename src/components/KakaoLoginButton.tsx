import { Button } from "@/shadcn/ui/button";
import Icon from "@eolluga/eolluga-ui/icon/Icon";

const KakaoLoginButton = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    // <Button
    //   variant="kakao"
    //   size="lg"
    //   className="w-full flex items-center justify-center  gap-2 text-lg"
    //   onClick={handleKakaoLogin}
    // >
    //   <Icon icon="kakaotalk_login" size={36} />
    //   <span className="text-base font-semibold ">카카오로 시작하기</span>
    // </Button>
    <Button
      variant="kakao"
      size="lg"
      className="w-full flex items-center justify-center  gap-2 text-lg py-6 "
      onClick={handleKakaoLogin}
    >
      <Icon icon="kakaotalk_login" size={48} />
      <span className="text-[17px] font-semibold ">카카오로 시작하기</span>
    </Button>
  );
};

export default KakaoLoginButton;
