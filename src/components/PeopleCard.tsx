
import { UserType } from '@/lib/Interface';
import AddFriendButton from './buttons/AddFriendButton';
import UserCard from './UserCard';

const PeopleCard= ({data}:{data:UserType}) => {
  const actions = (
    <AddFriendButton friendId={data?.id}/>
  )
  return (
    <UserCard  
      user={data}
      friendCount={20}
      actions={actions}
    />
  );
};

export default PeopleCard;