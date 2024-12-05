import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/components/layout/FlexBox';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import DropDown from '@/components/common/DropDown';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import Card from '@/components/common/Card';
import Container from '@/components/layout/Container';
import Label from '@/components/common/Label';
import ToastMessage from '@/components/common/ToastMessage';
import TagInput from '@/components/common/TagInput';
import useUpdateQuiz from '@/api/quiz/useUpdateQuiz';
import axiosInstance from '@/api/axiosInstance';
import { uploadImage } from '@/api/quiz/useUploadImage';
import { toEnglishCategory, toKoreanCategory } from '@/utils/categoryConverter';

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutate: updateQuizMutate } = useUpdateQuiz();

  const [quizData, setQuizData] = useState({
    category: '',
    question: '',
    optionA: '',
    optionB: '',
    imageA: null as File | null,
    imageB: null as File | null,
    imageAId: null as number | null,
    imageBId: null as number | null,
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

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/${id}`);
        const { result } = response.data;
        console.log('퀴즈 데이터 불러오기:', result);

        setQuizData({
          category: toKoreanCategory(result.category),
          question: result.content,
          optionA: result.options.find((option: any) => option.optionNumber === 1)?.content || '',
          optionB: result.options.find((option: any) => option.optionNumber === 2)?.content || '',
          imageAId:
            result.options.find((option: any) => option.optionNumber === 1)?.imageId || null,
          imageBId:
            result.options.find((option: any) => option.optionNumber === 2)?.imageId || null,
          imageA: null, // 이미지는 서버에서 가져온 후 미리보기가 없기 때문에 null로 초기화
          imageB: null,
          tags: result.tags || [],
        });
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setToastMessage({
          message: '데이터를 불러오는 데 실패했습니다.',
          icon: 'warning',
        });
        setToastOpen(true);
      }
    };

    if (id) fetchQuizData();
  }, [id]);

  const handleInputChange = (field: keyof typeof quizData, value: string, maxLength?: number) => {
    setQuizData((prev) => ({
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

      try {
        const imageId = await uploadImage(file);
        console.log('업로드한 이미지 ID:', imageId);
        setQuizData((prev) => ({
          ...prev,
          [field]: file,
          [`${field}Id`]: imageId,
        }));
      } catch (error) {
        setToastMessage({ message: '이미지 업로드에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      }
    }
  };

  const removeImage = (field: 'imageA' | 'imageB') => {
    setQuizData((prev) => ({
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
      category: quizData.category.trim() === '',
      question: quizData.question.trim() === '',
      optionA: quizData.optionA.trim() === '',
      optionB: quizData.optionB.trim() === '',
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

    const payload = {
      id: Number(id),
      category: toEnglishCategory(quizData.category),
      type: 'AB_TEST',
      content: quizData.question,
      options: [
        { optionNumber: 1, content: quizData.optionA, imageId: quizData.imageAId },
        { optionNumber: 2, content: quizData.optionB, imageId: quizData.imageBId },
      ],
      tags: quizData.tags,
      deleteImageIds: [],
    };

    console.log('Payload:', payload);

    updateQuizMutate(payload, {
      onSuccess: () => {
        setToastMessage({ message: 'AB 테스트가 성공적으로 수정되었습니다!', icon: 'check' });
        setToastOpen(true);
        navigate('/profile/quizManagement');
      },
      onError: () => {
        setToastMessage({ message: '수정에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      },
    });
  };

  return (
    <FlexBox direction="col">
      <Container>
        <TopBar
          leftIcon="left"
          leftText="AB 테스트 수정"
          onClickLeft={() => navigate('/profile/quizManagement')}
        />
        <Card>
          <div className="mb-4">
            <Label content="퀴즈 유형" htmlFor="quiz-type" className="mb-1" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="readOnly"
                title="OX 퀴즈"
                checked={false}
              />
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="readOnly"
                title="AB 테스트"
                checked={true}
              />
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="readOnly"
                title="객관식"
                checked={false}
              />
            </div>
          </div>

          {/* 태그 입력 */}
          <div className="mb-4">
            <Label content="태그" htmlFor="tags" className="mb-1" />
            <TagInput
              tags={quizData.tags}
              setTags={(tags) => setQuizData((prev) => ({ ...prev, tags }))}
            />
          </div>

          <div className="mb-4">
            <Label content="카테고리" />
            <DropDown
              items={categories}
              selectedItem={quizData.category}
              setItem={(value: string) => handleInputChange('category', value)}
              placeholder="카테고리를 선택하세요."
              alert="카테고리를 선택해주세요."
              required={fieldErrors.category}
            />
          </div>
          <div className="mb-4">
            <Label content="문제" />
            <TextArea
              value={quizData.question}
              onChange={(e) => handleInputChange('question', e.target.value, 42)} // 문제는 42자 제한
              placeholder="문제를 입력하세요."
              size="M"
              state={fieldErrors.question ? 'error' : 'enable'}
            />
          </div>

          <div className="mb-4">
            <div className="mb-2">
              <Label content="A 선택지" />
              <TextField
                value={quizData.optionA}
                onChange={(e) => handleInputChange('optionA', e.target.value, 20)} // 선택지는 20자 제한
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
            {quizData.imageA && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(quizData.imageA)}
                  alt="A 선택지 이미지"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('imageA')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <Icon icon="close" size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="mb-2">
            <div className="mb-2">
              <Label content="B 선택지" />
              <TextField
                value={quizData.optionB}
                onChange={(e) => handleInputChange('optionB', e.target.value, 20)} // 선택지는 20자 제한
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
            {quizData.imageB && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(quizData.imageB)}
                  alt="B 선택지 이미지"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('imageB')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <Icon icon="close" size={20} />
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
