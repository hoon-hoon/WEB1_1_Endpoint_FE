import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/shared/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/shared/Container';
import Label from '@/shared/Label';

export default function OXQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string>('O'); // 기본 정답값을 O로 설정
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    question: false,
    explanation: false,
  });

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
    setSelectedAnswer(answer);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    const updatedErrors = {
      question: question.trim() === '',
      explanation: explanation.trim() === '',
    };

    setFieldErrors(updatedErrors);

    if (!updatedErrors.question && !updatedErrors.explanation) {
      console.log({ question, selectedAnswer, explanation, image });
    }
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
                state="disabled"
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
            <Label content="이미지 첨부 (최대 1개)" htmlFor="quiz-image" className="mb-1" />
            <input
              id="quiz-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {image && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <Icon icon="close" size={48} />
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <Label content="정답" htmlFor="answer" className="mb-1" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                alert="정답을 선택해주세요."
                size="M"
                state="enable"
                title="O"
                checked={selectedAnswer === 'O'}
                onChange={() => handleAnswerChange('O')}
              />
              <Radio
                alert="정답을 선택해주세요."
                size="M"
                state="enable"
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
    </FlexBox>
  );
}
