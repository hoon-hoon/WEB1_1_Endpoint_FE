import { useState } from 'react';
import InterestButton from '../../components/common/Button/InterestButton';
import Button from '../../components/common/Button/Button';

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
    <div className="flex flex-col items-center px-4 py-8 max-w-sm mx-auto">
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-2">관심사 선택</h3>
        <p className="text-sm text-gray-600 mb-6">
          관심있는 주제를 선택하면 맞춤 퀴즈를 제공해드려요
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {mock_interests.map((interest) => (
            <InterestButton
              key={interest}
              label={interest}
              selected={selectedInterests.includes(interest)}
              variant="sm"
              selectedColor="#EDEDED"
              unselectedColor="#FFFFFF"
              selectedTextColor="#000000"
              onClick={() => handleInterestSelect(interest)}
            />
          ))}
        </div>

        <Button
          label="선택 완료"
          color="#88898B"
          textColor="#FFFFFF"
          size="long"
          onClick={() => console.log('선택된 관심사:', selectedInterests)}
        />
      </div>
    </div>
  );
}

export default InterestPage;
