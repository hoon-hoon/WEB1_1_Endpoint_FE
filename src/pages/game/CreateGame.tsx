import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/common/TopBar';
import DropDown from '@/components/common/DropDown';
import NumberStepper from '@eolluga/eolluga-ui/Input/NumberStepper';
import Container from '@/shared/Container';
import FlexBox from '@/shared/FlexBox';
import Label from '@/shared/Label';
import Card from '@/components/common/Card';
import { Button as ShadcnButton } from '@/shadcn/ui/button';

const topics = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Machine Learning',
  'Data Structures',
  'Algorithms',
  'Web Development',
  'Mobile Development',
  'Database Systems',
];

type Difficulty = '하' | '중' | '상';
const difficulties: Difficulty[] = ['하', '중', '상'];

export default function CreateGame() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty | string>('');
  const [quizCount, setQuizCount] = useState(5);

  const handleCount = (count: React.SetStateAction<number>) => {
    const newCount = typeof count === 'number' ? count : Number(count);
    if (newCount >= 5 && newCount <= 20) {
      setQuizCount(newCount);
    }
  };

  return (
    <FlexBox direction="col">
      <TopBar leftIcon="left" leftText="게임 방 생성" onClickLeft={() => navigate(-1)} />
      <Container>
        <Card>
          <div className="pb-8">
            <Label content="퀴즈 주제" htmlFor="room-name" />
            <DropDown
              items={topics}
              selectedItem={topic}
              setItem={setTopic}
              placeholder="퀴즈 주제를 입력하세요"
            />
          </div>
          <div className="pb-8">
            <Label content="난이도" htmlFor="difficulty" />
            <DropDown
              items={difficulties}
              selectedItem={difficulty}
              setItem={setDifficulty}
              placeholder="난이도를 선택하세요"
            />
          </div>
          <div>
            <Label content="문제 갯수" htmlFor="quiz-count" />
            <NumberStepper
              count={quizCount}
              setCount={(count) => handleCount(count)}
              width={'long'}
              size={'M'}
              description="최소 5문제부터 최대 20문제까지 가능합니다"
            />
          </div>
        </Card>

        <ShadcnButton
          className="w-full h-14 text-lg"
          size="lg"
          onClick={() => navigate('/game/waiting', { state: { topic, difficulty, quizCount } })}
        >
          방 생성하기
        </ShadcnButton>
      </Container>
    </FlexBox>
  );
}
