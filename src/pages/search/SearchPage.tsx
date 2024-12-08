import { QuizWrapper, TagList } from '@/components';
import SearchBar from '@/components/common/SearchBar';
import TopBar from '@/components/common/TopBar';
import Container from '@/components/layout/Container';
import { useState } from 'react';
import QuizSkeleton from './QuizSkeleton';
import DropDown from '@/components/common/DropDown';
import { BaseQuizAPI } from '@/types';
import axiosInstance from '@/api/axiosInstance';
import useGetTags from '@/api/search/fetchTags';
import TagSkeleton from './TagSkeleton';

const SearchPage = () => {
  const { data: tags = [], isLoading: tagsLoading, error: tagsError } = useGetTags();

  const [, setSelectedTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState<BaseQuizAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>('전체 문제');
  const [sort, setSort] = useState<string>('인기순');

  const handleTagClick = (updatedTags: string[]) => {
    const tagsWithoutHash = updatedTags.map((tag) => tag.replace(/^#/, ''));
    setSelectedTags(tagsWithoutHash);
    setKeyword(tagsWithoutHash.join(' '));
  };

  const handleSearch = async () => {
    setLoading(true);
    const isUnansweredOnly = filterType === '안 푼 문제';

    const endpoint = isUnansweredOnly ? `/quiz/search/unanswered` : `/quiz/search`;

    try {
      console.log('Request URL:', endpoint);
      console.log('Query Params:', {
        keyword,
        page: 0,
        size: 10,
        sort: sort === '인기순' ? 'TRENDING' : 'NEW',
      });
      const { data } = await axiosInstance.get(endpoint, {
        params: {
          keyword,
          page: 0,
          size: 10,
          sort: sort === '인기순' ? 'TRENDING' : 'NEW',
        },
      });
      console.log('Response Data:', data);

      setFilteredQuizzes(data.result.quizzes || []);
    } catch (error) {
      console.error('검색 API 호출 실패:', error);
      setFilteredQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AboutPage
        title="검색페이지"
        description="원하는 키워드와 인기 태그로 퀴즈를 검색하고, 최신 퀴즈와 인기 퀴즈를 확인하세요."
        keywords="퀴즈 검색, 태그 검색, 최신 퀴즈, 인기 퀴즈, OX퀴즈, 객관식, AB테스트"
      />
      <TopBar />
      <Container>
        <SearchBar
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
        />
        <div className="flex items-center mb-4 gap-1">
          <div>
            <DropDown
              items={['전체 문제', '안 푼 문제']}
              selectedItem={filterType}
              setItem={setFilterType}
              placeholder="전체 문제"
            />
          </div>
          <div>
            <DropDown
              items={['인기순', '최신순']}
              selectedItem={sort}
              setItem={setSort}
              placeholder="인기순"
            />
          </div>
        </div>
        {tagsLoading ? (
          <TagSkeleton />
        ) : tagsError ? (
          <p className="text-gray-600">인기 태그를 불러오지 못했습니다.</p>
        ) : (
          <TagList tags={tags} onTagClick={handleTagClick} />
        )}
        {!filteredQuizzes.length && !loading ? (
          <div className="text-center text-gray-500 mt-16">
            원하는 검색어와 필터로 퀴즈를 검색해보세요.
          </div>
        ) : loading ? (
          Array(6)
            .fill(null)
            .map((_, idx) => <QuizSkeleton key={idx} />)
        ) : (
          filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="mb-4">
              <QuizWrapper quiz={quiz} />
            </div>
          ))
        )}
      </Container>
    </>
  );
};

export default SearchPage;
