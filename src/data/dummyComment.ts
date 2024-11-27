import { Comment } from '@/types';

export const dummyComments: Comment[] = [
  // Quiz ID: 1, Comment Count: 3
  {
    id: 1,
    quizId: 1,
    writerId: 1,
    parentCommentId: 0,
    content: 'React는 재미있는 주제네요.',
    createdAt: '2024-11-20T10:00:00.000Z',
    updatedAt: '2024-11-20T10:00:00.000Z',
    childComments: [
      {
        id: 2,
        quizId: 1,
        writerId: 2,
        parentCommentId: 1,
        content: '저도 그렇게 생각합니다!',
        createdAt: '2024-11-20T11:00:00.000Z',
        updatedAt: '2024-11-20T11:00:00.000Z',
      },
      {
        id: 16,
        quizId: 1,
        writerId: 2,
        parentCommentId: 1,
        content: '저도 그렇게 생각합니다!',
        createdAt: '2024-11-20T11:00:00.000Z',
        updatedAt: '2024-11-20T11:00:00.000Z',
      },
    ],
  },
  {
    id: 3,
    quizId: 1,
    writerId: 3,
    parentCommentId: 0,
    content: 'Virtual DOM이 항상 빠르지 않은 이유가 궁금합니다.',
    createdAt: '2024-11-20T12:00:00.000Z',
    updatedAt: '2024-11-20T12:00:00.000Z',
  },
  {
    id: 10,
    quizId: 1,
    writerId: 3,
    parentCommentId: 0,
    content: 'Virtual DOM이 항상 빠르지 않은 이유가 궁금합니다.',
    createdAt: '2024-11-20T12:00:00.000Z',
    updatedAt: '2024-11-20T12:00:00.000Z',
  },
  {
    id: 11,
    quizId: 1,
    writerId: 3,
    parentCommentId: 0,
    content: 'Virtual DOM이 항상 빠르지 않은 이유가 궁금합니다.',
    createdAt: '2024-11-20T12:00:00.000Z',
    updatedAt: '2024-11-20T12:00:00.000Z',
  },
  {
    id: 12,
    quizId: 1,
    writerId: 3,
    parentCommentId: 0,
    content: 'Virtual DOM이 항상 빠르지 않은 이유가 궁금합니다.',
    createdAt: '2024-11-20T12:00:00.000Z',
    updatedAt: '2024-11-20T12:00:00.000Z',
  },
  {
    id: 13,
    quizId: 1,
    writerId: 3,
    parentCommentId: 0,
    content: 'Virtual DOM이 항상 빠르지 않은 이유가 궁금합니다.',
    createdAt: '2024-11-20T12:00:00.000Z',
    updatedAt: '2024-11-20T12:00:00.000Z',
  },
  {
    id: 14,
    quizId: 1,
    writerId: 3,
    parentCommentId: 0,
    content: 'Virtual DOM이 항상 빠르지 않은 이유가 궁금합니다.',
    createdAt: '2024-11-20T12:00:00.000Z',
    updatedAt: '2024-11-20T12:00:00.000Z',
  },
  {
    id: 15,
    quizId: 1,
    writerId: 3,
    parentCommentId: 0,
    content: 'Virtual DOM이 항상 빠르지 않은 이유가 궁금합니다.',
    createdAt: '2024-11-20T12:00:00.000Z',
    updatedAt: '2024-11-20T12:00:00.000Z',
  },

  // Quiz ID: 2, Comment Count: 1
  {
    id: 4,
    quizId: 2,
    writerId: 4,
    parentCommentId: 0,
    content: 'Material Design이 더 현대적이라고 생각해요.',
    createdAt: '2024-11-20T13:00:00.000Z',
    updatedAt: '2024-11-20T13:00:00.000Z',
  },

  // Quiz ID: 3, Comment Count: 2
  {
    id: 5,
    quizId: 3,
    writerId: 5,
    parentCommentId: 0,
    content: 'Arrow Functions는 너무 편리합니다.',
    createdAt: '2024-11-20T14:00:00.000Z',
    updatedAt: '2024-11-20T14:00:00.000Z',
    childComments: [
      {
        id: 6,
        quizId: 3,
        writerId: 6,
        parentCommentId: 5,
        content: '맞아요, 특히 이벤트 핸들러에서 유용하죠.',
        createdAt: '2024-11-20T15:00:00.000Z',
        updatedAt: '2024-11-20T15:00:00.000Z',
      },
    ],
  },

  // Quiz ID: 4, Comment Count: 0

  // Quiz ID: 5, Comment Count: 2
  {
    id: 8,
    quizId: 5,
    writerId: 8,
    parentCommentId: 0,
    content: 'Bottom Navigation이 모바일에 더 적합해 보여요.',
    createdAt: '2024-11-20T17:00:00.000Z',
    updatedAt: '2024-11-20T17:00:00.000Z',
  },
  {
    id: 9,
    quizId: 5,
    writerId: 9,
    parentCommentId: 0,
    content: 'Sidebar Navigation은 정보가 많은 경우 더 좋아요.',
    createdAt: '2024-11-20T18:00:00.000Z',
    updatedAt: '2024-11-20T18:00:00.000Z',
  },
];
