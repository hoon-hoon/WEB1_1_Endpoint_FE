import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { GamePage, MainPage, MyPage, SearchPage } from './pages';
import { CreateGame, WaitingRoom, RandomMatch } from './pages/game';
import CallbackPage from './pages/Login/CallbackPage';
import LoginPage from './pages/Login/LoginPage';
import { useState } from 'react';

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
        </Route>

        {/* 그 외 BottomNavbar 사용시 MainLayout */}
        <Route element={<MainLayout activeTab={activeTab} setActiveTab={setActiveTab} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<MyPage />} />
          <Route path="/game/create" element={<CreateGame />} />
          <Route path="/game/waiting" element={<WaitingRoom />} />
          <Route path="/game/random" element={<RandomMatch />} />
          {/* 추가적인 페이지 라우팅을 등록 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
