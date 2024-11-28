import { useState } from 'react';
import { Input } from '@/shadcn/ui/input';
import { Badge } from '@/shadcn/ui/badge';
import { X } from 'lucide-react';

const MAX_HASHTAGS = 3;

export default function TagInput({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (value: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      addHashtag(inputValue.trim());
    }
  };

  const addHashtag = (tag: string) => {
    if (tags.length < MAX_HASHTAGS) {
      const newHashtag = tag.replace(/\s+/g, '').toLowerCase();
      if (!tags.includes(newHashtag) && newHashtag !== '') {
        setTags([...tags, newHashtag]);
        setInputValue('');
      }
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full max-w-xs mx-auto px-4">
      <div className="relative">
        <Input
          type="text"
          placeholder={'태그 입력'}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
          disabled={tags.length >= MAX_HASHTAGS}
          aria-label="해시태그 입력"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
          {tags.length}/{MAX_HASHTAGS}
        </div>
      </div>
      <div className="flex flex-wrap mt-2 gap-2">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="inline-flex items-center text-sm py-1 px-2"
          >
            #{tag}
            <button
              onClick={() => removeHashtag(tag)}
              className="ml-1 focus:outline-none"
              aria-label={`Remove hashtag ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
