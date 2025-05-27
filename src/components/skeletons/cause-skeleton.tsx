import { Skeleton } from "@/components/ui/skeleton";

export const CauseSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Skeleton className="relative h-64 w-full"></Skeleton>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-24 mr-2" />
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-1 w-16" />
        </div>
      </div>
    </div>
  );
};
