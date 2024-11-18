interface InterestButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function InterestButton({ label, selected, onClick }: InterestButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 rounded-lg border border-gray-300 transition
        ${selected ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}
        ${!selected && 'hover:bg-gray-100'}
        focus:outline-none`}
    >
      {label}
    </button>
  );
}

export default InterestButton;
