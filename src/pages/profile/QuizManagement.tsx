import { useState } from 'react';
import TopBar from '@/components/common/TopBar';
import Card from '@/components/common/Card';
import { Button } from '@/shadcn/ui/button';
import { useNavigate } from 'react-router-dom';
import Container from '@/shared/Container';
import FlexBox from '@/shared/FlexBox';

interface Quiz {
  id: number;
  question: string;
  type: 'OX' | 'AB' | '객관식';
  hasBeenAttempted: boolean;
  options?: string[];
}

export default function MyQuizManagement() {
  const navigate = useNavigate();
  const [quizzes] = useState<Quiz[]>([
    {
      id: 1,
      question: 'React의 Virtual DOM은 실제 DOM보다 항상 빠른가요?',
      type: 'OX',
      hasBeenAttempted: true,
    },
    {
      id: 2,
      question: 'UI 디자인에서 더 중요한 것은?',
      type: 'AB',
      hasBeenAttempted: false,
    },
    {
      id: 3,
      question: '다음 중 JavaScript의 원시 타입이 아닌 것은?',
      type: '객관식',
      hasBeenAttempted: false,
      options: ['String', 'Number', 'Boolean', 'Object'],
    },
  ]);

  const handleEdit = (id: number) => {
    console.log(`Editing quiz with id: ${id}`);
  };

  return (
    <Container>
      <TopBar
        leftIcon="left"
        leftText="내 퀴즈 관리"
        onClickLeft={() => {
          navigate('/profile');
        }}
      />
      <FlexBox>
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="border-gray-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900 mb-1">{quiz.question}</p>
                  <span className="text-sm text-gray-500">{quiz.type} 퀴즈</span>
                </div>
                <Button
                  onClick={() => handleEdit(quiz.id)}
                  disabled={quiz.hasBeenAttempted}
                  variant="outline"
                  size="sm"
                  className="ml-4"
                >
                  수정
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </FlexBox>
    </Container>
  );
}
