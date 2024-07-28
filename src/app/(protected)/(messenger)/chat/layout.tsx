"use client";
import SearchBox from "@/components/SearchBox";
import { UserType } from "@/lib/Interface";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { getConversations } from "@/lib/queries";

const ConversationList = dynamic(
  () => import("@/components/chat/ConversationList")
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<UserType[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["conversation-list"],
    queryFn: async () => {
      return await fetchGraphql(getConversations);
    },
  });

  const handleSearchResults = (results: UserType[]) => {
    setUsers(results);
  };
  console.log("from search:", users);
  return (
    <main className="mt-[70px] h-[calc(100vh-70px)] overflow-hidden">
      <div className="flex text-gray-800">
        <div className="flex flex-row border h-full w-full overflow-x-hidden bg-gray-50">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 border-r">
            <div>
              <SearchBox onResults={handleSearchResults} />
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

          {children}
        </div>
      </div>
    </main>
  );
}

// "use client";
// import SearchBox from "@/components/SearchBox";
// import { UserType, ConversationType } from "@/lib/Interface";
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { IoChatboxEllipsesOutline } from "react-icons/io5";
// import { useSession } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";
// import fetchGraphql from "@/lib/fetchGraphql";
// import { getConversations } from "@/lib/queries";

// const ConversationList = dynamic(
//   () => import("@/components/chat/ConversationList")
// );

// export default function ChatLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { data: session } = useSession();
//   const [users, setUsers] = useState<UserType[]>([]);

//   const { data, error, isLoading } = useQuery({
//     queryKey: ["conversation-list"],
//     queryFn: async () => {
//       return await fetchGraphql(getConversations);
//     },
//   });

//   const handleSearchResults = (results: UserType[]) => {
//     setUsers(results);
//   };

//   return (
//     <main className="mt-[70px] h-[calc(100vh-70px)] overflow-hidden">
//       <div className="flex antialiased text-gray-800">
//         <div className="flex flex-row h-full w-full overflow-x-hidden bg-gray-50">
//           <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 border-r">
//             <div>
//               <SearchBox onResults={handleSearchResults} />
//             </div>
//             <div className="flex flex-row items-center justify-center h-12 w-full">
//               <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
//                 <IoChatboxEllipsesOutline className="w-6 h-6" />
//               </div>
//               <div className="ml-2 font-bold text-2xl">Conversations</div>
//             </div>

//             <div className="flex flex-col mt-8">
//               <div className="flex flex-row items-center justify-between text-xs">
//                 <span className="font-bold">Active Conversations</span>
//               </div>
//               {isLoading && <p>Loading...</p>}
//               {error && <p>An error occurred</p>}
//               {!isLoading && !error && (
//                 <ConversationList
//                   conversations={data.data?.conversations || []}
//                 />
//               )}
//             </div>
//           </div>

//           {children}
//         </div>
//       </div>
//     </main>
//   );
// }
