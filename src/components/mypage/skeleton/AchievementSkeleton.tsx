import Card from '@/components/common/Card';
import { Skeleton } from '@/shadcn/ui/skeleton';

export default function AchievementSkeleton() {
  return (
    <Card>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
        ))}
        <Skeleton className="mt-4 h-12 w-full rounded-lg" />
      </div>
    </Card>
  );
}
