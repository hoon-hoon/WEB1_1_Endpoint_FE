import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import InterestButton from '../../components/common/Button/InterestButton';
import useRegisterInterests from '@/api/login/useRegisterInterests';
import { toEnglishCategory } from '@/utils/categoryConverter';

const interests = [
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
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestSelect = (interest: string) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest)
        : [...prevSelected, interest],
    );
  };

  const { mutate: registerInterests } = useRegisterInterests(
    () => {
      console.log('관심사가 성공적으로 등록되었습니다.');
    },
    (error) => {
      console.error(error);
    },
  );

  const handleSubmit = () => {
    const englishInterests = selectedInterests.map(toEnglishCategory);
    registerInterests({ interests: englishInterests });
    navigate('/main');
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2">관심사 선택</h3>
        <p className="text-base text-gray-700 mb-8">
          관심있는 주제를 선택하면 맞춤 퀴즈를 제공해드려요.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {interests.map((interest) => (
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
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0} // 로딩 중 또는 선택된 관심사가 없을 때 버튼 비활성화
        >
          선택 완료
        </ShadcnButton>
      </div>
    </div>
  );
}

export default InterestPage;
