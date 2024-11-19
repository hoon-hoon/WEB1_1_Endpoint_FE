import { QuizWrapper } from '@/components';

const dummyQuizzes = [
  {
    id: 1,
    type: 'OX',
    author: 'React Expert',
    authorAvatar: 'avatarUrl',
    question: 'React의 Virtual DOM은 실제 DOM보다 항상 빠릅니까?',
    correctAnswer: 'X',
    explanation: 'Virtual DOM이 항상 빠른 것은 아닙니다.',
    likes: 120,
    comments: [
      { id: 1, author: 'User1', authorAvatar: 'commentAvatarUrl1', content: '쉬워요' },
      { id: 2, author: 'User2', authorAvatar: 'commentAvatarUrl2', content: '배워갑니다.' },
    ],
  },
  {
    id: 2,
    type: 'ABTest',
    author: 'UI Designer',
    authorAvatar: 'avatarUrl2',
    question: '어떤 버튼 디자인이 더 좋으신가요?',
    options: ['Flat Design', 'Material Design'],
    correctAnswer: null,
    explanation: '',
    likes: 80,
    comments: [],
  },
  {
    id: 3,
    type: 'MultipleChoice',
    author: 'Quiz Master',
    authorAvatar: 'avatarUrl3',
    question: 'JavaScript에서 가장 널리 사용되는 ES6 기능은 무엇입니까?',
    options: ['Arrow Functions', 'Classes', 'Modules', 'Template Literals'],
    correctAnswer: 'Arrow Functions',
    explanation: 'Arrow Functions는 간결하고 강력합니다.',
    likes: 95,
    comments: [
      {
        id: 1,
        author: 'User1',
        authorAvatar: 'commentAvatarUrl3',
        content: '어려워요.',
      },
    ],
  },
  {
    id: 4,
    type: 'MultipleChoice',
    author: 'Quiz Master',
    authorAvatar: 'avatarUrl3',
    question: 'JavaScript에서 가장 널리 사용되는 ES6 기능은 무엇입니까?',
    options: ['Arrow Functions', 'Classes', 'Modules', 'Template Literals'],
    correctAnswer: 'Arrow Functions',
    explanation: 'Arrow Functions는 간결하고 강력합니다.',
    likes: 95,
    comments: [
      {
        id: 1,
        author: 'User3',
        authorAvatar: 'commentAvatarUrl3',
        content: '정답을 보고 놀랐어요.',
      },
    ],
  },
  {
    id: 5,
    type: 'MultipleChoice',
    author: 'Quiz Master',
    authorAvatar: 'avatarUrl3',
    question: 'JavaScript에서 가장 널리 사용되는 ES6 기능은 무엇입니까?',
    options: ['Arrow Functions', 'Classes', 'Modules', 'Template Literals'],
    correctAnswer: 'Arrow Functions',
    explanation: 'Arrow Functions는 간결하고 강력합니다.',
    likes: 95,
    comments: [
      {
        id: 1,
        author: 'User3',
        authorAvatar: 'commentAvatarUrl3',
        content: '정답을 보고 놀랐어요.',
      },
    ],
  },
];

const MainPage = () => {
  return (
    <div style={{ marginTop: '64px', padding: '16px' }}>
      {dummyQuizzes.map((quiz) => (
        <QuizWrapper key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

export default MainPage;
