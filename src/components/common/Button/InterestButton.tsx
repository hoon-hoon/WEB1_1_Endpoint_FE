interface InterestButtonProps {
  label: string;
  selected: boolean;
  variant?: 'sm' | 'md' | 'lg';
  selectedColor?: string; // 선택된 버튼의 배경색
  unselectedColor?: string; // 비선택 상태의 버튼 배경색
  selectedTextColor?: string; // 선택된 버튼의 텍스트 색상
  unselectedTextColor?: string; // 비선택 상태의 텍스트 색상
  onClick?: () => void;
}

function InterestButton({
  label,
  selected,
  variant = 'md',
  selectedColor = '#D1D1D1',
  unselectedColor = '#FFFFFF',
  selectedTextColor = '#000000',
  unselectedTextColor = '#333333',
  onClick,
}: InterestButtonProps) {
  const sizeClasses = {
    sm: 'text-sm py-3 px-4',
    md: 'text-base py-4 px-5',
    lg: 'text-lg py-5 px-6',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border transition-shadow
        ${sizeClasses[variant]}
        ${selected ? 'shadow-md' : 'shadow-sm hover:shadow'} focus:outline-none`}
      style={{
        backgroundColor: selected ? selectedColor : unselectedColor,
        color: selected ? selectedTextColor : unselectedTextColor,
      }}
    >
      {label}
    </button>
  );
}

export default InterestButton;
