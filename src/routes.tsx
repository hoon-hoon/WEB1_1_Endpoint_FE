import { createBrowserRouter } from 'react-router-dom';

// Layout Components
import MainLayout from '@components/layout/MainLayout';
import AuthLayout from '@components/layout/AuthLayout';

// Auth Components
import RequireAuth from '@components/auth/RequireAuth';

// Game Components
import NotFound from '@components/game/NotFound';

// Pages - Login
import LoginPage from '@pages/Login/LoginPage';
import CallbackPage from '@pages/Login/CallbackPage';
import InterestPage from '@pages/Login/InterestPage';

// Pages - Main
import MainPage from '@pages/main/MainPage';

// Pages - Search
import SearchPage from '@pages/search/SearchPage';

// Pages - Profile
import MyPage from '@pages/profile/MyPage';
import ReviewNote from '@pages/profile/ReviewNote';
import QuizManagement from '@pages/profile/QuizManagement';

// Pages - Quiz
import OxPage from '@pages/quiz/OxPage';
import AbPage from '@pages/quiz/AbPage';
import MultipleChoicePage from '@pages/quiz/MultipleChoicePage';
import EditOxQuizPage from '@pages/quiz/EditOxQuizPage';
import EditAbQuizPage from '@pages/quiz/EditAbQuizPage';
import EditMultipleQuizPage from '@pages/quiz/EditMultipleQuizPage';

// Pages - Game
import GamePage from '@pages/game/GamePage';
import CreateGame from '@pages/game/CreateGame';
import RandomMatch from '@pages/game/RandomMatch';
import CodeEntry from '@pages/game/CodeEntry';
import WaitingRoom from '@pages/game/WaitingRoom';
import Play from '@pages/game/Play';
import Result from '@pages/game/Result';

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
      ],
    },
    {
      element: <RequireAuth />, // 인증 가드 추가
      children: [
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
      ],
    },
    { path: '/interest', element: <InterestPage /> },
    { path: '/game/waiting', element: <WaitingRoom /> },
    { path: '/game/play', element: <Play /> },
    { path: '/game/result', element: <Result /> },
    { path: '*', element: <NotFound message="404: 적절하지 않은 접근 경로입니다" /> },
  ]);
};

export default createRoutes;
