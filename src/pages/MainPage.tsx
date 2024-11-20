import { QuizWrapper } from '@/components';
import TopBar from '@/components/common/TopBar';
import { dummyQuiz } from '@/data/dummyQuiz';
import Container from '@/shared/Container';

const MainPage = () => {
  return (
    <>
      <TopBar />
      <Container>
        {dummyQuiz.map((quiz) => (
          <QuizWrapper key={quiz.id} quiz={quiz} />
        ))}
      </Container>
    </>
  );
};

export default MainPage;
