import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BottomNavBar } from './components';
import { GamePage, MainPage, MyPage, SearchPage } from './pages';
import { CreateGame, WaitingRoom, RandomMatch } from './pages/game';

import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Router>
      <div className="pb-16">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<MyPage />} />
          <Route path="/game/create" element={<CreateGame />} />
          <Route path="/game/waiting" element={<WaitingRoom />} />
          <Route path="/game/random" element={<RandomMatch />} />
          {/* 추가적인 페이지 라우팅을 등록 */}
        </Routes>
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Router>
  );
}

export default App;
