import React from 'react';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { Link } from 'react-router-dom';

type IconType = Parameters<typeof Icon>[0]['icon'];

interface MenuButtonProps {
  icon: IconType;
  label: string;
  to: string;
  variant?: 'default' | 'danger';
  onClick?: () => void;
}

export function MenuButton({ icon, label, to, variant = 'default', onClick }: MenuButtonProps) {
  const baseClasses = 'flex w-full items-center justify-between rounded-lg p-4 border shadow-sm';
  const variantClasses =
    variant === 'danger' ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link to={to} onClick={handleClick} className={`${baseClasses} ${variantClasses}`}>
      <div className="flex items-center gap-2">
        <Icon icon={icon} size={24} />
        <span>{label}</span>
      </div>
      <Icon icon="chevron_right_outlined" size={24} />
    </Link>
  );
}
