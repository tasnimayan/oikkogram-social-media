import React from 'react';
import Avatar from './Avatar';
import RequstOptionButton from './buttons/RequstOptionButton';
import { FriendType, UserType } from '@/lib/Interface';
import UserCard from './UserCard';

interface dataType {
  data:FriendType
}

const FriendRequestCard = ({data}:dataType) => {
  const actions = (
    <>
      <RequstOptionButton buttonType='confirm' id={data.user?.id}>
        Confirm
      </RequstOptionButton>
      <RequstOptionButton buttonType='delete' id={data.user?.id}>
        Remove
      </RequstOptionButton>
    </>
  );
  return (
    <UserCard 
      user={data.user}
      friendCount={20}
      actions={actions}
    />
  );
};

export default FriendRequestCard;