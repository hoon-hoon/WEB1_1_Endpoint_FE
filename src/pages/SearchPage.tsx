import { QuizWrapper, TagList } from '@/components';
import SearchBar from '@/components/common/SearchBar';
import TopBar from '@/components/common/TopBar';
import { dummyQuizzes } from '@/data/dummyQuiz';
import Container from '@/shared/Container';

const SearchPage = () => {
  const tags = ['React', 'JavaScript', 'TypeScript', 'Next.js', 'CSS', 'HTML'];

  const handleTagClick = (tag: string) => {
    console.log(`Tag clicked: ${tag}`);
  };
  return (
    <>
      <TopBar />
      <Container>
        <SearchBar />
        <TagList tags={tags} onTagClick={handleTagClick} />

        {dummyQuizzes.map((quiz) => (
          <QuizWrapper key={quiz.id} quiz={quiz} />
        ))}
      </Container>
    </>
  );
};

export default SearchPage;
