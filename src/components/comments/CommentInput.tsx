import TextField from '@eolluga/eolluga-ui/Input/TextField';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { useState } from 'react';

interface CommentInputProps {
  onSubmit: (value: string) => void;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t-2 bg-white">
      <div className="flex px-4 py-4 gap-4">
        <div className="flex items-center w-full bg-white border border-gray-100 rounded-lg overflow-hidden gap-1">
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="M"
            mode="outlined"
            placeholder="댓글을 입력하세요"
          />
          <div className="p-3 bg-black rounded-xl cursor-pointer" onClick={handleSubmit}>
            <Icon icon="add" className="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
