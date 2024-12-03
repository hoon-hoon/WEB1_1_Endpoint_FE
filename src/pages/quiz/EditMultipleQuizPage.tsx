import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/components/layout/FlexBox';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/components/layout/Container';
import Label from '@/components/common/Label';
import ToastMessage from '@/components/common/ToastMessage';
import DropDown from '@/components/common/DropDown';

// Mock 데이터
const MOCK_DATA = {
  id: 2,
  type: 'Multiple',
  category: '프로그래밍 언어',
  content: '객관식 문제 내용',
  options: [
    { optionNumber: 1, title: 'React' },
    { optionNumber: 2, title: 'Node.js' },
    { optionNumber: 3, title: 'Python' },
    { optionNumber: 4, title: 'Java' },
  ],
  answer: 2,
  explanation: '이 문제의 정답은 Node.js입니다.',
};

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

export default function EditMultipleChoicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    category: '',
    content: '',
    options: [] as { optionNumber: number; title: string }[],
    answer: 0, // 정답 번호 (0 = 선택 안 됨)
    explanation: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    category: false,
    content: false,
    options: [false, false, false, false],
    answer: false,
    explanation: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  useEffect(() => {
    // Mock 데이터 로드
    setQuizData(MOCK_DATA);

    // 서버 연결 시 활성화
    // const fetchQuiz = async () => {
    //   try {
    //     const response = await axios.get(`/api/quiz/${id}`);
    //     setQuizData(response.data.result);
    //   } catch (error) {
    //     console.error('퀴즈 데이터를 불러오는 중 오류 발생:', error);
    //   }
    // };
    // fetchQuiz();
  }, [id]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: string, value: string, maxLength?: number) => {
    setQuizData((prev) => ({ ...prev, [field]: value.slice(0, maxLength) }));
    if (field !== 'options') {
      setFieldErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // 선택지 변경 핸들러
  const handleOptionChange = (optionNumber: number, value: string) => {
    const updatedOptions = quizData.options.map((option) =>
      option.optionNumber === optionNumber ? { ...option, title: value.slice(0, 20) } : option,
    );
    setQuizData((prev) => ({ ...prev, options: updatedOptions }));

    const updatedErrors = [...fieldErrors.options];
    updatedErrors[optionNumber - 1] = value.trim() === '';
    setFieldErrors((prev) => ({ ...prev, options: updatedErrors }));
  };

  // 정답 선택 핸들러
  const handleAnswerChange = (optionNumber: number) => {
    setQuizData((prev) => ({
      ...prev,
      answer: prev.answer === optionNumber ? 0 : optionNumber,
    }));
    setFieldErrors((prev) => ({ ...prev, answer: false }));
  };

  // 카테고리 선택 핸들러
  const handleCategoryChange = (category: string) => {
    setQuizData((prev) => ({ ...prev, category }));
    setFieldErrors((prev) => ({ ...prev, category: false }));
  };

  // 유효성 검사
  const validateFields = () => {
    const errors = {
      category: quizData.category.trim() === '',
      content: quizData.content.trim() === '',
      options: quizData.options.map((option) => option.title.trim() === ''),
      answer: quizData.answer === 0, // 정답 번호가 없으면 error
      explanation: quizData.explanation.trim() === '',
    };

    setFieldErrors(errors);
    return (
      !errors.category &&
      !errors.content &&
      !errors.explanation &&
      !errors.answer &&
      !errors.options.some((error) => error)
    );
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

    const payload = {
      id: id,
      type: 'Multiple',
      category: quizData.category,
      content: quizData.content,
      options: quizData.options,
      answer: quizData.answer,
      explanation: quizData.explanation,
    };

    console.log('Payload for submission:', payload);

    setToastMessage({ message: '퀴즈가 성공적으로 수정되었습니다!', icon: 'check' });
    setToastOpen(true);

    // 서버 연결 시 활성화
    // try {
    //   await axios.put(`/api/quiz/${id}`, payload);
    //   alert('퀴즈가 성공적으로 수정되었습니다.');
    //   navigate('/profile/quizManagement');
    // } catch (error) {
    //   console.error('퀴즈 수정 중 오류 발생:', error);
    //   alert('퀴즈 수정 중 오류가 발생했습니다.');
    // }
  };

  return (
    <FlexBox direction="col">
      <Container>
        <TopBar
          leftIcon="left"
          leftText="객관식 퀴즈 수정"
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
                checked={false}
              />
              <Radio
                alert="퀴즈 유형을 선택해주세요."
                size="M"
                state="readOnly"
                title="객관식"
                checked={true}
              />
            </div>
          </div>
          {/* 카테고리 선택 */}
          <div className="mb-4">
            <Label content="카테고리" />
            <DropDown
              items={categories}
              selectedItem={quizData.category}
              setItem={handleCategoryChange}
              placeholder="카테고리를 선택하세요."
              alert="카테고리를 선택해주세요."
              required={fieldErrors.category}
            />
          </div>

          {/* 문제 입력 */}
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

          {/* 선택지 입력 */}
          <div className="mb-4">
            {quizData.options.map((option) => (
              <div key={option.optionNumber} className="mb-2">
                <Label content={`${option.optionNumber}번 선택지`} />
                <TextField
                  mode="outlined"
                  value={option.title}
                  onChange={(e) => handleOptionChange(option.optionNumber, e.target.value)}
                  placeholder={`${option.optionNumber}번 선택지를 입력하세요.`}
                  size="M"
                  state={fieldErrors.options[option.optionNumber - 1] ? 'error' : 'enable'}
                />
              </div>
            ))}
          </div>

          {/* 정답 선택 */}
          <div className="mb-4">
            <Label content="정답" />
            <div className="flex flex-row items-center gap-4">
              {quizData.options.map((option) => (
                <Radio
                  key={option.optionNumber}
                  size="M"
                  state={fieldErrors.answer ? 'error' : 'enable'}
                  title={`${option.optionNumber}`}
                  checked={quizData.answer === option.optionNumber}
                  onChange={() => handleAnswerChange(option.optionNumber)}
                />
              ))}
            </div>
            {fieldErrors.answer && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <Icon icon="warning_triangle_filled" className="mr-2" size={16} />
                정답을 선택해주세요.
              </div>
            )}
          </div>

          {/* 해설 입력 */}
          <Label content="해설" />
          <TextArea
            value={quizData.explanation}
            onChange={(e) => handleInputChange('explanation', e.target.value, 70)}
            placeholder="해설을 입력하세요."
            size="M"
            state={fieldErrors.explanation ? 'error' : 'enable'}
          />
        </Card>

        {/* 제출 버튼 */}
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
