import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import { Button as ShadcnButton } from '@/shadcn/ui/button';

export default function RandomMatching() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <TopBar leftIcon="left" leftText="랜덤 매칭" onClickLeft={() => navigate(-1)} />
      <main className="flex-1 pt-20 pb-6 px-4">
        <Card>
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-center mb-2">매칭 중...</h2>
            <p className="text-center text-gray-600 mb-4">
              다른 플레이어를 찾고 있습니다. 잠시만 기다려주세요.
            </p>
          </div>
        </Card>
        <div className="max-w-xl mx-auto">
          <ShadcnButton className="w-full h-14 text-lg" size="lg" onClick={() => navigate('/game')}>
            게임 취소
          </ShadcnButton>
        </div>
      </main>
    </div>
  );
}
