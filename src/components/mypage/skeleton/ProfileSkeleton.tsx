import Card from '@/components/common/Card';
import { Skeleton } from '@/shadcn/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-items-center">
        <div className="space-y-2 text-center">
          <Skeleton className="h-3 w-[80px] mx-auto" />
          <Skeleton className="h-6 w-[60px] mx-auto" />
        </div>
        <div className="space-y-2 text-center">
          <Skeleton className="h-3 w-[80px] mx-auto" />
          <Skeleton className="h-6 w-[60px] mx-auto" />
        </div>
      </div>
    </Card>
  );
}
