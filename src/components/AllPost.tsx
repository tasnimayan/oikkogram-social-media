"use client";

import React from "react";
import SocialPost from "./SocialPost";
import fetchGraphql from "@/lib/fetchGraphql";
import { getAllPost } from "@/lib/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostSkeleton from "./skeletons/PostSkeleton";
import PostOptions from "./menu/PostOptions";
import InfiniteScroll from "react-infinite-scroll-component";

const AllPost = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      let variables = { limit: 10, offset: pageParam * 10 };
      const response = await fetchGraphql(getAllPost, variables);
      return response.data.posts;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length : undefined;
    },
    initialPageParam: 0,
  });

  if (isLoading) return <PostSkeleton />;

  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <InfiniteScroll
        dataLength={data.pages.flat().length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<PostSkeleton />}
        endMessage={<p>No more posts</p>}
      >
      <div className="flex flex-col gap-6">
        {data.pages.flat().map((post) => (
          <SocialPost key={post.id} post={post} OptionsComponent={PostOptions} />
        ))}
      </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllPost;




// "use client";

// // This component is responsible for fetching all post of user
// import SocialPost from "./SocialPost";
// import fetchGraphql from "@/lib/fetchGraphql";
// import { getAllPost } from "@/lib/queries";
// import { useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "next/navigation";
// import PostSkeleton from "./skeletons/PostSkeleton";
// import PostOptions from "./menu/PostOptions";

// const AllPost = () => {
//   const params = useSearchParams();
//   const page = params.get("page") ?? 0;

//   const { data, error, isLoading } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       let offset = parseInt(page) * 10;
//       let variables = {
//         // limit: limit,
//         offset: offset,
//       };
//       return await fetchGraphql(getAllPost, variables);
//     },
//   });

//   if (isLoading) return <PostSkeleton />;

//   if (error) return <p>An error occurred</p>;

//   return (
//     <div className="flex flex-col gap-6">
//       {data.data?.posts.map((post) => {
//         return (
//           <SocialPost
//             key={post.id}
//             post={post}
//             OptionsComponent={PostOptions}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default AllPost;
