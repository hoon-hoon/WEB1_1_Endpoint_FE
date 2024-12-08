import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/components/layout/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/components/layout/Container';
import DropDown from '@/components/common/DropDown';
import Label from '@/components/common/Label';
import ToastMessage from '@/components/common/ToastMessage';
import TagInput from '@/components/common/TagInput';
import useUpdateQuiz from '@/api/quiz/useUpdateQuiz';
import useFetchQuizData from '@/api/quiz/useFetchQuizData'; // React Query 훅
import { toEnglishCategory } from '@/utils/categoryConverter';

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

export default function EditOxQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateQuizMutate } = useUpdateQuiz();

  const { data: quizData, isLoading } = useFetchQuizData(id!);

  const [updatedQuizData, setUpdatedQuizData] = useState({
    category: '',
    content: '',
    answerNumber: null as number | null,
    explanation: '',
    tags: [] as string[],
  });

  const [fieldErrors, setFieldErrors] = useState({
    category: false,
    content: false,
    explanation: false,
    answerNumber: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  // 데이터 로딩 완료 시 초기화
  useEffect(() => {
    if (quizData) {
      setUpdatedQuizData({
        category: quizData.category,
        content: quizData.content,
        answerNumber: quizData.answerNumber || null,
        explanation: quizData.explanation || '',
        tags: quizData.tags,
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

  const handleAnswerChange = (answer: number) => {
    setUpdatedQuizData((prev) => ({
      ...prev,
      answerNumber: prev.answerNumber === answer ? null : answer, // 기존 값을 취소하면 null로 설정
    }));
    setFieldErrors((prev) => ({ ...prev, answerNumber: false }));
  };

  const validateFields = () => {
    const errors = {
      category: updatedQuizData.category.trim() === '',
      content: updatedQuizData.content.trim() === '',
      explanation: updatedQuizData.explanation.trim() === '',
      answerNumber: updatedQuizData.answerNumber === null,
    };
    setFieldErrors(errors);
    return !Object.values(errors).some((err) => err); // 에러가 없으면 true 반환
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      setToastMessage({
        message: '모든 항목을 작성해주세요.',
        icon: 'warning',
      });
      setToastOpen(true);
      return;
    }

    const payload = {
      id: Number(id),
      category: toEnglishCategory(updatedQuizData.category),
      type: 'OX',
      content: updatedQuizData.content,
      options: [
        { optionNumber: 1, content: 'O', imageId: null },
        { optionNumber: 2, content: 'X', imageId: null },
      ],
      answerNumber: updatedQuizData.answerNumber,
      explanation: updatedQuizData.explanation,
      tags: updatedQuizData.tags,
      deleteImageIds: [], // OX 퀴즈는 이미지가 없으므로 비워둠
    };

    updateQuizMutate(payload, {
      onSuccess: () => {
        setToastMessage({ message: '퀴즈가 성공적으로 수정되었습니다!', icon: 'check' });
        setToastOpen(true);

        queryClient.invalidateQueries({ queryKey: ['quizData'] });
        navigate('/profile/quizManagement');
      },
      onError: () => {
        setToastMessage({ message: '퀴즈 수정에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      },
    });
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <FlexBox direction="col">
      <Container>
        <TopBar
          leftIcon="left"
          leftText="OX 퀴즈 수정"
          onClickLeft={() => navigate('/profile/quizManagement')}
        />
        <Card>
          {/* 퀴즈 유형 */}
          <div className="mb-4">
            <Label content="퀴즈 유형" htmlFor="quiz-type" className="mb-1" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="readOnly"
                title="OX 퀴즈"
                checked={true}
              />
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="readOnly"
                title="AB 테스트"
                checked={false}
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

          {/* 카테고리 선택 */}
          <div className="mb-4">
            <Label content="카테고리" htmlFor="category" className="mb-1" />
            <DropDown
              items={categories}
              selectedItem={updatedQuizData.category}
              setItem={(value: string) => handleInputChange('category', value)}
              placeholder="카테고리를 선택하세요"
              alert="카테고리를 선택해주세요."
              required={fieldErrors.category}
            />
          </div>

          {/* 문제 입력 */}
          <div className="mb-4">
            <Label content="문제" />
            <TextArea
              value={updatedQuizData.content}
              onChange={(e) => handleInputChange('content', e.target.value, 70)}
              placeholder="문제를 입력하세요."
              size="M"
              state={fieldErrors.content ? 'error' : 'enable'}
            />
          </div>

          {/* 정답 선택 */}
          <div className="mb-4">
            <Label content="정답" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                size="M"
                state={fieldErrors.answerNumber ? 'error' : 'enable'}
                title="O"
                checked={updatedQuizData.answerNumber === 1}
                onChange={() => handleAnswerChange(1)}
              />
              <Radio
                size="M"
                state={fieldErrors.answerNumber ? 'error' : 'enable'}
                title="X"
                checked={updatedQuizData.answerNumber === 2}
                onChange={() => handleAnswerChange(2)}
              />
            </div>
            {fieldErrors.answerNumber && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <Icon icon="warning_triangle_filled" className="mr-2" size={16} />
                정답을 선택해주세요.
              </div>
            )}
          </div>

          {/* 해설 입력 */}
          <Label content="해설" />
          <TextArea
            value={updatedQuizData.explanation}
            onChange={(e) => handleInputChange('explanation', e.target.value, 100)}
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
