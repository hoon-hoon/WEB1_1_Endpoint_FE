import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { Link } from 'react-router-dom';

type IconType = Parameters<typeof Icon>[0]['icon'];

interface MenuButtonProps {
  icon: IconType;
  label: string;
  to: string;
}

export function MenuButton({ icon, label, to }: MenuButtonProps) {
  return (
    <Link
      to={to}
      className="flex w-full items-center justify-between rounded-lg bg-white p-4 border border-gray-300 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <Icon icon={icon} size={24} />
        <span>{label}</span>
      </div>
      <Icon icon="chevron_right_outlined" size={24} />
    </Link>
  );
}
