import { CauseCard } from "./cause-card";
import { useQuery } from "@tanstack/react-query";
import { GET_CAUSES_BY_USER } from "@/lib/api/api-cause";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { Loading } from "@/components/ui/loading";
import { Ribbon } from "lucide-react";
import { DataState, ErrorResult } from "@/components/ui/data-message";
import { useParams } from "next/navigation";

const UserCauseList = () => {
  const params = useParams();
  const userId = params.userId as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.CAUSES, { userId }],
    queryFn: () => useFetchGql(GET_CAUSES_BY_USER, { userId: userId! }),
    enabled: !!userId,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorResult />;
  if (!data?.data.length) return <DataState message="No causes found" icon={<Ribbon className="size-10" />} />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Causes</h2>
      <div className="flex flex-col gap-6">
        {data?.data.map(cause => (
          <CauseCard key={cause.id} cause={cause} />
        ))}
      </div>
    </div>
  );
};

export default UserCauseList;
