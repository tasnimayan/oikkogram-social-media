import { UserType } from "@/lib/interfaces";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";

interface UserCardProps {
  user: UserType;
  friendCount?: number | string;
  actions?: any;
  isLink?: boolean;
}

const UserCard = ({ user, friendCount, actions }: UserCardProps) => {
  if (!user) return null;
  return (
    <Card className="shadow-none flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-3">
        <Avatar src={user.image || "/placeholder.png"} name={user.name} showStatus status="ONLINE" />
        <div>
          <a href={`/profile/${user.id}`}>
            <p>{user?.name}</p>
          </a>
          {friendCount && <p className="text-xs text-gray-400">{friendCount} friends</p>}
        </div>
      </div>
      {actions && <div className="flex gap-2 ">{actions}</div>}
    </Card>
  );
};

export default UserCard;
