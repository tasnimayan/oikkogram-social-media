import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SEND_MESSAGE } from "@/lib/api/api-chat";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useFetchGql } from "@/lib/api/graphql";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

const MessageSendForm = () => {
  const [message, setMessage] = useState("");
  const params = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const convId = params.conversationId;

  const { mutate, isPending } = useMutation({
    mutationFn: (variables: { content: string; conversation_id: number }) => useFetchGql(SEND_MESSAGE, variables),
  });

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      mutate({
        conversation_id: +convId,
        content: trimmedMessage,
      });
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div>
      <div className="p-4 border-t">
        <div className="flex space-x-3">
          <Button variant="outline" size="icon" type="button" className="relative h-input">
            <Input type="file" className="opacity-0 absolute inset-0" />
            <Paperclip className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="min-h-[44px] max-h-32 resize-none border-gray-300 focus:ring-0 focus:border-none"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isPending}
            size="icon"
            className="h-11 w-11 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageSendForm;
