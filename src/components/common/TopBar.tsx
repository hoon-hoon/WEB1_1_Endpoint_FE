import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import logoImage from '../../assests/logoImage.svg';
import defaultImageURL from '@/shared/defaultImage';

type TopBarProps = {
  title?: string;
  leftIcon?: 'default' | 'left';
  leftText?: string;
  onClickLeft?: () => void;
};

const TopBar = ({ leftIcon = 'default', leftText = '', onClickLeft }: TopBarProps) => {
  const checkUserProfile = () => {
    console.log('다른 사용자 프로필 조회');
  };

  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {leftIcon === 'default' ? (
            <img src={logoImage} alt="logo" />
          ) : (
            <div onClick={onClickLeft}>
              <Icon icon={'chevron_left_outlined'} />
            </div>
          )}
          {leftText === '' ? (
            <span className="text-xl font-bold">Quizy</span>
          ) : (
            <span className="text-xl font-bold">{leftText}</span>
          )}
        </div>
        <div onClick={checkUserProfile} className="cursor-pointer">
          <Avatar input="image" image={defaultImageURL} size="S" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
