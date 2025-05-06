import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { sendMessage } from "@/lib/api/queries";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
type FormData = {
  message: string;
};

const MessageSendForm = () => {
  const params = useParams();
  const convId = params.convId;

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const variables = {
        conversation_id: convId,
        message: data.message,
      };
      return await fetchGraphql(sendMessage, variables);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);
    reset();
  };

  return (
    <div>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea placeholder="Type a message..." className="flex-1 resize-none h-10" {...register("message")} rows={3} />
            <Button type="submit" variant="outline" disabled={isPending}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageSendForm;
