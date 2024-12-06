import { Outlet } from 'react-router-dom';
import { BottomNavBar } from '..';
import { ProtectedLayout } from './ProtectedLayout';

function MainLayout({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <ProtectedLayout>
      <div className="min-h-dvh pb-16">
        <Outlet />
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </ProtectedLayout>
  );
}

export default MainLayout;
