import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { VariablesOf } from "gql.tada";
import { UPDATE_POST } from "../api/api-feed";
import { useFetchGql } from "../api/graphql";
import { QK } from "../constants/query-key";
import { toast } from "react-hot-toast";

export const useUpdatePost = () => {
  const qc = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (variables: VariablesOf<typeof UPDATE_POST>) => useFetchGql(UPDATE_POST, variables),
    onSuccess: () => {
      toast.success("Post Updated");
      qc.invalidateQueries({ queryKey: [QK.POSTS, QK.POST] });
    },
    onError: () => toast.error("Failed to update post"),
  });

  return updateMutation;
};
