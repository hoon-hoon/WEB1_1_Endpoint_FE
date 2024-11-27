import { QuizWrapper, TagList } from '@/components';
import SearchBar from '@/components/common/SearchBar';
import TopBar from '@/components/common/TopBar';
import { dummyQuizzes } from '@/data/dummyQuiz';
import Container from '@/shared/Container';
import { useState } from 'react';

const SearchPage = () => {
  const tags = ['React', 'JavaScript', 'TypeScript', 'Next.js', 'CSS', 'HTML'];
  const [, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
    console.log('Selected Tags:', selectedTags);
    // TODO: 검색 필터 로직
  };

  return (
    <>
      <TopBar />
      <Container>
        <SearchBar />
        <TagList tags={tags} onTagClick={handleTagClick} />
        {dummyQuizzes.map((quiz) => (
          <div key={quiz.id} className="mb-4">
            <QuizWrapper quiz={quiz} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default SearchPage;
