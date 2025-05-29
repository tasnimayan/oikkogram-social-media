import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SEND_MESSAGE } from "@/lib/api/api-chat";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useFetchGql } from "@/lib/api/graphql";
import { Input } from "@/components/ui/input";
type FormData = {
  message: string;
};

const MessageSendForm = () => {
  const params = useParams();
  const convId = params.convId;

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (variables: { content: string; conversation_id: number }) => useFetchGql(SEND_MESSAGE, variables),
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    mutate({
      conversation_id: +convId,
      content: data.message,
    });
    reset();
  };

  return (
    <div>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" type="button" className="relative h-input">
              <Input type="file" className="opacity-0 absolute inset-0" />
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea
              placeholder="Type a message..."
              className="flex-1 resize-none h-input"
              {...register("message")}
              rows={3}
            />
            <Button type="submit" variant="outline" disabled={isPending} className="h-input">
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
