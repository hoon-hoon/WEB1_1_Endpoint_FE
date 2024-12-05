import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import axiosInstance from '@/api/axiosInstance';
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

export default function EditOxQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutate: updateQuizMutate } = useUpdateQuiz();

  // 임시 get 퀴즈 데이터
  const [quizData, setQuizData] = useState({
    category: '', // 카테고리
    content: '', // 질문
    answerNumber: null as number | null, // 정답 번호 (1: O, 2: X)
    explanation: '', // 해설
    tags: [] as string[], // 태그
    options: [
      { optionNumber: 1, content: 'O', imageId: null },
      { optionNumber: 2, content: 'X', imageId: null },
    ],
  });

  const [fieldErrors, setFieldErrors] = useState({
    category: false,
    content: false,
    explanation: false,
    answerNumber: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  // 퀴즈 데이터 가져오기 (GET 요청)
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/${id}`); // 특정 ID로 데이터 가져오기
        const { result } = response.data;
        setQuizData({
          category: toKoreanCategory(result.category),
          content: result.content,
          answerNumber: result.answerNumber,
          explanation: result.explanation,
          tags: result.tags || [],
          options: result.options || [
            { optionNumber: 1, content: 'O', imageId: null },
            { optionNumber: 2, content: 'X', imageId: null },
          ],
        });
      } catch (error) {
        console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
        setToastMessage({
          message: '퀴즈 데이터를 불러오는 데 실패했습니다.',
          icon: 'warning',
        });
        setToastOpen(true);
      }
    };

    if (id) fetchQuizData();
  }, [id]);

  const handleInputChange = (field: keyof typeof quizData, value: string, maxLength?: number) => {
    setQuizData((prev) => ({ ...prev, [field]: value.slice(0, maxLength) })); // 최대 글자 수 제한
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleAnswerChange = (answer: number) => {
    setQuizData((prev) => ({
      ...prev,
      answerNumber: prev.answerNumber === answer ? null : answer, // 기존 값을 취소하면 null로 설정
    }));
    setFieldErrors((prev) => ({ ...prev, answerNumber: false }));
  };

  const validateFields = () => {
    const errors = {
      category: quizData.category.trim() === '',
      content: quizData.content.trim() === '',
      explanation: quizData.explanation.trim() === '',
      answerNumber: quizData.answerNumber === null,
    };
    setFieldErrors(errors);
    return !Object.values(errors).some((err) => err); // 에러가 없으면 true 반환
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      setToastMessage({
        message: '모든 항목을 작성해주세요.',
        icon: 'warning',
      });
      setToastOpen(true);
      return;
    }

    const englishCategory = toEnglishCategory(quizData.category);
    const payload = {
      id: Number(id), // 퀴즈 ID
      category: englishCategory,
      type: 'OX', // OX 퀴즈 고정
      content: quizData.content,
      options: quizData.options,
      answerNumber: quizData.answerNumber,
      explanation: quizData.explanation,
      tags: quizData.tags,
      deleteImageIds: [],
    };

    updateQuizMutate(payload, {
      onSuccess: () => {
        setToastMessage({ message: '퀴즈가 성공적으로 수정되었습니다!', icon: 'check' });
        setToastOpen(true);
        navigate('/profile/quizManagement'); // 수정 완료 후 이동
      },
      onError: () => {
        setToastMessage({ message: '퀴즈 수정에 실패했습니다.', icon: 'warning' });
        setToastOpen(true);
      },
    });
  };

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
              tags={quizData.tags}
              setTags={(tags) => setQuizData((prev) => ({ ...prev, tags }))}
            />
          </div>

          {/* 카테고리 선택 */}
          <div className="mb-4">
            <Label content="카테고리" htmlFor="category" className="mb-1" />
            <DropDown
              items={categories}
              selectedItem={quizData.category}
              setItem={(value: string) => handleInputChange('category', value)}
              placeholder="카테고리를 선택하세요"
              alert="카테고리를 선택해주세요."
              required={fieldErrors.category && quizData.category === ''}
            />
          </div>

          <div className="mb-4">
            <Label content="문제" />
            <TextArea
              value={quizData.content}
              onChange={(e) => handleInputChange('content', e.target.value, 42)}
              placeholder="문제를 입력하세요."
              size="M"
              state={fieldErrors.content ? 'error' : 'enable'}
            />
          </div>

          <div className="mb-4">
            <Label content="정답" />
            <div className="flex flex-row items-center gap-4">
              <Radio
                size="M"
                state={fieldErrors.answerNumber ? 'error' : 'enable'}
                title="O"
                checked={quizData.answerNumber === 1}
                onChange={() => handleAnswerChange(1)}
              />
              <Radio
                size="M"
                state={fieldErrors.answerNumber ? 'error' : 'enable'}
                title="X"
                checked={quizData.answerNumber === 2}
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

          <Label content="해설" />
          <TextArea
            value={quizData.explanation}
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
