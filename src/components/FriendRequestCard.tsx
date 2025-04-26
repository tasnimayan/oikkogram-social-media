import RequestOptionButton from "./utility/RequestOptionButton";
import { FriendType } from "@/lib/Interface";
import UserCard from "./UserCard";

interface dataType {
  data: FriendType;
}

const FriendRequestCard = ({ data }: dataType) => {
  const actions = (
    <>
      <RequestOptionButton buttonType="confirm" id={data.user?.id}>
        Confirm
      </RequestOptionButton>
      <RequestOptionButton buttonType="delete" id={data.user?.id}>
        Remove
      </RequestOptionButton>
    </>
  );
  return <UserCard user={data.user} friendCount={20} actions={actions} />;
};

export default FriendRequestCard;
