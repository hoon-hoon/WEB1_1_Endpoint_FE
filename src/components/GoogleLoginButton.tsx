import Button from './common/Button/Button';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

const GoogleLoginButton = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI;
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`;

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    <Button
      label="구글 로그인"
      onClick={handleGoogleLogin}
      color="#FFFFFF"
      textColor="#3c4043"
      borderColor="#CCCCCC"
      size="long"
      icon={<Icon icon="google_color" />}
      iconPosition="left"
      showBorder={true}
    />
  );
};

export default GoogleLoginButton;
