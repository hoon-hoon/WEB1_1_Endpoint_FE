import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import KakaoLoginButton from '@/components/KakaoLoginButton';
import defaultImageURL from '@/shared/defaultImage';

function LoginPage() {
  return (
    <div className="flex flex-col h-screen ">
      {/* Quizy 소개 및 프로필 */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <Avatar input="image" image={defaultImageURL} size="XL" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Quizy</h2>
          <p className="text-gray-600 mb-6 text-sm">개발자를 위한 퀴즈 플랫폼</p>
        </div>
      </div>

      {/* 소셜 로그인 버튼 */}
      <div className="flex flex-col items-center gap-4 pb-8">
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
}

export default LoginPage;
