import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import TopBar from '@/components/common/TopBar';
import Button from '@/components/common/Button/Button';
import FlexBox from '@/shared/FlexBox';

export default function RandomMatching() {
  const navigate = useNavigate();

  return (
    <FlexBox direction="col">
      <TopBar leftIcon="left" leftText="랜덤 매칭" onClickLeft={() => navigate(-1)} />
      <main className="flex-1 pt-20 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="p-6 mb-6 bg-white border rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
              <h2 className="text-xl font-bold text-center mb-2">매칭 중...</h2>
              <p className="text-center text-gray-600 mb-4">
                다른 플레이어를 찾고 있습니다. 잠시만 기다려주세요.
              </p>
            </div>
          </div>
          <Button label="매칭 취소" size="long" onClick={() => navigate('/game')} />
        </div>
      </main>
    </FlexBox>
  );
}
