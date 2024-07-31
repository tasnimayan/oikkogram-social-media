
import { UserType } from '@/lib/Interface';
import AddFriendButton from './buttons/AddFriendButton';
import UserCard from './UserCard';

interface PeopleType extends UserType {
  sent_req: []
  received_req: []
}

const PeopleCard= ({data:user}:{data:PeopleType}) => {
  let status = ''
  
  if (user.sent_req.length){
    status = user.sent_req[0].status
  }
  else if (user.received_req.length){
    status = user.received_req[0].status
  }
  // Action button of operation.
  const actions = getAction(status, user.id)
  
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
      return (<a href={`/profile/${userId}`} className="border rounded px-2 py-2  border-c-primary text-sm w-28 text-center">View Profile</a>);
    case 'pending':
      return (<button className="border rounded px-2 py-1 bg-blue-400 text-white text-sm">Requested</button>);
    default:
      return (<AddFriendButton friendId={userId}/>)
  }
}