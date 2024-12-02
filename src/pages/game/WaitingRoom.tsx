import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/stores/useGameStore';
import NumberStepper from '@eolluga/eolluga-ui/Input/NumberStepper';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import { Play, Loader2 } from 'lucide-react';
import Dialog from '@/components/common/Dialog';
import TopBar from '@/components/common/TopBar';
import DragScrollWrapper from '@/components/common/DragScrollWrapper';
import MemberItem from '@/components/common/MemberItem';
import { Player } from '@/types/GameTypes';
import Card from '@/components/common/Card';
import Label from '@/components/common/Label';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import ToastMessage from '@/components/common/ToastMessage';
import LoadingSpinner from '@/components/game/LoadingSpinner';
import LoadingPlayer from '@/components/game/LoadingPlayer';

const WaitingRoom = () => {
  const navigate = useNavigate();
  const { subject, level, quizCount, inviteCode, players } = useGameStore();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [userLoading] = useState(false);

  useEffect(() => {
    if (players.length > 0) {
      console.log('새로운 플레이어 입장:', players);
    }
  }, [players]);

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
      {isLoading && <LoadingSpinner />}
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
            {players &&
              players.map((player: Player) =>
                userLoading ? (
                  <LoadingPlayer key={player.user.id} />
                ) : (
                  <MemberItem key={player.user.id} member={player} handleExit={handleDialog} />
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
              <span>{subject}</span>
            </div>
          </div>

          <div className="pb-4">
            <Label className="block mb-2" content="난이도" />
            <div className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm">
              <span>{level}</span>
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
