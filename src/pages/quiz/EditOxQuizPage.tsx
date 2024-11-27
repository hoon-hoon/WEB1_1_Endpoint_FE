import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // 서버 연결 시 다시 활성화
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/shared/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/shared/Container';
import Label from '@/shared/Label';
import ToastMessage from '@/components/common/ToastMessage';

// Mock 데이터
const MOCK_DATA = {
  type: 'OX',
  content: 'OX 퀴즈 내용',
  answer: 'O',
  explanation: '정답',
};

export default function EditOxQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    content: '', // 질문
    answer: '', // 정답
    explanation: '', // 해설
  });

  const [fieldErrors, setFieldErrors] = useState({
    content: false,
    explanation: false,
    answer: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  useEffect(() => {
    // Mock 데이터 로드
    console.log('Mock 데이터 로드:', MOCK_DATA);
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

  const handleInputChange = (field: string, value: string) => {
    setQuizData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: false })); // 입력 시 에러 제거
  };

  const handleAnswerChange = (answer: string) => {
    // 동일한 답변 클릭 시 선택 해제
    setQuizData((prev) => ({
      ...prev,
      answer: prev.answer === answer ? '' : answer,
    }));
    setFieldErrors((prev) => ({ ...prev, answer: false })); // 선택 시 에러 제거
  };

  const validateFields = () => {
    const errors = {
      content: quizData.content.trim() === '',
      explanation: quizData.explanation.trim() === '',
      answer: quizData.answer === '', // 정답이 비어 있으면 에러
    };
    setFieldErrors(errors);
    return !Object.values(errors).some((err) => err);
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

    console.log('OX 퀴즈 수정 데이터 제출:', quizData);

    setToastMessage({ message: '퀴즈가 성공적으로 수정되었습니다!', icon: 'check' });
    setToastOpen(true);

    // 서버 연결 시 활성화
    // try {
    //   await axios.put(`/api/quiz/${id}`, quizData);
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
          leftText="OX 퀴즈 수정"
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
          <div className="mb-4">
            <Label content="문제" />
            <TextArea
              value={quizData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
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
                state={fieldErrors.answer ? 'error' : 'enable'}
                title="O"
                checked={quizData.answer === 'O'}
                onChange={() => handleAnswerChange('O')}
              />
              <Radio
                size="M"
                state={fieldErrors.answer ? 'error' : 'enable'}
                title="X"
                checked={quizData.answer === 'X'}
                onChange={() => handleAnswerChange('X')}
              />
            </div>
            {fieldErrors.answer && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <Icon icon="warning_triangle_filled" className="mr-2" size={16} />
                정답을 선택해주세요.
              </div>
            )}
          </div>

          <Label content="해설" />
          <TextArea
            value={quizData.explanation}
            onChange={(e) => handleInputChange('explanation', e.target.value)}
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
