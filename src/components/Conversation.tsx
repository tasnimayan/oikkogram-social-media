'use client'

import fetchGraphql from '@/utils/fetchGraphql';
import { getMessages, messageSubscription } from '@/utils/queries';
import { useSubscription } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

const Conversation = () => {
  const params = useParams()
  const convId = params.convId
  const {data:session} = useSession()
  const userId = session?.user.id

  const createdAt = new Date().toISOString();

  // const {data:newMessage, loading, error:err} = useSubscription(messageSubscription, {variables:{conversation_id:convId,created_at:createdAt}})

  const {data, isLoading, error} = useQuery({
    queryKey:['conversation'],
    queryFn: async () => {
      return await fetchGraphql(getMessages, {conversation_id:convId})
    }
  })


  return (
    <div className="grid grid-cols-12 gap-y-2">
      {data?.data.messages.map((message)=>{
        const isSender = message.sender_id === userId;
        const colStart = isSender ? 6 : 1;
        const colEnd = isSender ? 13 : 8;
        const bgColor = isSender ? "bg-indigo-100" : "bg-white";
        const justifyContent = isSender ? "justify-start flex-row-reverse" : "justify-start";

        return (
          <div className={`col-start-${colStart} col-end-${colEnd} px-3 rounded-lg`} key={message.id}>
            <div className={`flex items-center ${justifyContent}`}>
              <div className={`relative mr-3 text-sm ${bgColor} py-2 px-4 shadow rounded-xl`}>
                {message.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    // <div className="grid grid-cols-12 gap-y-2">
    //   {
    //     data?.data.messages.map((message)=>{
    //       if(message.sender_id == userId){
    //         return (
    //           <div className="col-start-6 col-end-13 px-3 rounded-lg" key={message.id}>
    //             <div className="flex items-center justify-start flex-row-reverse">
    //               <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
    //                 {message.message}
    //               </div>
    //             </div>
    //           </div>
    //         )
    //       }

    //       return (
    //         <div className="col-start-1 col-end-8 p-3 rounded-lg" key={message.id}>
    //           <div className="flex flex-row items-center">
    //             <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
    //             B
    //             </div>
    //             <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">                              {message.message}
    //             </div>
    //           </div>
    //         </div>
    //       )
    //     })
    //   }
    // </div>

  );
};

export default Conversation;