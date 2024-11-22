import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { LoginPage, InterestPage, CallbackPage } from './pages/Login';
import { GamePage, MainPage, MyPage, SearchPage } from './pages';
import { AbPage, OxPage, MultipleChoicePage } from './pages/quiz';
import { CreateGame, WaitingRoom, RandomMatch, CodeEntry, Play } from './pages/game';
import { useState } from 'react';
import ReviewNote from './pages/profile/ReviewNote';
import QuizManagement from './pages/profile/QuizManagement';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Router>
      <Routes>
        {/* 인증 관련 경로 AuthLayout*/}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/kakao/callback" element={<CallbackPage provider="kakao" />} />
          <Route path="/auth/google/callback" element={<CallbackPage provider="google" />} />
          <Route path="/login/interest" element={<InterestPage />} />
        </Route>

        {/* 그 외 BottomNavbar 사용시 MainLayout */}
        <Route element={<MainLayout activeTab={activeTab} setActiveTab={setActiveTab} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<MyPage />} />
          <Route path="/profile/reviewNote" element={<ReviewNote />} />
          <Route path="/profile/quizManagement" element={<QuizManagement />} />
          <Route path="/game/create" element={<CreateGame />} />
          <Route path="/game/waiting" element={<WaitingRoom />} />
          <Route path="/game/random" element={<RandomMatch />} />
          <Route path="/game/entry" element={<CodeEntry />} />
          <Route path="/quiz/ab" element={<AbPage />} />
          <Route path="/quiz/ox" element={<OxPage />} />
          <Route path="/quiz/multiple" element={<MultipleChoicePage />} />
          {/* 추가적인 페이지 라우팅을 등록 */}
        </Route>
        <Route path="/game/play" element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
