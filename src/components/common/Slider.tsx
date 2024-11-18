import { useState } from 'react';

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
};

const Slider = ({ value, onValueChange, min, max, step = 1 }: SliderProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="w-full flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
      />
      <div className="ml-4 text-sm font-medium">{internalValue}</div>
    </div>
  );
};

export default Slider;
