import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // 서버와 연결 시 활성화
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/shared/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/shared/Container';
import Label from '@/shared/Label';
import ToastMessage from '@/components/common/ToastMessage';
// Mock 데이터
const MOCK_DATA = {
  type: 'AB',
  content: 'AB 퀴즈 내용',
  optionA: {
    text: 'A 선택지 텍스트',
    image: null,
  },
  optionB: {
    text: 'B 선택지 텍스트',
    image: null,
  },
  explanation: 'AB 퀴즈 해설',
};

export default function EditAbQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    content: '', // 문제
    optionA: { text: '', image: null as File | null }, // A 선택지
    optionB: { text: '', image: null as File | null }, // B 선택지
    explanation: '', // 해설
  });

  const [fieldErrors, setFieldErrors] = useState({
    content: false,
    optionA: false,
    optionB: false,
    explanation: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', icon: 'check' });

  useEffect(() => {
    // Mock 데이터 퀴즈로 로드
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
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleOptionChange = (
    option: 'optionA' | 'optionB',
    field: 'text' | 'image',
    value: string | File | null,
  ) => {
    setQuizData((prev) => ({
      ...prev,
      [option]: {
        ...prev[option],
        [field]: value,
      },
    }));

    if (field === 'text') {
      setFieldErrors((prev) => ({ ...prev, [option]: value === '' }));
    }
  };

  const validateFields = () => {
    const errors = {
      content: quizData.content.trim() === '',
      optionA: quizData.optionA.text.trim() === '',
      optionB: quizData.optionB.text.trim() === '',
      explanation: quizData.explanation.trim() === '',
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

    console.log('AB 퀴즈 수정 데이터 제출:', quizData);

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

  const handleImageChange = (
    option: 'optionA' | 'optionB',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleOptionChange(option, 'image', e.target.files[0]);
    }
  };

  const removeImage = (option: 'optionA' | 'optionB') => {
    handleOptionChange(option, 'image', null);
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
            <div className="mb-2">
              <Label content="A 선택지" />
              <TextField
                mode="outlined"
                value={quizData.optionA.text}
                onChange={(e) => handleOptionChange('optionA', 'text', e.target.value)}
                placeholder="A 선택지 텍스트를 입력하세요."
                size="M"
                state={fieldErrors.optionA ? 'error' : 'enable'}
              />
            </div>
            <Label content="A 이미지 첨부" htmlFor="image-a" className="mb-1" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('optionA', e)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {quizData.optionA.image && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(quizData.optionA.image as File)}
                  alt="A 선택지 이미지"
                  className="w-full h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('optionA')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <Icon icon="close" size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="mb-2">
              <Label content="B 선택지" />
              <TextField
                mode="outlined"
                value={quizData.optionB.text}
                onChange={(e) => handleOptionChange('optionB', 'text', e.target.value)}
                placeholder="B 선택지 텍스트를 입력하세요."
                size="M"
                state={fieldErrors.optionB ? 'error' : 'enable'}
              />
            </div>
            <Label content="B 이미지 첨부" htmlFor="image-b" className="mb-1" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('optionB', e)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {quizData.optionB.image && (
              <div className="relative mt-2">
                <img
                  src={URL.createObjectURL(quizData.optionB.image as File)}
                  alt="B 선택지 이미지"
                  className="w-full h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage('optionB')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <Icon icon="close" size={20} />
                </button>
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
