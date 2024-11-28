import { QuizWrapper, TagList } from '@/components';
import SearchBar from '@/components/common/SearchBar';
import TopBar from '@/components/common/TopBar';
import { dummyQuizzes } from '@/data/dummyQuiz';
import Container from '@/components/layout/Container';
import { useState } from 'react';
import QuizSkeleton from './QuizSkeleton';

const SearchPage = () => {
  const tags = ['React', 'JavaScript', 'TypeScript', 'Next.js', 'CSS', 'HTML'];
  const [, setSelectedTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState(dummyQuizzes);
  const [loading, setLoading] = useState(false);

  const handleTagClick = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
    console.log('Selected Tags:', selectedTags);
    // TODO: 검색 필터 로직
  };

  const handleSearch = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // const response = await fetch(`/api/quiz/search?keyword=${keyword}&page=0&size=10&sort=TRENDING`);
    // const data = await response.json();
    // setFilteredQuizzes(data);

    // 임시 더미데이터로 검색 기능
    const filtered = dummyQuizzes.filter((quiz) =>
      quiz.content.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredQuizzes(filtered);

    setLoading(false);
  };

  return (
    <>
      <TopBar />
      <Container>
        <SearchBar
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
        />
        <TagList tags={tags} onTagClick={handleTagClick} />
        {loading
          ? Array(6)
              .fill(null)
              .map((_, idx) => <QuizSkeleton key={idx} />)
          : filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="mb-4">
                <QuizWrapper quiz={quiz} />
              </div>
            ))}
      </Container>
    </>
  );
};

export default SearchPage;
