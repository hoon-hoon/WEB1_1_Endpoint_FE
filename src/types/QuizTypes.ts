export interface QuizOption {
  no: number; // 옵션 번호
  content: string; // 옵션 내용
  selectionRatio: number; // 선택 비율
  imagePath?: string; // ABTest에만 옵셔널로 존재.
}

export interface QuizAnswer {
  content: string; // 정답 내용
  explanation: string; // 정답 해설
}

export interface QuizCount {
  like: number; // 좋아요 수
  comment: number; // 댓글 수
}

export interface QuizAuthor {
  name?: string | null; // 퀴즈 등록자 닉네임
  imagePath?: string | null; // 프로필 이미지 URL
}

export interface BaseQuizAPI {
  id: number; // 퀴즈 ID
  content: string; // 퀴즈 내용
  type: 'OX 퀴즈' | 'ABTest' | '객관식'; // 퀴즈 타입
  author?: QuizAuthor; // 없다면 default
  options: QuizOption[]; // 선택지
  answer: QuizAnswer; // 정답 내용, 해설 담는 객체
  count: QuizCount; // 좋아요와 댓글 수 담는 객체
  liked?: boolean; // 사용자의 좋아요 여부 (검색페이지에서만 사용)
  answeredOption?: string; // 사용자가 선택한 옵션 번호 (검색페이지에서만 사용)
}
