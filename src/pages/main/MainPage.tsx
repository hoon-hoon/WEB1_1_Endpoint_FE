import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import TopBar from '@/components/common/TopBar';
import Container from '@/components/layout/Container';
import QuizCard from './QuizCard';
import useQuizFeed from '@/api/main/fetchQuiz';
import Spinner from '@/components/common/Spinner';
import { useState } from 'react';

const MainPage = () => {
  const { data, fetchNextPage, hasNextPage, isError } = useQuizFeed();

  const quizzes = data?.pages.flatMap((page) => page.quizzes) || [];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // 최초 로딩 판단
  const isLoadingInitialData = !data && !isError;

  return (
    <>
      <TopBar />
      <Container>
        {isLoadingInitialData ? (
          <div className="flex flex-col items-center justify-center h-[80dvh] space-y-4">
            <Spinner />
            <p className="text-gray-600">퀴즈를 불러오고 있습니다...</p>
          </div>
        ) : (
          <Swiper
            direction="vertical"
            className="quizSwiper h-[80dvh]"
            spaceBetween={40}
            onReachEnd={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onSlideChange={(swiper) => {
              setCurrentSlideIndex(swiper.activeIndex);
            }}
            initialSlide={currentSlideIndex}
          >
            {quizzes.map((quiz) => (
              <SwiperSlide key={quiz.id}>
                <QuizCard quiz={quiz} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {isError && (
          <div className="flex items-center justify-center h-[80dvh] text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        )}
      </Container>
    </>
  );
};

export default MainPage;
