import { Outlet } from 'react-router-dom';
import { BottomNavBar } from '../components';

function MainLayout({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="pb-16">
      <Outlet />
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default MainLayout;
