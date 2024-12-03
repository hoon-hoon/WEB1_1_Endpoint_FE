import { Skeleton } from '@/shadcn/ui/skeleton';

const LoadingPlayer = ({ key }: { key: number }) => {
  return (
    <div key={key} className="flex flex-col space-y-1 items-center justify-between text-center">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-4 w-16 mb-1" />
        <Skeleton className="h-4 w-12 mb-1 rounded-lg" />
      </div>
    </div>
  );
};

export default LoadingPlayer;
