import { SlOptions } from "react-icons/sl";
import UserCard from "./UserCard";
import { UserType } from "@/lib/Interface";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";

interface dataType {
  data: {
    user: UserType;
    friend: UserType;
  };
}

const FriendCard: React.FunctionComponent<dataType> = ({ data }) => {
  let { user } = useSessionContext();
  const friend = data.user.id === user?.id ? data.friend : data.user;

  const actions = (
    <button>
      <SlOptions />
    </button>
  );

  return <UserCard user={friend} friendCount={20} actions={actions} />;
};

export default FriendCard;
