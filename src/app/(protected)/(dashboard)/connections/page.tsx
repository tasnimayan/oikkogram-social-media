import FriendList from "@/components/features/connection/friend-list";
import FriendRequsts from "@/components/features/connection/friend-requsts";

const Connections = () => {
  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="space-y-4">
        <div className="text-gray-700">
          <h2 className="text-lg font-medium mb-2">Connection Requests</h2>
          <div className="mb-8">
            <FriendRequsts />
          </div>
        </div>

        <div className="text-gray-700">
          <h2 className="text-lg font-medium mb-2">Connections</h2>
          <div className="mb-8">
            <FriendList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
