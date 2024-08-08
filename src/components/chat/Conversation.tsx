"use client";

import SearchBox from "@/components/SearchBox";
import { UserType } from "@/lib/Interface";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { getConversations, insertOrGetConversation } from "@/lib/queries";
import UserCard from "../UserCard";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";

const ConversationList = dynamic(
  () => import("@/components/chat/ConversationList")
);

const Conversation = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const router = useRouter()

  const {user} = useSessionContext()

  const { data, error, isLoading } = useQuery({
    queryKey: ["conversation-list"],
    queryFn: async () => {
      return await fetchGraphql(getConversations);
    },
  });

  const handleSearchResults = (results: UserType[]) => {
    setUsers(results);
  };

  const handleRedirect = async (user2:string) =>{
    const res = await fetchGraphql(insertOrGetConversation,{user1:user?.id, user2:user2})
    let convId = res.data.insert_or_get_conversation[0].id
    router.push(`/chat/${convId}`)
  }


  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 border-r">
      <div>
        <SearchBox onResults={handleSearchResults} />
        {users && <div className="flex flex-col gap-y-2 my-2">
          {users.map((user)=><button key={user.id} onClick={()=>handleRedirect(user.id)}><UserCard user={user} /></button>)}
          </div>
        }
      </div>
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
          <IoChatboxEllipsesOutline className="w-6 h-6" />
        </div>
        <div className="ml-2 font-bold text-2xl">Conversations</div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
        </div>

        {!isLoading && !error && (
          <ConversationList
            conversations={data.data?.conversations || []}
          />
        )}
      </div>
    </div>

  );
}
export default Conversation;