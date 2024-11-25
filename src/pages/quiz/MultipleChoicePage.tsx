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

export default function MultipleChoicePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 초기값 null로 설정
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [explanation, setExplanation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [fieldErrors, setFieldErrors] = useState({
    question: false,
    options: [false, false, false, false],
    explanation: false,
    answer: false,
  });

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

  // 이미지 첨부
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = [...images, ...files].slice(0, 4); // 최대 4개까지 제한
      setImages(newImages);
    }
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // 제출 버튼 클릭 시 유효성 검사 및 데이터 확인
  const handleSubmit = () => {
    const updatedErrors = {
      question: question.trim() === '',
      options: options.map((option) => option.trim() === ''),
      explanation: explanation.trim() === '',
      answer: selectedAnswer === null, // 정답 선택 여부 확인
    };

    setFieldErrors(updatedErrors);

    if (
      !updatedErrors.question &&
      !updatedErrors.options.some((err) => err) &&
      !updatedErrors.explanation &&
      !updatedErrors.answer
    ) {
      console.log({ question, options, selectedAnswer, explanation, images });
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
                state="disabled"
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
            <Label content="이미지 첨부 (최대 4개)" htmlFor="quiz-images" className="mb-1" />
            <input
              id="quiz-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    <Icon icon="close" size={48} />
                  </button>
                </div>
              ))}
            </div>
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
        <ShadcnButton className="w-full h-12 text-lg" size="default" onClick={handleSubmit}>
          퀴즈 생성하기
        </ShadcnButton>
      </Container>
    </FlexBox>
  );
}
