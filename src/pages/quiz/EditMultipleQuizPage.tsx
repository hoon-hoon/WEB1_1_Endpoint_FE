import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // 서버 연결 시 다시 활성화
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/shared/FlexBox';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/shared/Container';
import Label from '@/shared/Label';

// Mock 데이터
const MOCK_DATA = {
  id: 2,
  type: 'Multiple',
  content: '객관식 문제 내용',
  tags: ['일상', '태그', '테스트'],
  options: [
    { optionNumber: 1, title: 'react' },
    { optionNumber: 2, title: 'notion' },
    { optionNumber: 3, title: 'github' },
    { optionNumber: 4, title: 'jira' },
  ],
  answer: 4,
  explanation: '객관식 퀴즈 해설',
};

export default function EditMultipleChoicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    content: '',
    options: [] as { optionNumber: number; title: string }[],
    answer: 0, // 정답 번호 (0 = 선택 안 됨)
    explanation: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    content: false,
    options: [false, false, false, false],
    answer: false,
    explanation: false,
  });

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

  const handleInputChange = (field: string, value: string | number) => {
    setQuizData((prev) => ({ ...prev, [field]: value }));
    if (field !== 'options') {
      setFieldErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleOptionChange = (optionNumber: number, value: string) => {
    const updatedOptions = quizData.options.map((option) =>
      option.optionNumber === optionNumber ? { ...option, title: value } : option,
    );
    setQuizData((prev) => ({ ...prev, options: updatedOptions }));

    const updatedErrors = [...fieldErrors.options];
    updatedErrors[optionNumber - 1] = value.trim() === '';
    setFieldErrors((prev) => ({ ...prev, options: updatedErrors }));
  };

  const handleAnswerChange = (optionNumber: number) => {
    // 동일한 답변 클릭 시 선택 해제
    setQuizData((prev) => ({
      ...prev,
      answer: prev.answer === optionNumber ? 0 : optionNumber,
    }));
    setFieldErrors((prev) => ({ ...prev, answer: false }));
  };

  const validateFields = () => {
    const errors = {
      content: quizData.content.trim() === '',
      options: quizData.options.map((option) => option.title.trim() === ''),
      answer: quizData.answer === 0, // 정답 번호가 없으면 error
      explanation: quizData.explanation.trim() === '',
    };

    setFieldErrors(errors);
    return (
      !errors.content &&
      !errors.explanation &&
      !errors.answer &&
      !errors.options.some((error) => error)
    );
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      console.log('수정 에러 발생:', fieldErrors);
      return;
    }

    console.log('객관식 수정 데이터 제출:', quizData);

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
          leftText="객관식 퀴즈 수정"
          onClickLeft={() => navigate('/profile/quizManagement')}
        />
        <Card>
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
          </div>

          <div className="mb-4">
            <Label content="해설" />
            <TextArea
              value={quizData.explanation}
              onChange={(e) => handleInputChange('explanation', e.target.value)}
              placeholder="해설을 입력하세요."
              size="M"
              state={fieldErrors.explanation ? 'error' : 'enable'}
            />
          </div>
        </Card>
        <ShadcnButton size="default" className="w-full h-12 text-lg" onClick={handleSubmit}>
          퀴즈 수정하기
        </ShadcnButton>
      </Container>
    </FlexBox>
  );
}
