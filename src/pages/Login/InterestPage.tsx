import { useState } from 'react';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import InterestButton from '../../components/common/Button/InterestButton';

const mock_interests = [
  '알고리즘',
  '프로그래밍 언어',
  '네트워크',
  '운영체제',
  '웹 개발',
  '모바일 개발',
  '데브옵스/인프라',
  '데이터베이스',
  '소프트웨어 공학',
];

function InterestPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestSelect = (interest: string) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest)
        : [...prevSelected, interest],
    );
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2">관심사 선택</h3>
        <p className="text-base text-gray-700 mb-8">
          관심있는 주제를 선택하면 맞춤 퀴즈를 제공해드려요.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {mock_interests.map((interest) => (
            <InterestButton
              key={interest}
              label={interest}
              selected={selectedInterests.includes(interest)}
              variant="lg"
              onClick={() => handleInterestSelect(interest)}
            />
          ))}
        </div>
      </div>
      <div>
        <ShadcnButton
          variant="default"
          size="lg"
          className="w-full h-12 text-base"
          onClick={() => console.log('선택된 관심사:', selectedInterests)}
        >
          선택 완료
        </ShadcnButton>
      </div>
    </div>
  );
}

export default InterestPage;
