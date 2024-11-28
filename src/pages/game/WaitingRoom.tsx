import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NumberStepper from '@eolluga/eolluga-ui/Input/NumberStepper';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import { Play, Loader2 } from 'lucide-react';
import Dialog from '@/components/common/Dialog';
import TopBar from '@/components/common/TopBar';
import DragScrollWrapper from '@/components/common/DragScrollWrapper';
import MemberItem, { Member } from '@/components/common/MemberItem';
import Card from '@/components/common/Card';
import Label from '@/components/common/Label';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import ToastMessage from '@/components/common/ToastMessage';

const Members: Member[] = [
  { id: 'a', nickName: '플레이어1', isHost: true, rating: 2000 },
  { id: 'b', nickName: '플레이어2', isHost: false, rating: 1500 },
  { id: 'c', nickName: '플레이어3', isHost: false, rating: 1500 },
  { id: 'd', nickName: '플레이어4', isHost: false, rating: 1500 },
  { id: 'e', nickName: '플레이어5', isHost: false, rating: 1500 },
];

const inviteCode = 'QUIZ123';

const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [members] = useState<Member[]>(Members);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [userLoading] = useState(true);

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
      navigate('/game/play');
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <TopBar leftIcon="left" leftText="게임 대기방" onClickLeft={() => navigate('/game/create')} />

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
        <Card>
          <label className="block text-xl font-bold text-gray-700 mb-2">참여자</label>
          <DragScrollWrapper>
            <MemberItem member={members[0]} key={members[0].id} handleExit={handleDialog} />
            {members.slice(1).map((member: Member) =>
              userLoading ? (
                <div
                  key={member.id}
                  className="flex flex-col space-y-1 items-center justify-between text-center"
                >
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-4 w-12 mb-1 rounded-lg" />
                  </div>
                </div>
              ) : (
                <MemberItem key={member.id} member={member} handleExit={handleDialog} />
              ),
            )}
          </DragScrollWrapper>
        </Card>
      </section>
      <section className="px-4">
        <Card>
          <div className="pb-4">
            <Label className="block mb-2" content="퀴즈 주제" />
            <div className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm">
              <span>{topic}</span>
            </div>
          </div>

          <div className="pb-4">
            <Label className="block mb-2" content="난이도" />
            <div className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm">
              <span>{difficulty}</span>
            </div>
          </div>

          <Label className="block mb-2" content="문제 갯수" />
          <NumberStepper
            state="readOnly"
            count={quizCount}
            width={'long'}
            size={'M'}
            description="최소 5문제부터 최대 20문제까지 가능합니다"
            setCount={() => console.log('')}
          />
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">초대 코드</h2>
          <div className="flex items-center gap-2">
            <TextField
              value={inviteCode}
              state="readOnly"
              onChange={() => console.log('')}
              size={'M'}
            />
            <ShadcnButton size="icon" onClick={copyInviteCode}>
              {copied ? (
                <Icon icon="checkmark" className="fill-white" />
              ) : (
                <Icon icon="copy" className="fill-white" />
              )}
            </ShadcnButton>
          </div>
        </Card>
        <div className="max-w-xl mx-auto mb-8">
          <ShadcnButton
            className="w-full h-14 text-lg relative"
            size="lg"
            onClick={startGame}
            disabled={isLoading}
          >
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
            <ToastMessage
              message="초대코드가 복사되었습니다"
              icon="check"
              open={copied}
              setOpen={setCopied}
            />
          </ShadcnButton>
        </div>
      </section>
    </div>
  );
};

export default WaitingRoom;
