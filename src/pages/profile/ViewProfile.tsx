import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import FlexBox from '@/shared/FlexBox';
import Container from '@/shared/Container';
import defaultImageURL from '@/shared/defaultImage';
import { Achievement } from '../MyPage';

type UserProfile = {
  id: number;
  nickname: string;
  avatar: string;
  rating: number;
  quizCount: number;
  certificated: boolean;
};

export default function ViewProfile() {
  const navigate = useNavigate();
  const [user] = useState<UserProfile>({
    id: 1,
    nickname: '퀴즈마스터',
    avatar: '/placeholder.svg',
    rating: 1500,
    quizCount: 42,
    certificated: false,
  });

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

  return (
    <FlexBox direction="col">
      <TopBar leftIcon="left" leftText="프로필 조회" onClickLeft={() => navigate(-1)} />
      <Container>
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-4 mb-8">
              <Avatar input="image" image={defaultImageURL} />
              <div>
                <h2 className="text-2xl font-bold">{user.nickname}</h2>
                <div className="flex items-center text-gray-500 mt-1">
                  <span>레이팅: {user.rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 justify-items-center">
              <div>
                <p className="text-sm text-gray-500">푼 문제</p>
                <p className="text-xl font-bold">250개</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">정답률</p>
                <p className="text-xl font-bold">75%</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">만든 퀴즈</p>
                <p className="text-xl font-bold">{user.quizCount}개</p>
              </div>

              <FlexBox direction="col" className="justify-center items-center">
                <p className="text-sm text-gray-500">인증여부</p>
                {user.certificated ? (
                  <Icon icon="modifier_check" size={32} />
                ) : (
                  <Icon icon="modifier_cancel" size={32} />
                )}
              </FlexBox>
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-medium">업적</h3>
            {achievements.length > 0 ? (
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
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
          </Card>
        </div>
      </Container>
    </FlexBox>
  );
}
