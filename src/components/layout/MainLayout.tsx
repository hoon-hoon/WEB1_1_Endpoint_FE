import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedLayout } from './ProtectedLayout';
import { useEffect, useMemo } from 'react';
import BottomNavBar from '../common/BottomNavBar';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 경로에서 activeTab 추출
  const activeTab = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments[0] || 'main'; // 첫 번째 경로를 activeTab으로 사용
  }, [location.pathname]);

  useEffect(() => {}, [activeTab, navigate]);

  const handleSetActiveTab = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <ProtectedLayout>
      <div className="min-h-dvh pb-16">
        <Outlet />
        <BottomNavBar activeTab={activeTab} setActiveTab={handleSetActiveTab} />
      </div>
    </ProtectedLayout>
  );
}

export default MainLayout;
