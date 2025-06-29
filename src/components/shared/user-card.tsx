import { UserType } from "@/lib/interfaces";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import Link from "next/link";

interface UserCardProps {
  user: UserType;
  friendCount?: number | string;
  actions?: React.ReactNode;
  isLink?: boolean;
}

const UserCard = ({ user, friendCount, actions }: UserCardProps) => {
  if (!user) return null;
  return (
    <Card className="shadow-none flex flex-col items-start justify-between lg:flex-row lg:items-center gap-2 p-2">
      <div className="flex items-center gap-3">
        <Avatar src={user.image || "/placeholder.png"} name={user.name} showStatus status="ONLINE" />
        <div>
          <Link href={`/profile/${user.id}`} className="hover:text-blue-600 transition-colors">
            <p>{user?.name}</p>
          </Link>
          {friendCount && <p className="text-xs text-gray-400">{friendCount} friends</p>}
        </div>
      </div>
      {actions && actions}
    </Card>
  );
};

export default UserCard;
