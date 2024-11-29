import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import TopBar from '@/components/common/TopBar';
import FlexBox from '@/components/layout/FlexBox';
import Label from '@/components/common/Label';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/layout/Container';
import Card from '@/components/common/Card';
import { Button as ShadcnButton } from '@/shadcn/ui/button';

export default function CodeEntry() {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted code:', inviteCode);
  };

  return (
    <FlexBox direction="col">
      <TopBar leftIcon="left" leftText="코드로 참가" onClickLeft={() => navigate('/game')} />
      <Container>
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="invite-code" content="초대 코드" />
              <TextField
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="초대 코드를 입력하세요"
                size={'M'}
              />
            </div>
            <ShadcnButton type="submit" className="w-full h-14 text-lg" size="lg">
              참가하기 <ArrowRight className="ml-2 h-5 w-5" />
            </ShadcnButton>
          </form>
        </Card>
        <p className="text-center text-gray-600">
          친구에게 받은 6자리 코드를 입력하여 게임에 참가하세요.
        </p>
      </Container>
    </FlexBox>
  );
}
