import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/common/TopBar';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import Card from '@/components/common/Card';
import { CheckCircle2, XCircle, ArrowRight, Medal } from 'lucide-react';
import Container from '@/shared/Container';
import Celebrate from './Celebrate';

export type Rank = 1 | 2 | 3 | 4 | 5 | null;

type GameResult = {
  rank: number;
  totalPlayers: number;
  problems: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
};

export default function Result() {
  const [rank] = useState<Rank>(5);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [showCelebrate, setCelebrate] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCelebrate(false);
    }, 4000);
  });
  const gameResult: GameResult = {
    rank: 2,
    totalPlayers: 5,
    problems: [
      {
        question: 'React에서 상태 관리를 위해 사용되는 훅은 무엇인가요?',
        userAnswer: 'useState',
        correctAnswer: 'useState',
        explanation:
          'useState는 React 컴포넌트에서 상태를 추가하고 관리하는 데 사용되는 기본적인 Hook입니다.',
      },
      {
        question: 'useEffect의 주요 용도는 무엇인가요?',
        userAnswer: '데이터 페칭',
        correctAnswer: '사이드 이펙트 처리',
        explanation:
          'useEffect는 컴포넌트의 렌더링 이후에 실행되며, 주로 사이드 이펙트(데이터 페칭, 구독 설정 등)를 처리하는 데 사용됩니다.',
      },
      {
        question: 'React 컴포넌트의 생명주기 메서드 중 렌더링 직후에 호출되는 메서드는?',
        userAnswer: 'componentDidMount',
        correctAnswer: 'componentDidMount',
        explanation:
          'componentDidMount는 컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출됩니다.',
      },
      {
        question: 'React에서 조건부 렌더링을 구현하는 가장 일반적인 방법은?',
        userAnswer: 'if-else 문',
        correctAnswer: '삼항 연산자',
        explanation:
          'React에서는 주로 삼항 연산자나 && 연산자를 사용하여 JSX 내에서 조건부 렌더링을 구현합니다.',
      },
      {
        question: 'React에서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법은?',
        userAnswer: 'props',
        correctAnswer: 'props',
        explanation:
          'props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 React의 기본적인 메커니즘입니다.',
      },
    ],
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <TopBar />
      {showCelebrate ? (
        <Celebrate rank={rank} show={show} setShow={setShow} />
      ) : (
        <Container>
          <Card>
            <Card className="p-6 mb-6 text-center">
              <div className="flex items-center justify-center mb-4">
                {getMedalIcon(gameResult.rank)}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {gameResult.rank === 1 ? '우승했습니다!' : `${gameResult.rank}등 입니다!`}
              </h2>
              <p className="text-gray-600">
                총 {gameResult.totalPlayers}명 중 {gameResult.rank}등을 기록하셨습니다.
              </p>
            </Card>

            <h3 className="text-xl font-bold mb-4">문제 리스트</h3>
            {gameResult.problems.map((problem, index) => (
              <Card key={index} className="p-6 mb-4">
                <div className="flex items-start gap-4">
                  {problem.userAnswer === problem.correctAnswer ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-medium mb-2">{problem.question}</h4>
                    <p className="text-sm text-gray-600 mb-2">당신의 답변: {problem.userAnswer}</p>
                    {problem.userAnswer !== problem.correctAnswer && (
                      <p className="text-sm text-gray-600 mb-2">정답: {problem.correctAnswer}</p>
                    )}
                    <p className="text-sm text-gray-600">{problem.explanation}</p>
                  </div>
                </div>
              </Card>
            ))}

            <ShadcnButton
              className="w-full h-14 text-lg"
              size="lg"
              onClick={() => navigate('/game')}
            >
              나가기 <ArrowRight className="ml-2 h-5 w-5" />
            </ShadcnButton>
          </Card>
        </Container>
      )}
    </div>
  );
}
