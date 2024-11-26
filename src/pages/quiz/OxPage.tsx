import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/shared/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/shared/Container';
import Label from '@/shared/Label';
import ToastMessage from '@/components/common/ToastMessage';

export default function OXQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');

  const [fieldErrors, setFieldErrors] = useState({
    question: false,
    explanation: false,
    answer: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

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

  const handleAnswerChange = (answer: string) => {
    // 동일한 답변 클릭 시 선택 해제
    setSelectedAnswer((prevAnswer) => (prevAnswer === answer ? null : answer));
    setFieldErrors((prev) => ({ ...prev, answer: false }));
  };

  const validateFields = () => {
    const updatedErrors = {
      question: question.trim() === '',
      explanation: explanation.trim() === '',
      answer: selectedAnswer === null, // 정답이 선택되지 않은 경우 에러
    };

    setFieldErrors(updatedErrors);

    // 에러가 있는 경우 false 반환
    return !Object.values(updatedErrors).some((error) => error);
  };

  const handleSubmit = () => {
    const isValid = validateFields();

    if (!isValid) {
      setToastMessage({ message: '필드를 모두 채워주세요.', icon: 'warning' });
      setToastOpen(true);
      return;
    }

    setToastMessage({ message: '퀴즈가 생성되었습니다!', icon: 'check' });
    setToastOpen(true);
    navigate('/profile');

    console.log({
      question,
      selectedAnswer,
      explanation,
    });
  };

  return (
    <FlexBox direction="col" className="relative">
      <Container>
        <TopBar
          leftIcon="left"
          leftText="OX 퀴즈 만들기"
          onClickLeft={() => navigate('/profile')}
        />
        <Card>
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
          <div className="mb-4">
            <Label content="문제" htmlFor="quiz-question" className="mb-1" />
            <TextArea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="문제를 입력하세요."
              size="M"
              state={fieldErrors.question ? 'error' : 'enable'}
            />
          </div>
          <div className="mb-4">
            <Label content="정답" htmlFor="answer" className="mb-1" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                size="M"
                state={fieldErrors.answer ? 'error' : 'enable'}
                title="O"
                checked={selectedAnswer === 'O'}
                onChange={() => handleAnswerChange('O')}
              />
              <Radio
                size="M"
                state={fieldErrors.answer ? 'error' : 'enable'}
                title="X"
                checked={selectedAnswer === 'X'}
                onChange={() => handleAnswerChange('X')}
              />
            </div>
          </div>
          <Label content="해설" htmlFor="explanation" className="mb-1" />
          <TextArea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="해설을 입력하세요."
            size="M"
            state={fieldErrors.explanation ? 'error' : 'enable'}
          />
        </Card>

        <ShadcnButton className="w-full h-12 text-lg" size="default" onClick={handleSubmit}>
          퀴즈 생성하기
        </ShadcnButton>
      </Container>
      <ToastMessage
        message={toastMessage.message}
        icon={toastMessage.icon as 'check' | 'warning'}
        open={toastOpen}
        setOpen={setToastOpen}
      />
    </FlexBox>
  );
}
