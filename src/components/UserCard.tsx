import Avatar from "./Avatar";
import { UserType } from "@/lib/Interface";

interface PropType {
  user: UserType;
  friendCount?: number | string;
  actions?: any;
  isLink?: boolean;
}

const UserCard = ({ user, friendCount, actions, isLink }: PropType) => {
  if (!user) return null;
  return (
    <div className="flex justify-between px-3 py-2 bg-white items-center gap-1 rounded-lg border border-gray-100">
      <div className="flex items-center">
        <Avatar src={user?.image} border={false} size={10} />
        <div className="ms-4">
          {isLink ? (
            <a href={`/profile/${user.id}`}>
              <p>{user?.name}</p>
            </a>
          ) : (
            <p>{user?.name}</p>
          )}

          {friendCount && (
            <p className="text-xs text-gray-400">{friendCount} friends</p>
          )}
        </div>
      </div>
      {actions && <div className="flex gap-2 ">{actions}</div>}
    </div>
  );
};

export default UserCard;
