import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-lg font-semibold">게임 시작 중...</p>
        <p className="text-sm text-gray-500">퀴즈를 불러오고 있습니다</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
