import TopBar from '@/components/common/TopBar';
import { MenuButton } from '@/components/mypage/MenuButton';
import { AchievementModal } from '@/components/mypage/AchievementModal';

import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { useState } from 'react';
import UserModal from '@/components/mypage/UserModal';
import Container from '@/shared/Container';
import Card from '@/components/common/Card';
import FlexBox from '@/shared/FlexBox';

type IconType = Parameters<typeof Icon>[0]['icon'];

interface Achievement {
  icon: IconType;
  title: string;
  description: string;
  achieved: boolean;
}

interface ModalStates {
  achievement: boolean;
  user: boolean;
}

export default function MyPage() {
  const [modalStates, setModalStates] = useState<ModalStates>({
    achievement: false,
    user: false,
  });

  const handleModalToggle = (modalName: keyof ModalStates, isOpen: boolean) => {
    setModalStates((prev) => ({
      ...prev,
      [modalName]: isOpen,
    }));
  };

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

  return (
    <Container>
      <TopBar />

      <Card className="border-gray-300 ">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              icon="account"
              image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              input="text"
              size="M"
              text="Q"
            />
            <div>
              <h2 className="text-lg font-bold">퀴즈마스터</h2>
              <p className="text-sm text-gray-500">레이팅: 1500</p>
            </div>
          </div>
          <button className="text-gray-400" onClick={() => handleModalToggle('user', true)}>
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
          onClick={() => handleModalToggle('achievement', true)}
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
      </FlexBox>

      <UserModal isOpen={modalStates.user} onClose={() => handleModalToggle('user', false)} />
      <AchievementModal
        isOpen={modalStates.achievement}
        onClose={() => handleModalToggle('achievement', false)}
        achievements={achievements}
      />
    </Container>
  );
}
