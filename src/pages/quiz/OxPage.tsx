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
import Label from '@/components/common/Label';
import ToastMessage from '@/components/common/ToastMessage';

export default function OXQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 퀴즈 데이터 상태
  const [formData, setFormData] = useState({
    question: '', // 문제
    selectedAnswer: null as 'O' | 'X' | null, // 정답
    explanation: '', // 해설
  });

  const [fieldErrors, setFieldErrors] = useState({
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

  const handleInputChange = (field: keyof typeof formData, value: string, maxLength: number) => {
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

    setToastMessage({ message: '퀴즈가 생성되었습니다!', icon: 'check' });
    setToastOpen(true);

    console.log(formData);
  };

  return (
    <FlexBox direction="col">
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

          {/* 문제 입력 */}
          <div className="mb-4">
            <Label content="문제" htmlFor="quiz-question" className="mb-1" />
            <TextArea
              value={formData.question}
              onChange={(e) => handleInputChange('question', e.target.value, 42)} // 42글자 제한
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
            onChange={(e) => handleInputChange('explanation', e.target.value, 70)} // 70글자 제한
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
