import { Skeleton } from "../ui/skeleton";

export const UserCardSkeleton = () => {
  return (
    <>
      {[1, 2].map(idx => {
        return (
          <div key={idx} className="rounded-xl gap-2 bg-white/50 p-2 w-full  my-3">
            <div className="flex px-2 py-1 space-x-3">
              <Skeleton className="flex-shrink-0 w-10 h-10 rounded-full"></Skeleton>
              <div className="flex-1 py-2 space-y-2">
                <Skeleton className="w-20 h-3 rounded"></Skeleton>
                <Skeleton className="w-16 h-2 rounded"></Skeleton>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
