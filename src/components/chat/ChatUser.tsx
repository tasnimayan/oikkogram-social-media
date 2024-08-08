'use client'

import UserSkeleton from '../skeletons/UserSkeleton';
import UserCard from '../UserCard';
import { useChatContext } from './ChatContext';
import { useSessionContext } from '@/app/(protected)/AuthWrapper';

const ChatUser = () => {
  const {conversations} = useChatContext()
  const {user} = useSessionContext()
  if(!conversations) return <UserSkeleton />
  
  return (
    <div className=" mb-3 ">
      { conversations.user1.id == user?.id ? (
        <UserCard user={conversations.user2} />
      ) : (
        <UserCard user={conversations.user1} />
      )}
  </div>
  );
};

export default ChatUser;