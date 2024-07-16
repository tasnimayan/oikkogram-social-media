"use client";
import { useSession } from 'next-auth/react';
import UserCard from './UserCard';
import { useQuery } from '@tanstack/react-query';
import fetchGraphql from '@/utils/fetchGraphql';
import { getConversations } from '@/utils/queries';
import Spinner from './Spinner';
import Link from 'next/link';

const ConversationList = () => {
  let { data: session } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["conversation-list"],
    queryFn: async () => {
      return await fetchGraphql(getConversations);
    },
  });

  if (isLoading) return <Spinner className="p-6 mt-6" />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-[calc(100dvh-250px)] overflow-y-auto ">
      {
        data.data?.conversations.map((data)=>{
          return (
            <Link key={data.id} href={`/chat/${data.id}`} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-1">
              {
                data.user1.id == session?.user.id ? <UserCard user={data.user1}/> : <UserCard user={data.user2}/>
              }
            </Link>
          )
        })
      }
    </div>
  );
};

export default ConversationList;