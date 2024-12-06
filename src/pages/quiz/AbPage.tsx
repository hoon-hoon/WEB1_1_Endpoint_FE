import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/components/layout/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import DropDown from '@/components/common/DropDown';
import Card from '@/components/common/Card';
import Container from '@/components/layout/Container';
import Label from '@/components/common/Label';
import ToastMessage from '@/components/common/ToastMessage';
import TagInput from '@/components/common/TagInput';
import useUploadImage from '@/api/quiz/useUploadImage';
import useCreateQuiz from '@/api/quiz/useCreateQuiz';
import { toEnglishCategory } from '@/utils/categoryConverter';

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

export default function ABTestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: uploadImageMutate } = useUploadImage();
  const { mutate: createQuizMutate } = useCreateQuiz();

  const [formData, setFormData] = useState({
    category: '', // 카테고리
    question: '', // 문제
    optionA: '', // A 선택지
    optionB: '', // B 선택지
    imageA: null as File | null, // A 이미지 파일
    imageB: null as File | null, // B 이미지 파일
    imageAId: null as number | null, // A 이미지 ID
    imageBId: null as number | null, // B 이미지 ID
    tags: [] as string[], // 태그
  });

  const [fieldErrors, setFieldErrors] = useState({
    category: false,
    question: false,
    optionA: false,
    optionB: false,
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

  const handleInputChange = (field: keyof typeof formData, value: string, maxLength?: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.slice(0, maxLength),
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleImageChange = async (
    field: 'imageA' | 'imageB',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        setToastMessage({ message: '이미지 크기는 2MB 이하로 업로드해주세요.', icon: 'warning' });
        setToastOpen(true);
        return;
      }

      uploadImageMutate(file, {
        onSuccess: (imageId) => {
          setFormData((prev) => ({
            ...prev,
            [field]: file,
            [`${field}Id`]: imageId,
          }));
        },
        onError: () => {
          setToastMessage({ message: '이미지 업로드에 실패했습니다.', icon: 'warning' });
          setToastOpen(true);
        },
      });
    }
  };

  const removeImage = (field: 'imageA' | 'imageB') => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
      [`${field}Id`]: null,
    }));
    const inputElement = document.getElementById(
      field === 'imageA' ? 'image-a' : 'image-b',
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  };
  const validateFields = () => {
    const errors = {
      category: formData.category.trim() === '',
      question: formData.question.trim() === '',
      optionA: formData.optionA.trim() === '',
      optionB: formData.optionB.trim() === '',
    };

    setFieldErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      setToastMessage({ message: '모든 항목을 작성해주세요.', icon: 'warning' });
      setToastOpen(true);
      return;
    }

    const englishCategory = toEnglishCategory(formData.category); // 카테고리 변환
    const payload = {
      category: englishCategory,
      type: 'AB_TEST',
      content: formData.question,
      tags: formData.tags,
      options: [
        { optionNumber: 1, content: formData.optionA, imageId: formData.imageAId },
        { optionNumber: 2, content: formData.optionB, imageId: formData.imageBId },
      ],
    };

    createQuizMutate(payload, {
      onSuccess: () => {
        setToastMessage({ message: '퀴즈가 생성되었습니다!', icon: 'check' });
        setToastOpen(true);
      },
      onError: () => {
        setToastMessage({ message: '퀴즈 생성에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      },
    });
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
          <div className="mb-2">
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
