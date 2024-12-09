import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/components/layout/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/components/layout/Container';
import DropDown from '@/components/common/DropDown';
import Label from '@/components/common/Label';
import ToastMessage from '@/components/common/ToastMessage';
import TagInput from '@/components/common/TagInput';
import useCreateQuiz from '@/api/quiz/useCreateQuiz';
import { toEnglishCategory } from '@/utils/categoryConverter';
import AboutPage from '@/components/common/AboutPage';

// 카테고리 목록
const categories = [
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

export default function OXQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: createQuizMutate } = useCreateQuiz();

  // 퀴즈 데이터 상태
  const [formData, setFormData] = useState({
    category: '', // 카테고리
    question: '', // 문제
    selectedAnswer: null as 'O' | 'X' | null, // 정답
    explanation: '', // 해설
    tags: [] as string[], // 태그
  });

  const [fieldErrors, setFieldErrors] = useState({
    category: false,
    question: false,
    explanation: false,
    selectedAnswer: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });
  const [selectedQuizType, setSelectedQuizType] = useState('');

  useEffect(() => {
    if (location.pathname === '/quiz/ox') {
      setSelectedQuizType('ox');
    }
  }, [location.pathname]);

  const handleQuizTypeChange = (selected: string) => {
    setSelectedQuizType(selected);
    switch (selected) {
      case 'ox':
        navigate('/quiz/ox');
        break;
      case 'ab':
        navigate('/quiz/ab');
        break;
      case 'multiple':
        navigate('/quiz/multiple');
        break;
      default:
        break;
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string, maxLength?: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.slice(0, maxLength), // 최대 글자 수 제한
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleAnswerChange = (answer: 'O' | 'X') => {
    setFormData((prev) => ({
      ...prev,
      selectedAnswer: prev.selectedAnswer === answer ? null : answer,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      selectedAnswer: false,
    }));
  };

  const validateFields = () => {
    const updatedErrors = {
      category: formData.category.trim() === '',
      question: formData.question.trim() === '',
      explanation: formData.explanation.trim() === '',
      selectedAnswer: formData.selectedAnswer === null,
    };

    setFieldErrors(updatedErrors);

    // 에러가 하나라도 있으면 false 반환
    return !Object.values(updatedErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      setToastMessage({ message: '모든 항목을 작성해주세요.', icon: 'warning' });
      setToastOpen(true);
      return;
    }

    const englishCategory = toEnglishCategory(formData.category);
    const answerNumber = formData.selectedAnswer === 'O' ? 1 : 2;
    const payload = {
      category: englishCategory,
      type: 'OX',
      content: formData.question,
      tags: formData.tags,
      options: [
        { optionNumber: 1, content: 'O', imageId: null },
        { optionNumber: 2, content: 'X', imageId: null },
      ],
      answerNumber,
      explanation: formData.explanation,
    };
    createQuizMutate(payload, {
      onSuccess: () => {
        setToastMessage({ message: '퀴즈가 생성되었습니다!', icon: 'check' });
        setToastOpen(true);
        // 상태 초기화
        setFormData({
          category: '',
          question: '',
          selectedAnswer: null,
          explanation: '',
          tags: [],
        });

        // 에러 상태도 초기화
        setFieldErrors({
          category: false,
          question: false,
          explanation: false,
          selectedAnswer: false,
        });
      },
      onError: () => {
        setToastMessage({ message: '퀴즈 생성에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      },
    });
  };

  return (
    <FlexBox direction="col">
      <AboutPage
        title="OX 퀴즈"
        description="내가 원하는 주제로 OX 퀴즈를 만들어보세요."
        keywords="quiz, OX, 퀴즈, OX 퀴즈"
      />
      <Container>
        <TopBar
          leftIcon="left"
          leftText="OX 퀴즈 만들기"
          onClickLeft={() => navigate('/profile')}
        />
        <Card>
          {/* 퀴즈 유형 선택 */}
          <div className="mb-4">
            <Label content="퀴즈 유형" htmlFor="quiz-type" className="mb-1" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="enable"
                title="OX 퀴즈"
                checked={selectedQuizType === 'ox'}
                onChange={() => handleQuizTypeChange('ox')}
              />
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="enable"
                title="AB 테스트"
                checked={selectedQuizType === 'ab'}
                onChange={() => handleQuizTypeChange('ab')}
              />
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="enable"
                title="객관식"
                checked={selectedQuizType === 'multiple'}
                onChange={() => handleQuizTypeChange('multiple')}
              />
            </div>
          </div>

          {/* 태그 입력 */}
          <div className="mb-4">
            <Label content="태그" htmlFor="tags" className="mb-1" />
            <TagInput
              tags={formData.tags}
              setTags={(tags) => setFormData((prev) => ({ ...prev, tags }))}
            />
          </div>

          {/* 카테고리 선택 */}
          <div className="mb-4">
            <Label content="주제" htmlFor="category" className="mb-1" />
            <DropDown
              items={categories}
              selectedItem={formData.category}
              setItem={(value: string) => handleInputChange('category', value)}
              placeholder="주제를 선택하세요"
              alert="주제를 선택해주세요."
              required={fieldErrors.category && formData.category === ''}
            />
          </div>

          {/* 문제 입력 */}
          <div className="mb-4">
            <Label content="문제" htmlFor="quiz-question" className="mb-1" />
            <TextArea
              value={formData.question}
              onChange={(e) => handleInputChange('question', e.target.value, 70)}
              placeholder="문제를 입력하세요."
              size="M"
              state={fieldErrors.question ? 'error' : 'enable'}
            />
          </div>

          {/* 정답 선택 */}
          <div className="mb-4">
            <Label content="정답" htmlFor="answer" className="mb-1" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                size="M"
                state={fieldErrors.selectedAnswer ? 'error' : 'enable'}
                title="O"
                checked={formData.selectedAnswer === 'O'}
                onChange={() => handleAnswerChange('O')}
              />
              <Radio
                size="M"
                state={fieldErrors.selectedAnswer ? 'error' : 'enable'}
                title="X"
                checked={formData.selectedAnswer === 'X'}
                onChange={() => handleAnswerChange('X')}
              />
            </div>
            {fieldErrors.selectedAnswer && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <Icon icon="warning_triangle_filled" className="mr-2" size={16} />
                정답을 선택해주세요.
              </div>
            )}
          </div>

          {/* 해설 입력 */}
          <Label content="해설" htmlFor="explanation" className="mb-1" />
          <TextArea
            value={formData.explanation}
            onChange={(e) => handleInputChange('explanation', e.target.value, 100)}
            placeholder="해설을 입력하세요."
            size="M"
            state={fieldErrors.explanation ? 'error' : 'enable'}
          />
        </Card>

        {/* 제출 버튼 */}
        <ShadcnButton
          className="w-full h-12 text-lg relative"
          size="default"
          onClick={handleSubmit}
        >
          퀴즈 생성하기
          <ToastMessage
            message={toastMessage.message}
            icon={toastMessage.icon as 'check' | 'warning'}
            open={toastOpen}
            setOpen={setToastOpen}
          />
        </ShadcnButton>
      </Container>
    </FlexBox>
  );
}
