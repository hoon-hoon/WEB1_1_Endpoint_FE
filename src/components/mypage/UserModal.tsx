import Container from '@/components/layout/Container';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import Card from '../common/Card';
import defaultImageURL from '@/assets/defaultImage';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Container>
      <div
        onClick={handleOverlayClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      >
        <Card className="w-full">
          <div className="relative mb-4">
            <h3 className="text-center text-xl font-bold">프로필 수정</h3>
            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
            >
              <Icon icon="close" size={24} />
            </button>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24">
                <img
                  src={defaultImageURL}
                  alt="프로필 이미지"
                  className="h-24 w-24 rounded-full object-cover border border-gray-300"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 h-8 w-8 flex items-center justify-center bg-white text-white rounded-full cursor-pointer opacity-80 hover:bg-gray-100"
                >
                  <Icon icon="gear" size={16} />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center ">
              <button type="submit" className="rounded-lg w-full bg-zinc-900 px-4 py-2 text-white ">
                저장
              </button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
