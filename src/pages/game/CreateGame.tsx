import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/common/TopBar';
import Dropdown from '@/components/common/Dropdown';
import NumberStepper from '@eolluga/eolluga-ui/Input/NumberStepper';
import Button from '@/components/common/Button/Button';

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
    <div className="bg-gray-50 flex flex-col">
      <TopBar leftIcon="left" leftText="게임 방 생성" onClickLeft={() => navigate(-1)} />

      <main className="flex-1 pt-20 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="p-6 mb-4 bg-white border rounded-lg">
            <div className="pb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="room-name">
                퀴즈 주제
              </label>
              <Dropdown
                items={topics}
                selectedItem={topic}
                setItem={setTopic}
                placeholder="퀴즈 주제를 입력하세요"
              />
            </div>
            <div className="pb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="room-name">
                난이도
              </label>
              <Dropdown
                items={difficulties}
                selectedItem={difficulty}
                setItem={setDifficulty}
                placeholder="난이도를 선택하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="room-name">
                문제 갯수
              </label>
              <NumberStepper
                count={quizCount}
                setCount={(count) => handleCount(count)}
                width={'long'}
                size={'M'}
                description="최소 5문제부터 최대 20문제까지 가능합니다"
              />
            </div>
          </div>
          <Button
            label="방 생성하기"
            variant="fill"
            color="gray"
            size="long"
            onClick={() => navigate('/game/waiting', { state: { topic, difficulty, quizCount } })}
          />
        </div>
      </main>
    </div>
  );
}
