import React from 'react';
import { SlOptions } from "react-icons/sl";
import UserCard from './UserCard';
import { FriendType } from '@/lib/Interface';
import { useSession } from 'next-auth/react';

interface dataType {
  data:FriendType
}

const FriendCard: React.FunctionComponent<dataType> = ({data}) => {
  let { data: session } = useSession();
  const friend = data.user.id === session?.user.id ? data.friend : data.user

  const actions = (
      <button>
        <SlOptions />
      </button>
    );

  return (
    <UserCard  
      user={friend}
      friendCount={20}
      actions={actions}
    />
  );
};

export default FriendCard;