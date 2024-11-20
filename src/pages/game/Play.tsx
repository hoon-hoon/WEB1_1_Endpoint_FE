import { useState, useEffect } from 'react';
import TopBar from '@/components/common/TopBar';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Dialog from '@/components/common/Dialog';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import Container from '@/shared/Container';
import Card from '@/components/common/Card';
import { Progress } from '@/shadcn/ui/progress';
import { Medal, LogOut, CheckCircle, XCircle } from 'lucide-react';
import defaultImageURL from '@/shared/defaultImage';

type Player = {
  id: number;
  name: string;
  avatar: string;
  score: number;
};

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
};

export default function GameProgress() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showAnswerResult, setShowAnswerResult] = useState<'correct' | 'incorrect' | null>(null);
  const [animateScore, setAnimateScore] = useState(false);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', avatar: '/placeholder.svg', score: 0 },
    { id: 2, name: 'Player 2', avatar: '/placeholder.svg', score: 0 },
    { id: 3, name: 'Player 3', avatar: '/placeholder.svg', score: 0 },
    { id: 4, name: 'Player 4', avatar: '/placeholder.svg', score: 0 },
    { id: 5, name: 'Player 5', avatar: '/placeholder.svg', score: 0 },
  ]);

  const questions: Question[] = [
    {
      id: 1,
      text: 'React에서 상태 관리를 위해 사용되는 훅은 무엇인가요?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 0,
    },
    {
      id: 2,
      text: 'React에서 상태 관리를 위해 사용되는 훅은 무엇인가요?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 0,
    },
    {
      id: 3,
      text: 'React에서 상태 관리를 위해 사용되는 훅은 무엇인가요?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 0,
    },
  ];

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
        // End game
      }
    }
  }, [timeLeft, currentQuestion, questions.length]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const currentQuestionData = questions[currentQuestion];
    if (currentQuestionData && answerIndex === currentQuestionData.correctAnswer) {
      setShowAnswerResult('correct');
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === 1 ? { ...player, score: player.score + 10 } : player,
        ),
      );
      setAnimateScore(true);
      setTimeout(() => setAnimateScore(false), 1000);
    } else {
      setShowAnswerResult('incorrect');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const handleExit = () => {
    setShowExitConfirmation(true);
  };
  /*
  const confirmExit = () => {
    console.log('Exiting the game');
  };
  */

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="flex flex-col">
      <TopBar />
      <Container className="overflow-y-auto">
        <Card className="mb-4">
          <div className="text-2xl font-bold text-center mb-2">남은 시간: {timeLeft}초</div>
          <Progress value={(timeLeft / 10) * 100} className="w-full" />
        </Card>

        {currentQuestionData && (
          <Card className="mb-4">
            <h2 className="text-xl font-bold mb-4">{currentQuestionData.text}</h2>
            <div className="grid grid-cols-1 gap-4">
              {currentQuestionData.options.map((option, index) => (
                <ShadcnButton
                  key={index}
                  onClick={() => handleAnswer(index)}
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

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">점수판</h3>
          <div className="space-y-4">
            {sortedPlayers.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar input="image" image={defaultImageURL} size="S" />
                  <span className="font-medium">
                    {player.name}
                    {index === 0 && <Medal className="inline-block ml-2 h-5 w-5 text-yellow-500" />}
                  </span>
                </div>
                <div className="relative">
                  <span className="font-bold">{player.score}</span>
                  {player.id === 1 && animateScore && (
                    <span className="absolute -top-6 right-0 text-green-500 font-bold animate-bounce">
                      +10
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Container>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <ShadcnButton onClick={handleExit} variant="destructive" className="w-full h-12 text-lg">
          <LogOut className="mr-2 h-4 w-4" /> 나가기
        </ShadcnButton>
      </div>
      <Dialog
        open={showExitConfirmation}
        title="게임에서 나가시겠습니까?"
        description="게임에서 나가면 현재 진행 상황이 모두 사라집니다. 정말 나가시겠습니까?"
        leftText="예"
        rightText="아니요"
        leftOnClick={() => setShowExitConfirmation(!showExitConfirmation)}
        rightOnClick={() => setShowExitConfirmation(!showExitConfirmation)}
        onClose={() => setShowExitConfirmation(!showExitConfirmation)}
      />
    </div>
  );
}
