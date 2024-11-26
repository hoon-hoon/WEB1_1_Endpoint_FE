import TopBar from '@/components/common/TopBar';
import { MenuButton } from '@/components/mypage/MenuButton';
import { AchievementModal } from '@/components/mypage/AchievementModal';

import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import UserModal from '@/components/mypage/UserModal';
import Container from '@/shared/Container';
import Card from '@/components/common/Card';
import FlexBox from '@/shared/FlexBox';
import WithDrawalModal from '@/components/mypage/WithDrawalModal';
import { useModal } from '@/hooks/useModal';
import defaultImageURL from '@/shared/defaultImage';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { useEffect, useState } from 'react';

type IconType = Parameters<typeof Icon>[0]['icon'];

interface Achievement {
  icon: IconType;
  title: string;
  description: string;
  achieved: boolean;
}

interface UserData {
  name: string;
  rating: number;
}

export default function MyPage() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserData | null>(null);
  const userModal = useModal();
  const achievementModal = useModal();
  const withdrawalModal = useModal();

  const achievements: Achievement[] = [
    {
      title: '퀴즈 마스터',
      description: '100문제 연속 정답',
      achieved: true,
      icon: 'star_outlined',
    },
    {
      title: '지식의 탑',
      description: '1000문제 해결',
      achieved: false,
      icon: 'building_bank',
    },
    {
      title: '개근왕',
      description: '30일 연속 접속',
      achieved: true,
      icon: 'flag_outlined',
    },
  ];

  const achievedAchievements = achievements
    .filter((achievement) => achievement.achieved)
    .slice(0, 3);

  useEffect(() => {
    setTimeout(() => {
      setProfileData({
        name: '장원석님',
        rating: 1500,
      });
      setLoading(false);
    }, 2000); // 2초 딜레이
  }, []);

  return (
    <Container>
      <TopBar />
      {loading ? (
        <Card className="border-gray-300">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <div className="space-y-2 text-center">
              <Skeleton className="h-3 w-[80px] mx-auto" />
              <Skeleton className="h-6 w-[60px] mx-auto" />
            </div>
            <div className="space-y-2 text-center">
              <Skeleton className="h-3 w-[80px] mx-auto" />
              <Skeleton className="h-6 w-[60px] mx-auto" />
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border-gray-300">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar image={defaultImageURL} input="image" />
              <div>
                <h2 className="text-lg font-bold">{profileData!.name}</h2>
                <p className="text-sm text-gray-500">레이팅: {profileData!.rating}</p>
              </div>
            </div>
            <button className="text-gray-400" onClick={userModal.open}>
              <Icon icon="gear" size={24} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <div>
              <p className="text-sm text-gray-500">푼 문제</p>
              <p className="text-xl font-bold">250개</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">정답률</p>
              <p className="text-xl font-bold">75%</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="border-gray-300">
        <h3 className="mb-4 text-lg font-medium">업적</h3>
        {achievedAchievements.length > 0 ? (
          <div className="space-y-4">
            {achievedAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4">
                <Icon icon={achievement.icon} size={24} />
                <div>
                  <p className="font-medium text-gray-800">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">아직 달성한 업적이 없습니다.</p>
        )}
        <button
          onClick={achievementModal.open}
          className="mt-4 w-full rounded-lg border border-gray-300 py-3 text-center text-gray-600"
        >
          전체 업적 조회하기
        </button>
      </Card>

      <FlexBox direction="col" className="gap-4">
        <MenuButton icon="theme" label="오답노트" to="/profile/reviewNote" />
        <MenuButton icon="pencil" label="내 퀴즈 만들기" to="/" />
        <MenuButton
          icon="paper_blank_portrait"
          label="내 퀴즈 관리하기"
          to="/profile/quizManagement"
        />
        <MenuButton icon="person_outlined" label="회원탈퇴" to="" onClick={withdrawalModal.open} />
      </FlexBox>

      <UserModal isOpen={userModal.isOpen} onClose={userModal.close} />
      <AchievementModal
        isOpen={achievementModal.isOpen}
        onClose={achievementModal.close}
        achievements={achievements}
      />
      <WithDrawalModal isOpen={withdrawalModal.isOpen} onClose={withdrawalModal.close} />
    </Container>
  );
}
