import FriendList from "@/components/friend-list";
import FriendRequsts from "@/components/friend-requsts";

const Connections = () => {
  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="space-y-4">
        <div className="text-gray-700">
          <h2 className="text-lg font-medium mb-2">Friend Requests</h2>
          <div className="mb-8">
            <FriendRequsts />
          </div>
        </div>

        <div className="text-gray-700">
          <h2 className="text-lg font-medium mb-2">Friends</h2>
          <div className="mb-8">
            <FriendList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
