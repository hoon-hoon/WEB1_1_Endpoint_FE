import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import TopBar from '@/components/common/TopBar';
import Container from '@/components/layout/Container';
import QuizCard from './QuizCard';
import useQuizFeed from '@/api/main/fetchQuiz';

const MainPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useQuizFeed();

  const quizzes = data?.pages.flatMap((page) => page.quizzes) || [];

  return (
    <>
      <TopBar />
      <Container>
        <Swiper
          direction="vertical"
          className="quizSwiper h-[80dvh]"
          spaceBetween={40}
          onReachEnd={() => {
            if (hasNextPage) fetchNextPage();
          }}
        >
          {quizzes.map((quiz) => (
            <SwiperSlide key={quiz.id}>
              <QuizCard quiz={quiz} />
            </SwiperSlide>
          ))}
        </Swiper>
        {isFetching && <div>로딩 중..</div>}
        {isError && <div>데이터 불러오는 중..</div>}
      </Container>
    </>
  );
};

export default MainPage;
