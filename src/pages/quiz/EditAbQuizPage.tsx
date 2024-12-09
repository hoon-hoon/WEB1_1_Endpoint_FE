import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
import { useFetchQuizData, fetchImageUrl } from '@/api/quiz/useFetchQuizData';
import { uploadImage } from '@/api/quiz/useUploadImage';
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

export default function EditABTestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateQuizMutate } = useUpdateQuiz();
  const { data: quizData, isLoading } = useFetchQuizData(id!);

  const [updatedQuizData, setUpdatedQuizData] = useState({
    category: '',
    question: '',
    optionA: '',
    optionB: '',
    imageA: null as string | null,
    imageB: null as string | null,
    imageAId: null as number | null,
    imageBId: null as number | null,
    tags: [] as string[],
  });

  const [fieldErrors, setFieldErrors] = useState({
    category: false,
    question: false,
    optionA: false,
    optionB: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  // 데이터 로딩 완료 시 초기화
  useEffect(() => {
    if (quizData) {
      const optionA = quizData.options.find((option) => option.optionNumber === 1);
      const optionB = quizData.options.find((option) => option.optionNumber === 2);

      Promise.all([
        optionA?.imageId ? fetchImageUrl(optionA.imageId) : null,
        optionB?.imageId ? fetchImageUrl(optionB.imageId) : null,
      ]).then(([imageAUrl, imageBUrl]) => {
        setUpdatedQuizData({
          category: quizData.category,
          question: quizData.content,
          optionA: optionA?.content || '',
          optionB: optionB?.content || '',
          imageA: imageAUrl,
          imageB: imageBUrl,
          imageAId: optionA?.imageId || null,
          imageBId: optionB?.imageId || null,
          tags: quizData.tags,
        });
      });
    }
  }, [quizData]);

  const handleInputChange = (
    field: keyof typeof updatedQuizData,
    value: string,
    maxLength?: number,
  ) => {
    setUpdatedQuizData((prev) => ({ ...prev, [field]: value.slice(0, maxLength) }));
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
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
        const imageUrl = await fetchImageUrl(imageId);

        setUpdatedQuizData((prev) => ({
          ...prev,
          [field]: imageUrl,
          [`${field}Id`]: imageId,
        }));
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        setToastMessage({ message: '이미지 업로드에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      }
    }
  };

  const removeImage = (field: 'imageA' | 'imageB') => {
    setUpdatedQuizData((prev) => ({
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
      category: updatedQuizData.category.trim() === '',
      question: updatedQuizData.question.trim() === '',
      optionA: updatedQuizData.optionA.trim() === '',
      optionB: updatedQuizData.optionB.trim() === '',
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
      category: toEnglishCategory(updatedQuizData.category),
      type: 'AB_TEST',
      content: updatedQuizData.question,
      options: [
        { optionNumber: 1, content: updatedQuizData.optionA, imageId: updatedQuizData.imageAId },
        { optionNumber: 2, content: updatedQuizData.optionB, imageId: updatedQuizData.imageBId },
      ],
      tags: updatedQuizData.tags,
      deleteImageIds: [],
    };

    updateQuizMutate(payload, {
      onSuccess: () => {
        setToastMessage({ message: 'AB 테스트가 성공적으로 수정되었습니다!', icon: 'check' });
        setToastOpen(true);
        queryClient.invalidateQueries({ queryKey: ['quizData', id] });
        navigate('/profile/quizManagement');
      },
      onError: () => {
        setToastMessage({ message: '수정에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      },
    });
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <FlexBox direction="col">
      <AboutPage
        title="AB 테스트"
        description="내가 만든 AB 테스트를 수정하기 위한 페이지입니다."
        keywords="quiz, AB, 퀴즈, AB 테스트"
      />
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
              tags={updatedQuizData.tags}
              setTags={(tags) => setUpdatedQuizData((prev) => ({ ...prev, tags }))}
            />
          </div>

          <div className="mb-4">
            <Label content="카테고리" />
            <DropDown
              items={categories}
              selectedItem={updatedQuizData.category}
              setItem={(value: string) => handleInputChange('category', value)}
              placeholder="카테고리를 선택하세요."
              alert="카테고리를 선택해주세요."
              required={fieldErrors.category}
            />
          </div>
          <div className="mb-4">
            <Label content="문제" />
            <TextArea
              value={updatedQuizData.question}
              onChange={(e) => handleInputChange('question', e.target.value, 70)}
              placeholder="문제를 입력하세요."
              size="M"
              state={fieldErrors.question ? 'error' : 'enable'}
            />
          </div>

          <div className="mb-4">
            <div className="mb-2">
              <Label content="A 선택지" />
              <TextField
                value={updatedQuizData.optionA}
                onChange={(e) => handleInputChange('optionA', e.target.value, 30)} // 선택지는 20자 제한
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
            {updatedQuizData.imageA && (
              <div className="relative mt-2">
                <img
                  src={updatedQuizData.imageA}
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
                value={updatedQuizData.optionB}
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
            {updatedQuizData.imageB && (
              <div className="relative mt-2">
                <img
                  src={updatedQuizData.imageB}
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
          퀴즈 수정하기
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
