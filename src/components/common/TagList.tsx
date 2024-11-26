import { useState } from "react";

type TagListProps = {
  tags: string[];
  onTagClick?: (selectedTags: string[]) => void;
};

const TagList = ({ tags, onTagClick }: TagListProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    const updatedTags = isSelected
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]; 

    setSelectedTags(updatedTags);
    onTagClick?.(updatedTags);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <span
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium ${
              isSelected
                ? "bg-gray-400 text-white"
                : "bg-gray-200"
            }`}
          >
            #{tag}
          </span>
        );
      })}
    </div>
  );
};

export default TagList;
