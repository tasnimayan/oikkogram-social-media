
import { UserType } from '@/lib/Interface';
import AddFriendButton from './buttons/AddFriendButton';
import UserCard from './UserCard';
import PeopleActionBtn from './buttons/PeopleActionBtn';

interface PeopleType extends UserType {
  sent_req: [{status:null | "pending" | "accepted"}]
  received_req: [{status:null | "pending" | "accepted"}]
}

const PeopleCard= ({data:user}:{data:PeopleType}) => {
  let status = null
  
  if (user.sent_req.length){
    status = user.sent_req[0].status
  }
  else if (user.received_req.length){
    status = user.received_req[0].status
  }

  const actions = <PeopleActionBtn friendId={user.id} initialStatus={status}/>
  
  return (
    <UserCard  
      user={user}
      friendCount={20}
      actions={actions}
    />
  );
};

export default PeopleCard;

function getAction(status:string | null, userId:string) {
  switch(status) {
    case 
    'accepted':
      return (<a href={`/profile/${userId}`} className="border rounded p-2  border-c-primary text-sm w-28 text-center">View Profile</a>);
    case 'pending':
      return (<button className="border rounded p-2  border-c-primary text-sm w-28 text-center">Cancel</button>);
    default:
      return (<AddFriendButton friendId={userId}/>)
  }
}