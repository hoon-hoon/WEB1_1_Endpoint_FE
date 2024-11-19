import Button from './common/Button/Button';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

const KakaoLoginButton = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Button
      label="카카오 로그인"
      onClick={handleKakaoLogin}
      color="#FEE500"
      textColor="#3c4043"
      borderColor="#CCCCCC"
      size="long"
      icon={<Icon icon="kakaotalk_login" />}
      iconPosition="left"
      showBorder={true}
    />
  );
};

export default KakaoLoginButton;
