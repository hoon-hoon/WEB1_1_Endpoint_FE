import '@/styles/transition.css';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { useTopBarState } from '@/hooks/useTopBarState';
import useGetProfile from '@/api/game/useGetProfile';
import { MdLogout } from 'react-icons/md';
import { SiQuizlet } from 'react-icons/si';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
import { Button as ShadcnButton } from '@/shadcn/ui/button';
import Dialog from './Dialog';
import FlexBox from '@/components/layout/FlexBox';
import { Skeleton } from '@/shadcn/ui/skeleton';
import axiosInstance from '@/api/axiosInstance';

type TopBarProps = {
  title?: string;
  leftIcon?: 'default' | 'left';
  leftText?: string;
  onClickLeft?: () => void;
};

const TopBar = ({ leftIcon = 'default', leftText = '', onClickLeft }: TopBarProps) => {
  const [state, dispatch] = useTopBarState();
  const { data, isLoading } = useGetProfile();
  const handleTransition = (onClickLeft: () => void) => {
    if (!document.startViewTransition) {
      onClickLeft();
      return;
    }
    document.startViewTransition(() => {
      onClickLeft();
    });
  };
  // 로그아웃
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('accessToken');
      dispatch({ type: 'CLOSE' });
      window.location.href = '/';
    } catch (error) {
      console.log('로그아웃 실패:', error);
    }
  };

  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className={`flex ${leftIcon === 'default' ? 'gap-1' : 'gap-4'} items-center`}>
          {leftIcon === 'default' ? (
            <SiQuizlet size={32} color="blue" />
          ) : (
            <button onClick={() => handleTransition(onClickLeft!)}>
              <Icon icon={'chevron_left_outlined'} />
            </button>
          )}
          {leftText === '' ? (
            <span className="text-2xl font-bold">uizy</span>
          ) : (
            <span className="text-xl font-bold">{leftText}</span>
          )}
        </div>
        <Popover open={state.isPop} onOpenChange={() => dispatch({ type: 'TOGGLE_POP' })}>
          <PopoverTrigger asChild>
            <button className="cursor-pointer">
              {isLoading ? (
                <Skeleton className="w-12 h-12 rounded-full" />
              ) : (
                <Avatar input="image" image={data?.profileImageUrl} size="S" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="w-full py-4 text-lg text-center">안녕하세요 {data?.name}님</p>
            <FlexBox direction="col" className="gap-2">
              <ShadcnButton
                variant="ghost"
                className="w-full py-4 font-semibold text-lg border-b"
                onClick={() => dispatch({ type: 'LOGOUT' })}
              >
                <MdLogout size={32} />
                로그아웃
              </ShadcnButton>
            </FlexBox>
          </PopoverContent>
        </Popover>
        <Dialog
          open={state.showLogoutDialog}
          onClose={() => dispatch({ type: 'CLOSE' })}
          title="로그아웃"
          description="정말 로그아웃 하시겠습니까?"
          leftText="예"
          rightText="아니요"
          leftOnClick={() => handleLogout()}
          rightOnClick={() => dispatch({ type: 'CLOSE' })}
        />
      </div>
    </header>
  );
};

export default TopBar;
