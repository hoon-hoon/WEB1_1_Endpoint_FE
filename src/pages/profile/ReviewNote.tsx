import { useState } from 'react';
import TopBar from '@/components/common/TopBar';
import ReviewNoteCard from '@/components/mypage/ReviewNoteCard';
import { ReviewNoteItem } from '@/types/MyPageTpyes';
import { useNavigate } from 'react-router-dom';
import Container from '@/shared/Container';
import FlexBox from '@/shared/FlexBox';

export default function ReviewNote() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<ReviewNoteItem[]>([
    {
      id: '1',
      question: 'React의 Virtual DOM은 실제 DOM보다 항상 빠른가?',
      date: '2024.11.15',
      userAnswer: 'O',
      correctAnswer: 'X',
      explanation:
        'Virtual DOM이 항상 빠른 것은 아닙니다. 간단한 UI 변경의 경우 실제 DOM 조작이 더 빠를 수 있습니다.',
    },
    {
      id: '2',
      question: 'React의 Virtual DOM은 실제 DOM보다 항상 빠른가?',
      date: '2024.11.15',
      userAnswer: 'A',
      correctAnswer: 'C',
      explanation:
        'Virtual DOM이 항상 빠른 것은 아닙니다. 간단한 UI 변경의 경우 실제 DOM 조작이 더 빠를 수 있습니다. Virtual DOM의 효율성은 복잡한 UI 업데이트나 빈번한 변경이 있는 경우에 더 두드러집니다.',
      choices: [
        { id: 'A', text: '항상 빠르다' },
        { id: 'B', text: '대부분의 경우 빠르다' },
        { id: 'C', text: '경우에 따라 다르다' },
        { id: 'D', text: '항상 느리다' },
      ],
    },
  ]);

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container>
      <TopBar
        leftIcon="left"
        leftText="오답노트"
        onClickLeft={() => {
          navigate('/profile');
        }}
      />
      <FlexBox direction="col" className="gap-4">
        {notes.map((note) => (
          <ReviewNoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
        ))}
      </FlexBox>
    </Container>
  );
}
