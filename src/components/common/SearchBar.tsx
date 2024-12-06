import Icon from '@eolluga/eolluga-ui/icon/Icon';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="relative mb-2">
      <input
        type="text"
        placeholder="퀴즈 검색..."
        value={value}
        onChange={onChange}
        className="w-full pl-4 pr-10 h-12 rounded-full border-2 border-gray-300 focus:outline-none focus:border-gray-400"
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={onSearch}
      >
        <Icon icon="search" />
      </button>
    </div>
  );
}
