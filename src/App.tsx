import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// [Should]: AuthLayout과 MainLayout에서 로그인 여부를 체크하여 로그인 여부에 따라 접근 제한을 하시는게 좋을거같습니다.

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Router>
      <Routes>
        {/* 인증 관련 경로 AuthLayout*/}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/oauth/kakao/callback" element={<CallbackPage provider="kakao" />} />
          <Route path="/oauth/google/callback" element={<CallbackPage provider="google" />} />
          <Route path="/interest" element={<InterestPage />} />
        </Route>

        {/* 그 외 BottomNavbar 사용시 MainLayout */}
        <Route element={<MainLayout activeTab={activeTab} setActiveTab={setActiveTab} />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<MyPage />} />
          <Route path="/profile/reviewNote" element={<ReviewNote />} />
          <Route path="/profile/quizManagement" element={<QuizManagement />} />
          <Route path="/game/create" element={<CreateGame />} />
          <Route path="/game/random" element={<RandomMatch />} />
          <Route path="/game/entry" element={<CodeEntry />} />
          <Route path="/quiz/ab" element={<AbPage />} />
          <Route path="/quiz/ox" element={<OxPage />} />
          <Route path="/quiz/multiple" element={<MultipleChoicePage />} />
          <Route path="/quiz/edit/ox/:id" element={<EditOxQuizPage />} />
          <Route path="/quiz/edit/ab/:id" element={<EditAbQuizPage />} />
          <Route path="/quiz/edit/multiple/:id" element={<EditMultipleQuizPage />} />
          {/* 추가적인 페이지 라우팅을 등록 */}
        </Route>
        <Route path="/game/waiting" element={<WaitingRoom />} />
        <Route path="/game/play" element={<Play />} />
        <Route path="/game/result" element={<Result />} />
        {/* 404 페이지 처리 */}
        <Route path="*" element={<NotFound message="404: 적절하지 않은 접근 경로입니다" />} />
      </Routes>
    </Router>
  );
}

export default App;
