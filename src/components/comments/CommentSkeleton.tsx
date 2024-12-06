import { Skeleton } from '@/shadcn/ui/skeleton';

const CommentSkeleton = () => (
  <div className="space-y-4 p-4">
    {[...Array(7)].map((_, index) => (
      <div key={index} className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    ))}
  </div>
);

export default CommentSkeleton;
