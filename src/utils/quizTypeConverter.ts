export const convertQuizTypeForURL = (quizType: string): string => {
  const typeMap: Record<string, string> = {
    OX: 'ox',
    AB_TEST: 'ab',
    MULTIPLE_CHOICE: 'multiple',
  };
  return typeMap[quizType] || '';
};

export const convertQuizTypeForDisplay = (quizType: string): string => {
  const displayMap: Record<string, string> = {
    OX: 'OX 퀴즈',
    AB_TEST: 'AB 퀴즈',
    MULTIPLE_CHOICE: '객관식 퀴즈',
  };
  return displayMap[quizType] || '알 수 없는 퀴즈';
};
