import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NumberStepper from '@eolluga/eolluga-ui/Input/NumberStepper';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import { Play, Loader2 } from 'lucide-react';
import Dialog from '@/components/common/Dialog';
import TopBar from '@/components/common/TopBar';
import DragScrollWrapper from '@/components/common/DragScrollWrapper';
import MemberItem from '@/components/MemberItem';
import { Member } from '@/components/MemberItem';
import Button from '@/components/common/Button/Button';

const Members: Member[] = [
  { id: 'a', nickName: '플레이어1', isHost: true, rating: 1500 },
  { id: 'b', nickName: '플레이어2', isHost: false, rating: 1500 },
  { id: 'c', nickName: '플레이어3', isHost: false, rating: 1500 },
  { id: 'd', nickName: '플레이어4', isHost: false, rating: 1500 },
  { id: 'e', nickName: '플레이어5', isHost: false, rating: 1500 },
];

const inviteCode = 'QUIZ123';

const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [members, setMembers] = useState<Member[]>(Members);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    topic: defaultTopic = '네트워크',
    difficulty: defaultDifficulty = '하',
    quizCount,
  } = location.state || {};

  const topic = defaultTopic === '' ? '네트워크' : defaultTopic;
  const difficulty = defaultDifficulty === '' ? '하' : defaultDifficulty;

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const startGame = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 flex flex-col">
      <TopBar leftIcon="left" leftText="게임 대기방" onClickLeft={() => navigate(-1)} />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-lg font-semibold">게임 시작 중...</p>
            <p className="text-sm text-gray-500">퀴즈를 불러오고 있습니다</p>
          </div>
        </div>
      )}

      {openDialog && (
        <Dialog
          open={openDialog}
          title="해당 플레이어를 강퇴시키겠습니까?"
          leftText="예"
          rightText="아니요"
          leftOnClick={handleDialog}
          rightOnClick={handleDialog}
          onClose={handleDialog}
        />
      )}
      <section className="pt-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="p-4 mb-4 bg-white border rounded-lg">
            <label className="block text-m font-bold text-gray-700 mb-1">참여자</label>
            <DragScrollWrapper>
              {members.map((member: Member) => (
                <>
                  <MemberItem member={member} key={member.id} handleExit={handleDialog} />
                </>
              ))}
            </DragScrollWrapper>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div className="max-w-md mx-auto pb-8">
          <div className="p-6 mb-4 bg-white border rounded-lg">
            <div className="pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">퀴즈 주제</label>
              <div className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm">
                <span>{topic}</span>
              </div>
            </div>
            <div className="pb-4">
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
          <div className="p-6 mb-8 bg-white border rounded-lg">
            <h2 className="text-xl font-bold mb-4">초대 코드</h2>
            <div className="flex items-center gap-2">
              <TextField
                value={inviteCode}
                state="readOnly"
                onChange={() => console.log(1)}
                size={'M'}
              />
              <button
                onClick={copyInviteCode}
                className="bg-black p-2 rounded-lg focus:outline-none border "
              >
                {copied ? (
                  <Icon icon="checkmark" className="fill-white" />
                ) : (
                  <Icon icon="copy" className="fill-white" />
                )}
              </button>
            </div>
          </div>
          <Button label="게임 시작" variant="fill" color="gray" size="long" onClick={startGame} />
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              게임 시작 중...
            </>
          ) : (
            <>
              <Play className="mr-2 h-6 w-6" /> 게임 시작
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default WaitingRoom;
