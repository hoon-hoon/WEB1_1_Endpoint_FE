const categoryMap: Record<string, string> = {
  알고리즘: 'ALGORITHM',
  '프로그래밍 언어': 'PROGRAMMING_LANGUAGE',
  네트워크: 'NETWORK',
  운영체제: 'OPERATING_SYSTEM',
  '웹 개발': 'WEB_DEVELOPMENT',
  '모바일 개발': 'MOBILE',
  '데브옵스/인프라': 'DEV_OPS',
  데이터베이스: 'DATABASE',
  '소프트웨어 공학': 'SOFTWARE_ENGINEERING',
};

// 한글 카테고리를 영어로 변환
export const toEnglishCategory = (koreanCategory: string): string => {
  return categoryMap[koreanCategory] || '';
};

// 영어 카테고리를 한글로 변환
export const toKoreanCategory = (englishCategory: string): string => {
  const reversedMap = Object.fromEntries(
    Object.entries(categoryMap).map(([korean, english]) => [english, korean]),
  );
  return reversedMap[englishCategory] || '';
};
