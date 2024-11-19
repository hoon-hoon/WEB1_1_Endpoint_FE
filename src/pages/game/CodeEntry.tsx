import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import TopBar from '@/components/common/TopBar';
import { ArrowRight } from 'lucide-react';
import FlexBox from '@/shared/FlexBox';
import Button from '@/components/common/Button/Button';

export default function CodeEntry() {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted code:', inviteCode);
  };

  return (
    <FlexBox direction="col">
      <TopBar leftIcon="left" leftText="코드로 참가" onClickLeft={() => navigate(-1)} />
      <main className="flex-1 pt-20 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="p-6 mb-6 bg-white border rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="invite-code"
                >
                  초대 코드
                </label>
                <TextField
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="초대 코드를 입력하세요"
                  size={'M'}
                />
              </div>
              <Button label="참가하기" color="gray" size="long" />
              <ArrowRight className="ml-2 h-5 w-5" />
            </form>
          </div>

          <p className="text-center text-gray-600">
            친구에게 받은 6자리 코드를 입력하여 게임에 참가하세요.
          </p>
        </div>
      </main>
    </FlexBox>
  );
}
