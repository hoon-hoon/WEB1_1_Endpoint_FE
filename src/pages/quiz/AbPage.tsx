import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/shared/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/shared/Container';
import Label from '@/shared/Label';
import ToastMessage from '@/components/common/ToastMessage';

export default function ABTestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [imageA, setImageA] = useState<File | null>(null);
  const [imageB, setImageB] = useState<File | null>(null);
  const [explanation, setExplanation] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    question: false,
    optionA: false,
    optionB: false,
    explanation: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  useEffect(() => {
    if (location.pathname === '/quiz/ab') {
      setSelectedQuizType('ab');
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, option: 'A' | 'B') => {
    if (e.target.files && e.target.files[0]) {
      if (option === 'A') {
        setImageA(e.target.files[0]);
      } else {
        setImageB(e.target.files[0]);
      }
    }
  };

  const removeImage = (option: 'A' | 'B') => {
    if (option === 'A') {
      setImageA(null);
    } else {
      setImageB(null);
    }
  };

  const validateFields = () => {
    const updatedErrors = {
      question: question.trim() === '',
      optionA: optionA.trim() === '',
      optionB: optionB.trim() === '',
      explanation: explanation.trim() === '',
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

    console.log({ question, optionA, imageA, optionB, imageB, explanation });
  };

  return (
    <FlexBox direction="col">
      <Container>
        <TopBar leftIcon="left" leftText="퀴즈 만들기" onClickLeft={() => navigate(-1)} />
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
                state="disabled"
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
            <div className="mb-2">
              <Label content="A 선택지" htmlFor="option-a" className="mb-1" />
              <TextField
                mode="outlined"
                onChange={(e) => setOptionA(e.target.value)}
                placeholder="A 선택지를 입력하세요."
                size="M"
                state={fieldErrors.optionA ? 'error' : 'enable'}
                value={optionA}
              />
            </div>
            <Label content="A 이미지 첨부" htmlFor="image-a" className="mb-1" />
            <input
              id="image-a"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'A')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {imageA && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(imageA)}
                  alt="A 선택지 이미지"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('A')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <Icon icon="close" size={48} />
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <Label content="B 선택지" htmlFor="option-b" className="mb-1" />
              <TextField
                mode="outlined"
                onChange={(e) => setOptionB(e.target.value)}
                placeholder="B 선택지를 입력하세요."
                size="M"
                state={fieldErrors.optionB ? 'error' : 'enable'}
                value={optionB}
              />
            </div>
            <Label content="B 이미지 첨부" htmlFor="image-b" className="mb-1" />
            <input
              id="image-b"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'B')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {imageB && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(imageB)}
                  alt="B 선택지 이미지"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('B')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <Icon icon="close" size={48} />
                </button>
              </div>
            )}
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
        <ToastMessage
          message={toastMessage.message}
          icon={toastMessage.icon as 'check' | 'warning'}
          open={toastOpen}
          setOpen={setToastOpen}
        />
      </Container>
    </FlexBox>
  );
}
