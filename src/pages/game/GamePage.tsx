import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { IoGameControllerOutline, IoTrophyOutline } from 'react-icons/io5';
import Card from '@/components/common/Card';
import TopBar from '@/components/common/TopBar';
import Container from '@/components/layout/Container';
import FlexBox from '@/components/layout/FlexBox';
import { Skeleton } from '@/shadcn/ui/skeleton';
import defaultImageURL from '@/assets/defaultImage';

interface UserData {
  name: string;
  rating: number;
}
export default function Game() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserData | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setProfileData({
        name: '장원석님',
        rating: 1500,
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col">
      <TopBar />
      <Container>
        <Card>
          <div className="flex items-center gap-4">
            {loading ? (
              <>
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </>
            ) : (
              <>
                <Avatar input="image" image={defaultImageURL} />
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-1">{profileData!.name}</h2>
                  <div className="flex items-center gap-2">
                    <Icon icon={'person_outlined'} />
                    <span className="font-medium">레이팅: {profileData!.rating}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
        <FlexBox direction="col" className="gap-4">
          <button
            className="w-full flex h-16 text-lg justify-between items-center p-4 bg-white border rounded-lg focus:bg-gray-100"
            onClick={() => navigate('/game/create')}
          >
            <div className="flex items-center gap-3">
              <Icon icon={'people'} />방 생성
            </div>
            <Icon icon={'chevron_right_outlined'} />
          </button>

          <button
            className="w-full flex h-16 text-lg justify-between items-center p-4 bg-white border rounded-l focus:bg-gray-100"
            onClick={() => navigate('/game/random')}
          >
            <div className="flex items-center gap-3">
              <IoGameControllerOutline size={24} />
              랜덤 매칭
            </div>
            <Icon icon={'chevron_right_outlined'} />
          </button>

          <button
            className="w-full flex h-16 text-lg justify-between items-center p-4 bg-white border rounded-lg focus:bg-gray-100"
            onClick={() => navigate('/game/entry')}
          >
            <div className="flex items-center gap-3">
              <IoTrophyOutline size={24} />
              코드로 참가
            </div>
            <Icon icon={'chevron_right_outlined'} />
          </button>
        </FlexBox>
      </Container>
    </div>
  );
}
