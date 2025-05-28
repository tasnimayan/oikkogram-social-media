import { useMutation, useQuery } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import { GET_NEIGHBORHOODS, INSERT_USER_NEIGHBORHOOD } from "@/lib/api/api-neighborhood";
import { Loading } from "@/components/ui/loading";
import { NeighborhoodCard } from "./neighborhood-card";
import { MapPin } from "lucide-react";
import { SearchFilter } from "@/lib/hooks/use-search";
import { useMemo } from "react";
import { VariablesOf } from "gql.tada";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const NeighborhoodList = ({ division, searchQuery }: { division?: string; searchQuery?: SearchFilter[] }) => {
  const filterQuery: VariablesOf<typeof GET_NEIGHBORHOODS>["filter"] = useMemo(
    () => ({
      ...(division ? { division: { _eq: division } } : {}),
      ...(searchQuery?.length ? { _or: searchQuery } : {}),
    }),
    [division, searchQuery]
  );

  const qc = useQueryClient();

  const { data: neighborhoods, isLoading } = useQuery({
    queryKey: [QK.NEIGHBORHOOD],
    queryFn: () => useFetchGql(GET_NEIGHBORHOODS, { filter: filterQuery }),
    select: data => data.data,
  });

  const { mutate } = useMutation({
    mutationFn: (neighborhoodId: string) => useFetchGql(INSERT_USER_NEIGHBORHOOD, { neighborhood_id: neighborhoodId }),
    onSuccess: () => {
      toast.success("Joined neighborhood");
      qc.invalidateQueries({ queryKey: [QK.NEIGHBORHOOD, "CARD-INFO"] });
    },
    onError: () => {
      toast.error("Failed to join neighborhood");
    },
  });

  const onJoinNeighborhood = async (neighborhoodId: string) => {
    mutate(neighborhoodId);
  };

  if (isLoading) return <Loading />;
  if (!neighborhoods?.length)
    return (
      <div className="text-center py-12">
        <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No neighborhoods found</h3>
      </div>
    );

  return (
    <div className="grid gap-6">
      {neighborhoods.map(neighborhood => (
        <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} onJoin={onJoinNeighborhood} />
      ))}
    </div>
  );
};
