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

  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    imageA: null as File | null,
    imageB: null as File | null,
    explanation: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    question: false,
    optionA: false,
    optionB: false,
    explanation: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  const [selectedQuizType, setSelectedQuizType] = useState('');

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

  const handleInputChange = (field: keyof typeof formData, value: string, maxLength: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.slice(0, maxLength),
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleImageChange = (
    field: 'imageA' | 'imageB',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 이미지 파일 크기 제한 (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setToastMessage({
          message: '이미지 크기는 2MB 이하로 업로드해주세요.',
          icon: 'warning',
        });
        setToastOpen(true);
        return;
      }

      // 이미지 업데이트
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));

      setFieldErrors((prev) => ({
        ...prev,
        [field]: false, // 에러 상태 초기화
      }));
    }
  };

  const removeImage = (field: 'imageA' | 'imageB') => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
    }));
    const inputElement = document.getElementById(
      field === 'imageA' ? 'image-a' : 'image-b',
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''; // 삭제 시 파일 입력 초기화
    }
  };
  const validateFields = () => {
    const errors = {
      question: formData.question.trim() === '',
      optionA: formData.optionA.trim() === '',
      optionB: formData.optionB.trim() === '',
      explanation: formData.explanation.trim() === '',
    };

    setFieldErrors(errors);
    return !Object.values(errors).some((error) => error);
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
          leftText="AB 테스트 만들기"
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
              value={formData.question}
              onChange={(e) => handleInputChange('question', e.target.value, 42)}
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
                value={formData.optionA}
                onChange={(e) => handleInputChange('optionA', e.target.value, 20)}
                placeholder="A 선택지를 입력하세요."
                size="M"
                state={fieldErrors.optionA ? 'error' : 'enable'}
              />
            </div>
            <Label content="A 이미지 첨부" htmlFor="image-a" className="mb-1" />
            <input
              id="image-a"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('imageA', e)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {formData.imageA && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(formData.imageA)}
                  alt="A 선택지 이미지"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('imageA')}
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
                value={formData.optionB}
                onChange={(e) => handleInputChange('optionB', e.target.value, 20)}
                placeholder="B 선택지를 입력하세요."
                size="M"
                state={fieldErrors.optionB ? 'error' : 'enable'}
              />
            </div>
            <Label content="B 이미지 첨부" htmlFor="image-b" className="mb-1" />
            <input
              id="image-b"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('imageB', e)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {formData.imageB && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(formData.imageB)}
                  alt="B 선택지 이미지"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('imageB')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <Icon icon="close" size={48} />
                </button>
              </div>
            )}
          </div>
          <Label content="해설" htmlFor="explanation" className="mb-1" />
          <TextArea
            value={formData.explanation}
            onChange={(e) => handleInputChange('explanation', e.target.value, 70)}
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
