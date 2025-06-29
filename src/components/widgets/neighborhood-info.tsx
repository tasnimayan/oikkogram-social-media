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

  const { data, isLoading } = useQuery({
    queryKey: [QK.NEIGHBORHOOD, "CARD-INFO"],
    queryFn: () => useFetchGql(GET_USER_NEIGHBORHOOD, { userId: userId as string }),
    select: data => data.data,
    staleTime: 60 * 60 * 1000,
    enabled: !!userId,
  });

  if (isLoading) return <Skeleton className="h-[100px] rounded-xl" />;
  if (!data?.neighborhood) return null;

  const joinedDate = format(new Date(data.created_at || ""), "MMMM yyyy");
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">My Neighborhood</h3>
      </div>

      <Link href="/neighborhoods" className="hover:underline text-primary">
        <h3 className="font-semibold mb-2">{data.neighborhood.name}</h3>
      </Link>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{data.neighborhood?.description.slice(0, 100)}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>5 miles radius</span>
        <span>Joined {joinedDate}</span>
      </div>
    </Card>
  );
};

export default NeighborhoodInfo;
