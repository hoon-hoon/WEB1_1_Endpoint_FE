import { BaseQuizAPI } from '@/types';

export const dummyQuizzes: BaseQuizAPI[] = [
  {
    id: 1,
    content: 'React의 Virtual DOM은 항상 빠릅니까?',
    type: 'OX 퀴즈',
    author: 'React Expert',
    avatarUrl: 'avatarUrl',
    options: [
      { no: 1, content: 'O', selectionRatio: 0.34 },
      { no: 2, content: 'X', selectionRatio: 0.66 },
    ],
    answer: {
      content: 'X',
      explanation: 'Virtual DOM이 항상 빠른 것은 아닙니다.',
    },
    answeredOption: 2,
    count: {
      like: 120,
      comment: 8,
    },
    liked: true,
  },
  {
    id: 2,
    content: '어떤 버튼 디자인이 더 좋으신가요?',
    type: 'ABTest',
    author: 'UI Designer',
    avatarUrl: 'avatarUrl',
    options: [
      { no: 1, content: 'Flat Design', selectionRatio: 0.42 },
      { no: 2, content: 'Material Design', selectionRatio: 0.58 },
    ],
    answer: {
      content: '',
      explanation: '',
    },
    count: {
      like: 80,
      comment: 1,
    },
    liked: false,
  },
  {
    id: 3,
    content: 'JavaScript에서 가장 널리 사용되는 ES6 기능은 무엇입니까?',
    type: '객관식',
    options: [
      { no: 1, content: 'Arrow Functions', selectionRatio: 0.55 },
      { no: 2, content: 'Classes', selectionRatio: 0.25 },
      { no: 3, content: 'Modules', selectionRatio: 0.15 },
      { no: 4, content: 'Template Literals', selectionRatio: 0.05 },
    ],
    answer: {
      content: 'Arrow Functions',
      explanation: 'Arrow Functions는 간결하고 강력합니다.',
    },
    answeredOption: 1,
    count: {
      like: 95,
      comment: 2,
    },
    liked: true,
  },
  {
    id: 4,
    content: 'CSS는 프로그래밍 언어입니까?',
    type: 'OX 퀴즈',
    options: [
      { no: 1, content: 'O', selectionRatio: 0.15 },
      { no: 2, content: 'X', selectionRatio: 0.85 },
    ],
    answer: {
      content: 'X',
      explanation: 'CSS는 스타일링 언어로, 프로그래밍 언어로 간주되지 않습니다.',
    },
    count: {
      like: 50,
      comment: 0,
    },
    liked: false,
  },
  {
    id: 5,
    content: '모바일 네비게이션에서 더 나은 UI는 무엇인가요?',
    type: 'ABTest',
    author: 'Frontend Developer',
    avatarUrl: 'avatarUrl',
    options: [
      { no: 1, content: 'Bottom Navigation', selectionRatio: 0.67 },
      { no: 2, content: 'Sidebar Navigation', selectionRatio: 0.33 },
    ],
    answer: {
      content: '',
      explanation: '',
    },
    count: {
      like: 110,
      comment: 2,
    },
    liked: true,
  },
];
