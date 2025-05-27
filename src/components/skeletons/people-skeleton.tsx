import { Skeleton } from "@/components/ui/skeleton";

export const PeopleSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {[1, 2].map(index => (
        <div className=" bg-white/50 rounded-lg" key={index}>
          <div className="p-6 flex items-start gap-3">
            <Skeleton className="size-20 rounded-lg"></Skeleton>
            <div className="flex-1 space-y-4">
              <Skeleton className="h-5 w-1/2 rounded"></Skeleton>
              <Skeleton className="h-5 w-2/3 rounded"></Skeleton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
