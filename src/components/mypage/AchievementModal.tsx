import Icon from '@eolluga/eolluga-ui/icon/Icon';

interface Achievement {
  title: string;
  description: string;
  achieved: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export function AchievementModal({ isOpen, onClose, achievements }: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="relative mb-4">
          <h3 className="text-center text-xl font-bold">전체업적</h3>
          <button onClick={onClose} className="absolute right-0 top-0 text-gray-400">
            <Icon icon="close" size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`rounded-xl border p-4 ${
                achievement.achieved
                  ? 'border-gray-200 bg-gray-50' // 달성한 업적 스타일
                  : 'border-gray-100 bg-gray-25 opacity-50' // 미달성 업적 스타일
              }`}
            >
              <h4 className={`${achievement.achieved ? 'font-medium' : 'font-normal'}`}>
                {achievement.title}
              </h4>
              <p className={`${achievement.achieved ? 'text-gray-600' : 'text-gray-400'}`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
