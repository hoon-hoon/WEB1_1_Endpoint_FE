import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventSource, initializeEventSource } from '@/api/game/useEventSource';
import { useStompStore } from '@/api/game/useStompStore';
import { useDeleteRandom } from '@/api/game/useRandomMatch';
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
  const { connect, joinGame } = useStompStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeEventSource();

    eventSource.addEventListener('MATCHING', (event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData: MatchEvent = JSON.parse(messageEvent.data);
        console.log(JSON.parse(messageEvent.data));
        if (parsedData) {
          connect(parsedData.roomId);
          joinGame(parsedData.roomId);
          setIsLoading(true);
          setTimeout(() => {
            navigate('/game/play');
          }, 1500);
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

  /*
  const [matchStatus, setMatchStatus] = useState('매칭 중...');
  const [isMatching, setIsMatching] = useState(true);

  const url = 'https://quizy.n-e.kr/api/matching/subscribe';
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (e) {
        console.error('Error parsing SSE data:', e);
        setError(e);
      }
    };

    eventSource.onerror = (e) => {
      console.error('SSE error:', e);
      setError(e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  */
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
