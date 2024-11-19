import { MenuButton } from '@/components/mypage/MenuButton';
import { Modal } from '@/components/mypage/Modal';
import TopBar from '@/components/TopBar';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { useState } from 'react';

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const achievements = [
    {
      title: '퀴즈 마스터',
      description: '100문제 연속 정답',
    },
    {
      title: '지식의 탑',
      description: '1000문제 해결',
    },
    {
      title: '개근왕',
      description: '30일 연속 접속',
    },
  ];

  return (
    <div className="max-w-full min-h-screen bg-gray-50">
      <TopBar />
      <main className="container mx-auto max-w-3xl p-4 pt-20 flex flex-col gap-5">
        <div className="rounded-xl bg-white p-4 border border-gray-300 shadow-sm">
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
            <button className="text-gray-400">
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
        </div>

        <div className=" rounded-xl bg-white p-4 border border-gray-300 shadow-sm">
          <h3 className="mb-4 text-lg font-medium">업적</h3>
          <div className="flex items-center gap-3">
            <Icon icon="star_outlined" size={24} />
            <div>
              <p className="font-medium">퀴즈 마스터</p>
              <p className="text-sm text-gray-500">100문제 연속 정답</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full rounded-lg border border-gray-300 py-3 text-center text-gray-600"
          >
            전체 업적 조회하기
          </button>
        </div>

        <MenuButton icon="theme" label="오답노트" />
        <MenuButton icon="pencil" label="내 퀴즈 만들기" />
        <MenuButton icon="paper_blank_portrait" label="내 퀴즈 관리하기" />
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        achievements={achievements}
      />
    </div>
  );
}
