import TextField from '@eolluga/eolluga-ui/Input/TextField';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { ChangeEvent, useState } from 'react';

interface CommentInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
}

export default function CommentInput({
  onSubmit,
  placeholder = '댓글을 입력하세요...',
}: CommentInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log('호출됨');
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t-2 bg-white">
      <div className="flex px-4 py-4 gap-4">
        <div className="flex items-center w-full bg-white border border-gray-100 rounded-lg overflow-hidden gap-1">
          <TextField
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            size="M"
            mode="outlined"
            inputMode="text"
          />
          <div className="p-3 bg-black rounded-xl cursor-pointer" onClick={handleSubmit}>
            <Icon icon="add" className="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
