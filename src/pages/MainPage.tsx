import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { QuizWrapper } from '@/components';
import TopBar from '@/components/common/TopBar';
import { dummyQuiz } from '@/data/dummyQuiz';
import Container from '@/shared/Container';

const MainPage = () => {
  return (
    <>
      <TopBar />
      <Container>
        <Swiper
          direction="vertical"
          className="quizSwiper"
          style={{ height: 'calc(100vh - 9rem)' }}
        >
          {dummyQuiz.map((quiz) => (
            <SwiperSlide key={quiz.id}>
              <QuizWrapper quiz={quiz} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

// const MainPage = () => {
//   return (
//     <>
//       <div className='pt-5'>
//         <Swiper
//           direction="vertical"
//           className="quizSwiper"
//           style={{ height: 'calc(100vh - 64px - 56px)' }}
//         >
//           {dummyQuiz.map((quiz) => (
//             <SwiperSlide key={quiz.id}>
//               <QuizWrapper quiz={quiz} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </>
//   );
// };

export default MainPage;
