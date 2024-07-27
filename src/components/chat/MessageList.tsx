import { Message } from "@/lib/Interface";

const MessageList = ({
  userId,
  messages,
  isNew,
}: {
  userId: string;
  isNew: boolean;
  messages: Message[];
}) => {
  return (
    // <div className="grid grid-cols-12 gap-y-2">
    <div className="grid gap-y-2">
      {messages.map((message) => {
        const isSender = message.sender_id === userId;
        const colStart = isSender ? 6 : 1;
        const colEnd = isSender ? 13 : 8;
        const bgColor = isSender ? "bg-indigo-100" : "bg-white";
        const justifyContent = isSender
          ? "justify-start flex-row-reverse"
          : "justify-start";

        return (
          <div
            className={`col-start-${colStart} col-end-${colEnd} px-3 rounded-lg`}
            key={message.id}
          >
            <div className={`flex items-center ${justifyContent}`}>
              <div
                className={`relative mr-3 text-sm ${bgColor} py-2 px-4 shadow rounded-xl`}
              >
                {message.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
