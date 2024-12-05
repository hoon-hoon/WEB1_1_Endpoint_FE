import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventSource, initializeEventSource } from '@/api/game/useEventSource';
import { useStompStore } from '@/api/game/useStompStore';
import { useDeleteRandom } from '@/api/game/useRandomMatch';
import { useGameStore } from '@/stores/useGameStore';
import { Loader2 } from 'lucide-react';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import LoadingSpinner from '@/components/game/LoadingSpinner';

type MatchEvent = {
  roomId: number;
};
export default function RandomMatching() {
  const navigate = useNavigate();
  const { mutate: deleteRandomMatch } = useDeleteRandom();
  const { connectPromise, joinGame } = useStompStore();
  const { updateId } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  const isFirstRequest = useRef(false);

  useEffect(() => {
    initializeEventSource();

    if (isFirstRequest.current) {
      // 이미 처리된 요청이면 무시
      return;
    }
    eventSource.addEventListener('MATCHING', async (event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData: MatchEvent = JSON.parse(messageEvent.data);
        updateId(parsedData.roomId);
        if (parsedData.roomId) {
          setIsLoading(true);
          await connectPromise(parsedData.roomId);
          await joinGame(parsedData.roomId);
          setTimeout(() => {
            navigate('/game/play');
          }, 3000);
        }
      } catch (error) {
        console.error('Error', error);
      }
    });

    return () => {
      eventSource.onmessage = null;
      eventSource.close();
    };
  }, []);

  const cancleMatch = () => {
    deleteRandomMatch();
    eventSource.close();
    navigate('/game');
  };

  return (
    <div className="flex flex-col">
      <TopBar leftIcon="left" leftText="랜덤 매칭" onClickLeft={() => cancleMatch()} />
      {isLoading && <LoadingSpinner />}
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
          <ShadcnButton className="w-full h-14 text-lg" size="lg" onClick={() => cancleMatch()}>
            게임 취소
          </ShadcnButton>
          {/*}
          {matchStatus === '실패' && <button>재시도</button>}
          */}
        </div>
      </main>
    </div>
  );
}
