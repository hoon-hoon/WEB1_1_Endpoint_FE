interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'fill' | 'unfill';
  color?: string;
  textColor?: string;
  borderColor?: string;
  size?: 'small' | 'medium' | 'large' | 'long';
  showBorder?: boolean;
}

function Button({
  label,
  onClick,
  icon,
  iconPosition = 'left',
  variant = 'fill',
  color = '#007BFF',
  textColor = '#FFFFFF',
  borderColor = '#CCCCCC',
  size = 'medium',
  showBorder = false,
}: ButtonProps) {
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    long: 'w-full py-2 text-base',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-lg transition focus:outline-none
        ${sizeClasses[size]} 
        ${showBorder || variant === 'unfill' ? 'border' : ''}`}
      style={{
        backgroundColor: variant === 'fill' ? color : 'transparent',
        color: variant === 'fill' ? textColor : color,
        borderColor: showBorder || variant === 'unfill' ? borderColor : 'transparent',
        filter: 'brightness(1)',
        transition: 'filter 0.2s ease',
      }}
      // 터치 이벤트 발생 시 살짝 어두워짐
      onTouchStart={(e) => {
        (e.currentTarget as HTMLElement).style.filter = 'brightness(0.9)';
      }}
      onTouchEnd={(e) => {
        (e.currentTarget as HTMLElement).style.filter = 'brightness(1)';
      }}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{label}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
}

export default Button;
