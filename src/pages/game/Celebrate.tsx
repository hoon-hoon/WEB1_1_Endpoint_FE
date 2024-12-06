import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Card from '@/components/common/Card';
import { Trophy, Medal, Award, Smile } from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';

interface CelebrateProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function Celebrate({ show, setShow }: CelebrateProps) {
  const { rank } = useGameStore();
  useEffect(() => {
    setShow(true);
    if (rank === 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    setTimeout(() => setShow(false), 3500); // 애니메이션 후 show를 false로 변경
  }, [rank, setShow]);

  const renderIcon = () => {
    if (rank === 1) {
      return <Trophy className="w-24 h-24 text-yellow-500" />;
    } else if (rank === 2) {
      return <Medal className="w-24 h-24 text-gray-500" />;
    } else if (rank === 3) {
      return <Award className="w-24 h-24 text-orange-500" />;
    } else {
      return <Smile className="w-24 h-24 text-gray-500" />;
    }
  };

  const renderMessage = () => {
    if (rank === 1) {
      return '축하합니다! 1등입니다!';
    } else if (rank === 2) {
      return '축하합니다! 2등입니다!';
    } else if (rank === 3) {
      return '축하합니다! 3등입니다!';
    } else {
      return '수고하셨습니다!';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div
          className={`${
            show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          } transition-transform transition-opacity duration-500 ease-out bg-gray-100 rounded-full p-6 inline-block mb-6`}
        >
          {renderIcon()}
        </div>
        <h1
          className={`${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-700 delay-100 text-4xl font-bold mb-4`}
        >
          {renderMessage()}
        </h1>
        <p
          className={`${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-700 delay-200 text-xl mb-8`}
        >
          {rank === 1
            ? '당신이 최고야!'
            : rank === 2
              ? '훌륭한 성과입니다!'
              : rank === 3
                ? '충분히 좋은 결과를 얻으셨습니다!'
                : '다음에는 더 좋은 결과가 있을 거예요!'}
        </p>
      </Card>
    </div>
  );
}
