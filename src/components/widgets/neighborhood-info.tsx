import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_NEIGHBORHOOD } from "@/lib/api/api-neighborhood";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
const NeighborhoodInfo = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: neighborhood, isLoading } = useQuery({
    queryKey: [QK.NEIGHBORHOOD, "CARD-INFO"],
    queryFn: () => useFetchGql(GET_USER_NEIGHBORHOOD, { userId: userId as string }),
    select: data => data.data?.neighborhood,
    staleTime: Infinity,
    enabled: !!userId,
  });
  const joinedDate = format(new Date(), "MMMM yyyy");

  if (isLoading) return <Skeleton className="h-[100px] rounded-xl" />;
  if (!neighborhood) return null;
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{neighborhood?.name}</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/neighborhoods" className="flex items-center gap-1 text-xs">
            View <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{neighborhood?.description.slice(0, 100)}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>5 miles radius</span>
        <span>•</span>
        <span>Joined {joinedDate}</span>
      </div>
    </Card>
  );
};

export default NeighborhoodInfo;
