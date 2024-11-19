import { useState } from 'react';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

type DropdownProps = {
  items: string[];
  selectedItem: string;
  setItem: (item: string) => void;
  placeholder?: string;
};

const Dropdown = ({ items, selectedItem, setItem, placeholder = '' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(selectedItem);

  const handleSelect = (value: string) => {
    setSelected(value);
    setItem(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected ? items.find((item) => item === selected) : placeholder}</span>
        <Icon
          className="ml-2 h-5 w-5 text-gray-500"
          icon={isOpen ? 'chevron_up_outlined' : 'chevron_down_outlined'}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto">
            {items.map((item) => (
              <li
                key={item}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
