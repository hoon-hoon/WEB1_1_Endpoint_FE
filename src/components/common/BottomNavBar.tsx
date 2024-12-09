import { useNavigate } from 'react-router-dom';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { NavBarType } from '@/types';
import { IoGameControllerOutline } from 'react-icons/io5';

const BottomNavBar = ({ activeTab, setActiveTab }: NavBarType) => {
  const navigate = useNavigate();
  const tabs = [
    { id: 'main', label: '메인', icon: <Icon icon="home" />, path: '/main' },
    {
      id: 'game',
      label: '게임',
      icon: <IoGameControllerOutline size={24} />,
      path: '/game',
    },
    { id: 'search', label: '검색', icon: <Icon icon="search" />, path: '/search' },
    { id: 'profile', label: '마이', icon: <Icon icon="person_outlined" />, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
      <div className="container mx-auto flex justify-around items-center h-16 max-w-screen-mobile">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              navigate(tab.path);
            }}
            className={`flex flex-col items-center justify-center w-full h-full py-2 text-sm transition-colors duration-200 ${
              activeTab === tab.id ? 'text-black bg-gray-200 rounded-md' : 'text-gray-500'
            }`}
          >
            <div className={`mb-1 ${activeTab === tab.id ? 'scale-110' : ''}`}>{tab.icon}</div>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
