import { ChevronDown, ChevronUp } from 'lucide-react';

const ScrollHint = () => {
  return (
    <div className="absolute inset-x-0 top-16 bottom-16 pointer-events-none flex flex-col justify-between items-center">
      <div className="flex flex-col items-center">
        <ChevronUp className="h-8 w-8 text-gray-500 animate-bounce" />
        <p className="text-center text-gray-500 mt-2">위로 스와이프</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-center text-gray-500 mb-2">아래로 스와이프</p>
        <ChevronDown className="h-8 w-8 text-gray-500 animate-bounce" />
      </div>
    </div>
  );
};

export default ScrollHint;
