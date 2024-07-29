'use client'
import { useSession } from 'next-auth/react';
import UserCard from '../UserCard';
import { useChatContext } from './ChatContext';

const ChatUser = () => {
  const {conversations} = useChatContext()
  const {data:session} = useSession()
  if(!conversations) return <p>User</p>
  
  return (
    <div className="flex justify-between items-center mb-3">
      { conversations.user1.id == session?.user.id ? (
        <UserCard user={conversations.user2} />
      ) : (
        <UserCard user={conversations.user1} />
      )}
  </div>
  );
};

export default ChatUser;