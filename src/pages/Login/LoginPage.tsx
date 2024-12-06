import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Container from '@/components/layout/Container';
import FlexBox from '@/components/layout/FlexBox';
import { SiQuizlet } from 'react-icons/si';

function LoginPage() {
  return (
    <Container className="h-full flex flex-col justify-between">
      {/* Quizy 소개 */}
      <div className="grid place-items-center animate-fadeIn">
        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center">
            <SiQuizlet size={100} color="blue" />
            <span className="text-[80px] font-bold mt-1">uizy</span>
          </div>
          <p className="font-bold text-lg mt-2">개발자를 위한 퀴즈 플랫폼</p>
          {/* <p className="text-gray-700 font-semibold text-md ">
              퀴즈로 배우는 즐거움, 개발 지식을 더 풍부하게!
            </p> */}
        </div>
      </div>

      {/* 소셜 로그인 버튼 */}
      <FlexBox direction="col" className="w-full gap-4 pt-6">
        <span className="text-gray-500 text-sm text-center">SNS 계정으로 간편 가입하기</span>
        <KakaoLoginButton />
        <GoogleLoginButton />
      </FlexBox>
    </Container>
  );
}

export default LoginPage;
