import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import TopBar from '@/components/common/TopBar';
import { dummyQuizzes } from '@/data/dummyQuiz';
import Container from '@/shared/Container';
import { QuizWrapper } from '@/components';

const MainPage = () => {
  return (
    <>
      <TopBar />
      <Container>
        <Swiper
          direction="vertical"
          className="quizSwiper h-[80dvh]"
          // style={{ height: 'calc(100vh - 11rem)' }}
          spaceBetween={40}
        >
          {dummyQuizzes.map((quiz) => (
            <SwiperSlide key={quiz.id}>
              <QuizWrapper quiz={quiz} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

export default MainPage;
