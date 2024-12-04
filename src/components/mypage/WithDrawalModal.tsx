import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import Card from '../common/Card';
import FlexBox from '@/components/layout/FlexBox';
import { useWithdrawUser } from '@/api/mypage/useWithdraw';
import ToastMessage from '../common/ToastMessage';

interface WithDrawalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithDrawalModal({ isOpen, onClose }: WithDrawalProps) {
  const [toastOpen, setToastOpen] = useState(false);
  const { mutate, isPending } = useWithdrawUser({
    onError: () => {
      setToastOpen(true);
    },
  });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  if (!isOpen) return null;

  return (
    <Container>
      <div
        onClick={handleOverlayClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      >
        <Card className="w-full max-w-md">
          <div className="relative mb-4">
            <h3 className="text-center text-xl font-bold">회원탈퇴</h3>
          </div>

          <form onSubmit={handleWithdrawal} className="space-y-4">
            <div className="flex w-full justify-center">
              <span className="w-4/6 text-center text-gray-600">
                이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
              </span>
            </div>

            <FlexBox className="justify-center gap-4">
              <button
                type="submit"
                className="rounded-lg w-full bg-red-500 text-white py-2 hover:bg-red-600 transition-colors"
                disabled={isPending}
              >
                {isPending ? '처리 중...' : '예'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg w-full px-4 py-2 bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                아니오
              </button>
            </FlexBox>
          </form>
        </Card>

        <ToastMessage
          message="회원 탈퇴 중 오류가 발생했습니다."
          icon="warning"
          open={toastOpen}
          setOpen={setToastOpen}
        />
      </div>
    </Container>
  );
}
