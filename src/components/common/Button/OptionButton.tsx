interface OptionButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'S' | 'M' | 'L';
  onClick?: () => void;
  children: React.ReactNode;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  children,
}) => {
  const baseStyle = 'rounded-lg font-semibold focus:outline-none transition';
  const variantStyle =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:bg-blue-600'
      : variant === 'secondary'
        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        : 'border border-gray-400 text-gray-700';
  const sizeStyle =
    size === 'S' ? 'px-2 py-1 text-sm' : size === 'L' ? 'px-4 py-2 text-lg' : 'px-3 py-1.5';

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${sizeStyle}`}>
      {children}
    </button>
  );
};
