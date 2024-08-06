"use client";

import { useCallback, useRef } from "react";
import SocialPost from "./SocialPost";
import fetchGraphql from "@/lib/fetchGraphql";
import { getPostWithStatus } from "@/lib/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostSkeleton from "./skeletons/PostSkeleton";
import PostOptions from "./menu/PostOptions";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";

const AllPost = () => {
  const session = useSessionContext();
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      let variables = {
        limit: 3,
        offset: pageParam * 3,
        user_id: session.user?.id,
      };
      const response = await fetchGraphql(getPostWithStatus, variables);
      return response.data.posts;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 0 ? undefined : pages.length;
    },
    initialPageParam: 0,
  });

  // For next page of post loading
  const lastPostElementRef = useCallback(
    (node:HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) return <PostSkeleton />;

  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <div className="flex flex-col gap-6">
        {data?.pages.flat().map((post, postIndex) => {
          if (postIndex === data.pages.length - 1) {
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <SocialPost
                  key={post.id}
                  post={post}
                  OptionsComponent={PostOptions}
                />
              </div>
            );
          }
          return (
            <SocialPost
              key={post.id}
              post={post}
              OptionsComponent={PostOptions}
            />
          );
        })}
      </div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};

export default AllPost;
