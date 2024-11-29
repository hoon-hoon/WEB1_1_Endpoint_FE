import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import TopBar from '@/components/common/TopBar';
import { dummyQuizzes } from '@/data/dummyQuiz';
import Container from '@/components/layout/Container';
import QuizCard from './QuizCard';

const MainPage = () => {
  return (
    <>
      <TopBar />
      <Container>
        <Swiper direction="vertical" className="quizSwiper h-[80dvh]" spaceBetween={40}>
          {dummyQuizzes.map((quiz) => (
            <SwiperSlide key={quiz.id}>
              <QuizCard quiz={quiz} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

export default MainPage;
