import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/shared/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/shared/Container';
import Label from '@/shared/Label';
import ToastMessage from '@/components/common/ToastMessage';

export default function MultipleChoicePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 초기값 null로 설정
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [explanation, setExplanation] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    question: false,
    options: [false, false, false, false],
    explanation: false,
    answer: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  // URL에 따라 선택된 퀴즈 유형 설정
  useEffect(() => {
    if (location.pathname === '/quiz/multiple') {
      setSelectedQuizType('multiple');
    }
  }, [location.pathname]);

  // 퀴즈 유형 변경 시 URL 변경
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

  // 정답 선택 시 동일한 값을 다시 클릭하면 선택 해제
  const handleAnswerChange = (answer: number) => {
    setSelectedAnswer((prevAnswer) => (prevAnswer === answer ? null : answer));
    setFieldErrors((prev) => ({ ...prev, answer: false })); // 선택 시 에러 제거
  };

  // 선택지 입력 시 입력값 변경
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);

    const updatedErrors = [...fieldErrors.options];
    updatedErrors[index] = value.trim() === '';
    setFieldErrors((prev) => ({ ...prev, options: updatedErrors }));
  };

  const validateFields = () => {
    const updatedErrors = {
      question: question.trim() === '',
      options: options.map((option) => option.trim() === ''),
      explanation: explanation.trim() === '',
      answer: selectedAnswer === null, // 정답 선택 여부 확인
    };

    setFieldErrors(updatedErrors);

    // 에러가 있는 경우 false 반환
    return (
      !updatedErrors.question &&
      !updatedErrors.options.some((err) => err) &&
      !updatedErrors.explanation &&
      !updatedErrors.answer
    );
  };

  // 제출 버튼 클릭 시 유효성 검사 및 데이터 확인
  const handleSubmit = () => {
    const isValid = validateFields();

    if (!isValid) {
      setToastMessage({ message: '모든 항목을 작성해주세요.', icon: 'warning' });
      setToastOpen(true);
      return;
    }

    setToastMessage({ message: '퀴즈가 생성되었습니다!', icon: 'check' });
    setToastOpen(true);

    console.log({ question, options, selectedAnswer, explanation });
  };

  return (
    <FlexBox direction="col">
      <Container>
        <TopBar
          leftIcon="left"
          leftText="객관식 퀴즈 만들기"
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
            {['1번 선택지', '2번 선택지', '3번 선택지', '4번 선택지'].map((label, index) => (
              <div key={index} className="mb-2">
                <Label content={label} htmlFor={`option-${index + 1}`} className="mb-1" />
                <TextField
                  mode="outlined"
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`${label}를 입력하세요.`}
                  size="M"
                  state={fieldErrors.options[index] ? 'error' : 'enable'}
                  value={options[index]}
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <Label content="정답" htmlFor="answer" className="mb-1" />
            <div className="flex flex-row items-center gap-4">
              {options.map((_, index) => (
                <Radio
                  key={index}
                  size="M"
                  state={fieldErrors.answer ? 'error' : 'enable'}
                  title={`${index + 1}`}
                  checked={selectedAnswer === index + 1}
                  onChange={() => handleAnswerChange(index + 1)}
                />
              ))}
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
