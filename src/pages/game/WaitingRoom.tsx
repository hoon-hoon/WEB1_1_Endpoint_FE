import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopBar from '@/components/common/TopBar';
import NumberStepper from '@eolluga/eolluga-ui/Input/NumberStepper';
import DragScrollWrapper from '@/components/common/DragScrollWrapper';
import MemberItem from '@/components/MemberItem';
import { Member } from '@/components/MemberItem';

const Members: Member[] = [
  { id: 'a', nickName: '플레이어1', isHost: true, rating: 1500 },
  { id: 'b', nickName: '플레이어2', isHost: false, rating: 1500 },
  { id: 'c', nickName: '플레이어3', isHost: false, rating: 1500 },
  { id: 'd', nickName: '플레이어4', isHost: false, rating: 1500 },
  { id: 'e', nickName: '플레이어5', isHost: false, rating: 1500 },
];
const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [members, setMembers] = useState<Member[]>(Members);

  const { topic, difficulty, quizCount } = location.state || {};

  return (
    <div className="bg-gray-50 flex flex-col">
      <TopBar leftIcon="left" leftText="게임 대기방" onClickLeft={() => navigate(-1)} />

      <section className="pt-20 px-4">
        <div className="p-4 mb-4 bg-white border rounded-lg">
          <label className="block text-m font-bold text-gray-700 mb-1">참여자</label>
          <DragScrollWrapper>
            {members.map((member: Member, idx: number) => (
              <>
                <MemberItem member={member} key={member.id + idx} />
              </>
            ))}
          </DragScrollWrapper>
        </div>
      </section>
      <section className="pb-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="p-6 mb-8 bg-white border rounded-lg">
            <div className="pb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">퀴즈 주제</label>
              <div className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm">
                <span>{topic}</span>
              </div>
            </div>
            <div className="pb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">난이도</label>
              <div className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm">
                <span>{difficulty}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="room-name">
                문제 갯수
              </label>
              <NumberStepper
                state="readOnly"
                count={quizCount}
                width={'long'}
                size={'M'}
                description="최소 5문제부터 최대 20문제까지 가능합니다"
                setCount={() => console.log('')}
              />
            </div>
          </div>
          <button className="w-full h-14 text-lg" onClick={() => navigate('/game/waiting')}>
            방 생성하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default WaitingRoom;
