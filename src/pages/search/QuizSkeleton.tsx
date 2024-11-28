import { Skeleton } from '@/shadcn/ui/skeleton';

export default function QuizSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="ml-4 flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-3/4 mb-4" />
      <div className="flex gap-4 mb-4">
        <Skeleton className="flex-1 h-12 rounded-lg" />
        <Skeleton className="flex-1 h-12 rounded-lg" />
      </div>
      <div className="flex gap-6">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
    </div>
  );
}
