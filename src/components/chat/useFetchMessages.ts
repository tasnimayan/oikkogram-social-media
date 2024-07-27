import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { getMessages } from "@/lib/queries";
import { useChat } from "./ChatProvider";

const useFetchMessages = (conversationId) => {
  const { setMessages } = useChat();
  console.log(setMessages);

  const { data, isLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const response = await fetchGraphql(getMessages, {
        conversation_id: conversationId,
      });
      return response.data.messages;
    },
  });
  setMessages(data);
};

export default useFetchMessages;
