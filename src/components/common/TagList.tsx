type TagListProps = {
  tags: string[];
  onTagClick?: (tag: string) => void;
};

const TagList = ({ tags, onTagClick }: TagListProps) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
      {tags.map((tag) => (
        <span
          key={tag}
          onClick={() => onTagClick?.(tag)}
          style={{
            background: '#f0f0f0',
            padding: '4px 8px',
            borderRadius: '16px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
