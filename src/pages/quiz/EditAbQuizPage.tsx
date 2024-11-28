import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // 서버와 연결 시 활성화
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import FlexBox from '@/components/layout/FlexBox';
import Radio from '@eolluga/eolluga-ui/Input/Radio';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import TextArea from '@eolluga/eolluga-ui/Input/TextArea';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import Container from '@/components/layout/Container';
import Label from '@/components/common/Label';
import ToastMessage from '@/components/common/ToastMessage';
// // Mock 데이터
// const MOCK_DATA = {
//   type: 'AB',
//   content: 'AB 퀴즈 내용',
//   optionA: {
//     text: 'A 선택지 텍스트',
//     image: null,
//   },
//   optionB: {
//     text: 'B 선택지 텍스트',
//     image: null,
//   },
//   explanation: 'AB 퀴즈 해설',
// };
const MOCK_DATA = {
  question: 'AB 테스트 문제.',
  optionA: 'A 선택지를 입력하세요.',
  optionB: 'B 선택지를 입력하세요.',
  imageA: null as File | null,
  imageB: null as File | null,
  explanation: '해설 입니다.',
};

export default function EditAbQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // const [quizData, setQuizData] = useState({
  //   content: '', // 문제
  //   optionA: { text: '', image: null as File | null }, // A 선택지
  //   optionB: { text: '', image: null as File | null }, // B 선택지
  //   explanation: '', // 해설
  // });
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

  useEffect(() => {
    // Mock 데이터 퀴즈로 로드
    console.log('Mock 데이터 로드:', MOCK_DATA);
    setFormData(MOCK_DATA);

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

    setToastMessage({ message: '퀴즈가 성공적으로 수정되었습니다!', icon: 'check' });
    setToastOpen(true);

    console.log('제출된 데이터:', formData);

    // 예시: 서버로 수정된 데이터 전송
    // updateQuizData(id, formData);

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
    field: 'imageA' | 'imageB',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 이미지 크기 제한 (2MB 이하)
      if (file.size > 2 * 1024 * 1024) {
        setToastMessage({
          message: '이미지 크기는 2MB 이하로 업로드해주세요.',
          icon: 'warning',
        });
        setToastOpen(true);
        return;
      }

      // 이미지 파일 설정
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
      setFieldErrors((prev) => ({
        ...prev,
        [field]: false,
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
              value={formData.question}
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
                value={formData.optionA}
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
                value={formData.optionB}
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
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <Icon icon="close" size={20} />
                </button>
              </div>
            )}
          </div>

          <Label content="해설" />
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
