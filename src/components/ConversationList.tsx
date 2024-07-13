"use client";
import { useSession } from 'next-auth/react';
import UserCard from './UserCard';
import { useQuery } from '@tanstack/react-query';
import fetchGraphql from '@/utils/fetchGraphql';
import { getFriendRequests } from '@/utils/queries';
import Spinner from './Spinner';
import Link from 'next/link';
import { FriendType } from '@/utils/Interface';

const ConversationList = () => {
  let { data: session } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["friend-list"],
    queryFn: async () => {
      const variables = {
        user_id: session?.user.id,
        status: "accepted",
      };
      return await fetchGraphql(getFriendRequests, variables);
    },
  });

  if (isLoading) return <Spinner className="p-6 mt-6" />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-[calc(100dvh-250px)] overflow-y-auto ">
      {
        data.data?.friends.map((item:FriendType)=>{
          return (
            <Link href={`/chat/`} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-1">
              <UserCard user={item.user}/>
            </Link>
          )
        })
      }
    </div>
  );
};

export default ConversationList;