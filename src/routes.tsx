import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import { LoginPage, InterestPage, CallbackPage } from './pages/Login';
import { GamePage, MainPage, MyPage, SearchPage } from './pages';
import {
  AbPage,
  OxPage,
  MultipleChoicePage,
  EditOxQuizPage,
  EditAbQuizPage,
  EditMultipleQuizPage,
} from './pages/quiz';
import { CreateGame, WaitingRoom, RandomMatch, CodeEntry, Play, Result } from './pages/game';
import ReviewNote from './pages/profile/ReviewNote';
import QuizManagement from './pages/profile/QuizManagement';
import NotFound from './components/game/NotFound';

const createRoutes = () => {
  // [Should]: AuthLayout과 MainLayout에서 로그인 여부를 체크하여 로그인 여부에 따라 접근 제한을 하시는게 좋을거같습니다.
  return createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: '/', element: <LoginPage /> },
        { path: '/oauth/kakao/callback', element: <CallbackPage provider="kakao" /> },
        { path: '/oauth/google/callback', element: <CallbackPage provider="google" /> },
        { path: '/interest', element: <InterestPage /> },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        { path: '/main', element: <MainPage /> },
        { path: '/game', element: <GamePage /> },
        { path: '/search', element: <SearchPage /> },
        {
          path: '/profile',
          children: [
            { path: '', element: <MyPage /> },
            { path: 'reviewNote', element: <ReviewNote /> },
            { path: 'quizManagement', element: <QuizManagement /> },
          ],
        },
        {
          path: '/quiz',
          children: [
            { path: 'ox', element: <OxPage /> },
            { path: 'ab', element: <AbPage /> },
            { path: 'multiple', element: <MultipleChoicePage /> },
            { path: 'edit/ox/:id', element: <EditOxQuizPage /> },
            { path: 'edit/ab/:id', element: <EditAbQuizPage /> },
            { path: 'edit/multiple/:id', element: <EditMultipleQuizPage /> },
          ],
        },
        {
          path: '/game',
          children: [
            { path: 'create', element: <CreateGame /> },
            { path: 'random', element: <RandomMatch /> },
            { path: 'entry', element: <CodeEntry /> },
          ],
        },
      ],
    },
    { path: '/game/waiting', element: <WaitingRoom /> },
    { path: '/game/play', element: <Play /> },
    { path: '/game/result', element: <Result /> },
    { path: '*', element: <NotFound message="404: 적절하지 않은 접근 경로입니다" /> },
  ]);
};

export default createRoutes;
