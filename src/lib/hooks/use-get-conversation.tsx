import { useMutation, useQuery } from "@tanstack/react-query";
import { QK } from "../constants/query-key";
import { useFetchGql } from "../api/graphql";
import { GET_CONVERSATION, INSERT_CONVERSATION } from "../api/api-chat";
import { useQueryClient } from "@tanstack/react-query";

export const useGetConversation = ({ userId1, userId2 }: { userId1: string; userId2: string }) => {
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.CONVERSATION, { userId1, userId2 }],
    queryFn: async () => useFetchGql(GET_CONVERSATION, { userId1, userId2 }),
    select: data => data.data[0],
    enabled: !!userId1 && !!userId2,
  });

  const { mutateAsync, isError: isMutationError } = useMutation({
    mutationFn: async () => useFetchGql(INSERT_CONVERSATION, { userId1, userId2 }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: [QK.CONVERSATION, { userId1, userId2 }],
      });
    },
  });

  return { data, isLoading, mutateAsync, isError: isError || isMutationError };
};
