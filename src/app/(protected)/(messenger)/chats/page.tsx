import { MessageCircle } from "lucide-react";

const SelectConversation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 rounded-lg shadow-inner">
      <MessageCircle className="text-6xl text-gray-400 mb-4" />
      <h4 className="text-gray-500 text-2xl font-semibold mb-2">No Conversation Selected</h4>
      <p className="text-gray-400 text-lg mb-6">Please select a conversation from the list to view your messages.</p>
    </div>
  );
};

export default SelectConversation;
