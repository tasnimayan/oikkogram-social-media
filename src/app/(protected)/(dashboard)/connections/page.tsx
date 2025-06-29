import FriendList from "@/components/features/connection/friend-list";
import FriendRequsts from "@/components/features/connection/friend-requsts";

const Connections = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Connections</h1>
      <div className="space-y-2">
        <div className="text-muted-foreground">
          <h2 className="text-lg font-medium mb-2 text-primary">Requests</h2>
          <div className="mb-4">
            <FriendRequsts />
          </div>
        </div>

        <div className="text-muted-foreground">
          <h2 className="text-lg font-medium mb-2 text-primary">Connected</h2>
          <div className="mb-4">
            <FriendList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
