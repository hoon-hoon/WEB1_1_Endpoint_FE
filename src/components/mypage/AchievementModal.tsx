import Container from '@/components/layout/Container';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  achievedAt: string;
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
    <Container>
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
          <div className="space-y-4 max-h-[calc(100vh-341px)] overflow-y-scroll">
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <div
                  key={achievement.achievementId}
                  className="rounded-xl border p-4 border-gray-200 bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(achievement.achievedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-gray-500">달성한 업적이 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
