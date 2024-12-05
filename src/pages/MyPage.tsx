import TopBar from '@/components/common/TopBar';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import Card from '@/components/common/Card';
import Container from '@/components/layout/Container';
import { MenuButton } from '@/components/mypage/MenuButton';
import { useModal } from '@/hooks/useModal';
import { AchievementModal } from '@/components/mypage/AchievementModal';
import UserModal from '@/components/mypage/UserModal';
import WithDrawalModal from '@/components/mypage/WithDrawalModal';
import ProfileSkeleton from '../components/mypage/skeleton/ProfileSkeleton';
import AchievementSkeleton from '../components/mypage/skeleton/AchievementSkeleton';

import FlexBox from '@/components/layout/FlexBox';
import { useUserData } from '@/api/mypage/useUserData';

export interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  achievedAt: string;
}

export default function MyPage() {
  const userModal = useModal();
  const achievementModal = useModal();
  const withdrawalModal = useModal();
  const { data: profileData, isLoading } = useUserData();

  const achievements: Achievement[] = [
    {
      achievementId: 'FIRST_CORRECT',
      title: '첫 정답',
      description: '처음으로 문제를 맞혔어요',
      achievedAt: '2024-12-03T20:41:25.780499',
    },
    {
      achievementId: 'QUIZ_BEGINNER',
      title: '시작이 반이다',
      description: '첫 문제를 풀어보세요',
      achievedAt: '2024-12-03T20:41:25.780519',
    },
    {
      achievementId: 'CATEGORY_EXPLORER',
      title: '분야 탐험가',
      description: '모든 카테고리에서 최소 10문제 이상 풀기',
      achievedAt: '2024-12-03T20:41:27.794329',
    },
    {
      achievementId: 'STRIKE_MASTER',
      title: '연속 정답왕',
      description: '10문제 연속 정답',
      achievedAt: '2024-12-03T20:41:27.794336',
    },
    {
      achievementId: 'STRIKE_MASTER1',
      title: '연속 정답왕',
      description: '10문제 연속 정답',
      achievedAt: '2024-12-03T20:41:27.794336',
    },
    {
      achievementId: 'STRIKE_MASTER2',
      title: '연속 정답왕',
      description: '10문제 연속 정답',
      achievedAt: '2024-12-03T20:41:27.794336',
    },
  ];

  const achievedAchievements = achievements
    .sort((a, b) => new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime())
    .slice(0, 3);

  return (
    <Container>
      <TopBar />
      {isLoading ? (
        <>
          <ProfileSkeleton />
          <AchievementSkeleton />
        </>
      ) : (
        <>
          <Card>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar image={profileData?.profileImageUrl} input="image" />
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
                <p className="text-xl font-bold text-center">{profileData?.totalAnswered}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">정답률</p>
                <p className="text-xl font-bold text-center">{profileData?.correctRate}%</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-medium">업적</h3>
            {achievedAchievements.length > 0 ? (
              <div className="space-y-4">
                {achievedAchievements.map((achievement) => (
                  <div key={achievement.achievementId} className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-gray-800">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(achievement.achievedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">아직 달성한 업적이 없습니다.</p>
            )}
            <button
              onClick={achievementModal.open}
              className="mt-4 w-full rounded-lg border py-3 text-center text-gray-600"
            >
              전체 업적 조회하기
            </button>
          </Card>
        </>
      )}

      <FlexBox direction="col" className="gap-4">
        <MenuButton icon="theme" label="오답노트" to="/profile/reviewNote" />
        <MenuButton icon="pencil" label="내 퀴즈 만들기" to="/quiz/ox" />
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
