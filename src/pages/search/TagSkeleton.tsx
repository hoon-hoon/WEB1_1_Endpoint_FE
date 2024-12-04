const TagSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="px-3 py-1 rounded-full bg-gray-300 animate-pulse text-transparent">
        Loading
      </div>
      <div className="px-3 py-1 rounded-full bg-gray-300 animate-pulse text-transparent">
        Loading
      </div>
      <div className="px-3 py-1 rounded-full bg-gray-300 animate-pulse text-transparent">
        Loading
      </div>
    </div>
  );
};

export default TagSkeleton;
