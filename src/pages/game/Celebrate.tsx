import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Card from '@/components/common/Card';
import { Trophy, Medal, Award, Smile } from 'lucide-react';
import { Rank } from './Result';

interface CelebrateProps {
  rank: Rank;
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function Celebrate({ rank, show, setShow }: CelebrateProps) {
  useEffect(() => {
    setShow(true);
    if (rank === 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    setTimeout(() => setShow(true), 100);
  }, []);

  const rankInfo = {
    1: {
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      message: '축하합니다! 1등입니다!',
    },
    2: {
      icon: Medal,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
      message: '축하합니다! 2등입니다!',
    },
    3: {
      icon: Award,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      message: '축하합니다! 3등입니다!',
    },
    4: {
      icon: Smile,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      message: '고생하셨습니다! 4등입니다!',
    },
    5: {
      icon: Smile,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      message: '고생하셨습니다! 5등입니다!',
    },
  };

  const {
    icon: Icon,
    color,
    bgColor,
    message,
  } = rank
    ? rankInfo[rank]
    : { icon: Award, color: 'text-blue-500', bgColor: 'bg-blue-100', message: '수고하셨습니다!' };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div
          className={`${
            show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          } transition-transform transition-opacity duration-500 ease-out ${bgColor} ${color} rounded-full p-6 inline-block mb-6`}
        >
          <Icon className="w-24 h-24" />
        </div>
        <h1
          className={`${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-700 delay-100 text-4xl font-bold mb-4`}
        >
          {message}
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
        <div
          className={`${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-700 delay-300`}
        ></div>
      </Card>
    </div>
  );
}
