import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import Card from '@/components/common/Card';
import { Progress } from '@/shadcn/ui/progress';
import { LogOut, CheckCircle, XCircle } from 'lucide-react';
import DragScrollWrapper from '@/components/common/DragScrollWrapper';
import Dialog from '@/components/common/Dialog';
import FlexBox from '@/shared/FlexBox';
import Container from '@/shared/Container';
import defaultImageURL from '@/shared/defaultImage';
import { Question, ScoreUpdateMessage } from '@/types/GameTypes';
import { useGameStore } from '@/stores/useGameStore';

export default function GameProgress() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { players, updateScore } = useGameStore();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showAnswerResult, setShowAnswerResult] = useState<'correct' | 'incorrect' | null>(null);
  const [animateScore, setAnimateScore] = useState<{ [key: number]: boolean }>({});

  const questions: Question[] = [
    {
      id: 1,
      text: 'Q1. React에서 상태 관리를 위해 사용되는 훅은 무엇인가요?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 0,
    },
    {
      id: 2,
      text: 'Q2. React에서 상태 관리를 위해 사용되는 훅은 무엇인가요?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 0,
    },
  ];

  /*
  useEffect(() => {
    connect();
  }, [connect, disconnect]);
  */

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(10);
        setSelectedAnswer(null);
        setShowAnswerResult(null);
      } else {
        navigate('/game/result');
      }
    }
  }, [timeLeft, currentQuestion, questions.length]);

  const handleScoreUpdate = ({ playerId }: ScoreUpdateMessage) => {
    /*
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, score: player.score + increment } : player,
      ),
    );
    */
    setAnimateScore((prev) => ({ ...prev, [playerId]: true }));

    setTimeout(() => {
      setAnimateScore((prev) => ({ ...prev, [playerId]: false }));
    }, 1000);
  };

  const handleAnswer = (userId: number, answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const currentQuestionData = questions[currentQuestion];
    if (currentQuestionData && answerIndex === currentQuestionData.correctAnswer) {
      setShowAnswerResult('correct');
      handleScoreUpdate({ playerId: userId, increment: 10 });
      updateScore(userId, 10);
    } else {
      setShowAnswerResult('incorrect');
    }
  };

  const handleExit = () => {
    navigate('/game');
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <FlexBox direction="col">
      <header className="fixed top-0 left-0 right-0 bg-white z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold">{timeLeft}초</div>
          <Progress value={(timeLeft / 10) * 100} className="w-1/2" />
          <div className="text-lg font-semibold">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
      </header>

      <Container className="pb-32">
        {currentQuestionData && (
          <Card className="mb-4 p-4">
            <h2 className="text-xl font-bold mb-4">{currentQuestionData.text}</h2>
            <div className="grid grid-cols-1 gap-4">
              {currentQuestionData.options.map((option, index) => (
                <ShadcnButton
                  key={index}
                  onClick={() => handleAnswer(1, index)}
                  variant={selectedAnswer === index ? 'default' : 'outline'}
                  className={`w-full justify-start text-left h-auto py-3 px-4 ${
                    showAnswerResult && index === currentQuestionData.correctAnswer
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : showAnswerResult === 'incorrect' && selectedAnswer === index
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : ''
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </ShadcnButton>
              ))}
            </div>
            {showAnswerResult && (
              <div
                className={`mt-4 flex items-center justify-center ${
                  showAnswerResult === 'correct' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {showAnswerResult === 'correct' ? (
                  <CheckCircle className="w-6 h-6 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 mr-2" />
                )}
                <span className="text-lg font-semibold">
                  {showAnswerResult === 'correct' ? '정답입니다!' : '틀렸습니다!'}
                </span>
              </div>
            )}
          </Card>
        )}
      </Container>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white shadow-md z-10 w-full">
        <div className="flex justify-center items-center px-4 pt-2">
          <DragScrollWrapper>
            {players.map((player) => (
              <FlexBox
                key={player.id}
                direction="col"
                className="items-center justify-between text-center relative"
              >
                <Avatar input="image" size="S" image={defaultImageURL} />
                <div className="mt-1 text-sm font-medium whitespace-nowrap">{player.name}</div>
                <div className="mt-1 text-lg font-bold">{player.score}</div>
                {animateScore[player.id] && (
                  <span className="absolute top-0 left-2 text-green-500 font-bold animate-bounce text-xl">
                    +10
                  </span>
                )}
              </FlexBox>
            ))}
          </DragScrollWrapper>
        </div>
        <div className="px-4 py-2 max-w-lg mx-auto">
          <ShadcnButton
            variant="destructive"
            className="w-full mt-2"
            onClick={() => setShowExitConfirmation(true)}
          >
            <LogOut className="mr-2 h-4 w-4" /> 나가기
          </ShadcnButton>
        </div>
      </div>
      <Dialog
        open={showExitConfirmation}
        title="게임에서 나가시겠습니까?"
        description="게임에서 나가면 현재 진행 상황이 모두 사라집니다. 정말 나가시겠습니까?"
        leftText="예"
        rightText="아니요"
        leftOnClick={handleExit}
        rightOnClick={() => setShowExitConfirmation(!showExitConfirmation)}
        onClose={() => setShowExitConfirmation(!showExitConfirmation)}
      />
    </FlexBox>
  );
}
