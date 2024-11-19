interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'fill' | 'unfill';
  color?: string; // 배경 색상
  textColor?: string; // 텍스트 색상
  borderColor?: string; // 테두리 색상
  size?: 'small' | 'medium' | 'large' | 'long';
  showBorder?: boolean; // fill일 때도 테두리를 표시할지 여부
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
      // 터치 이벤트 발생 시 버튼이 눌렸다는 표시를 위해 filter 속성을 변경
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
