import React from 'react';
import { SlOptions } from "react-icons/sl";
import UserCard from './UserCard';
import { FriendType } from '@/lib/Interface';

interface dataType {
  data:FriendType
}

const FriendCard: React.FunctionComponent<dataType> = ({data}) => {
  const actions = (
      <button>
        <SlOptions />
      </button>
    );
  return (
    <UserCard  
      user={data.user}
      friendCount={20}
      actions={actions}
    />
  );
};

export default FriendCard;