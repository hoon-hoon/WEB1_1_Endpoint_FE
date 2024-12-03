import Container from '@/components/layout/Container';
import Card from '../common/Card';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import FlexBox from '@/components/layout/FlexBox';

interface WitdhDrawalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithDrawalModal({ isOpen, onClose }: WitdhDrawalProps) {
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
            <h3 className="text-center text-xl font-bold">회원탈퇴</h3>
          </div>

          <form className="space-y-4">
            <div className="flex w-full justify-center">
              <span className="w-4/6 text-center">
                이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
              </span>
            </div>

            <FlexBox className="justify-center gap-4">
              <button type="submit" className="rounded-lg w-full bg-red-500  text-white">
                예
              </button>
              <button
                onClick={onClose}
                className="rounded-lg w-full  px-4 py-2 bg-white text-black border border-gray-300"
              >
                아니오
              </button>
            </FlexBox>
          </form>
        </Card>
      </div>
    </Container>
  );
}
