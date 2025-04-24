"use client";

import { useCallback, useEffect, useRef } from "react";
import fetchGraphql from "@/lib/fetchGraphql";
import { getPostWithStatus } from "@/lib/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import PostOptions from "@/components/menu/PostOptions";
import PostCard from "../posts/post-card";

const ROW_LIMIT = 3;
const QUERY_KEY = "POSTS";

export default function PostList() {
  const { user } = useSessionContext();
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, isError, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY],
    queryFn: async ({ pageParam = 0 }) => {
      const variables = {
        limit: ROW_LIMIT,
        offset: pageParam * ROW_LIMIT,
        user_id: user?.id,
      };
      const response = await fetchGraphql(getPostWithStatus, variables);
      return response.data.posts;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === ROW_LIMIT ? pages.length : undefined;
    },
    initialPageParam: 0,
  });

  // For next page of post loading
  const lastPostElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const [firstEntry] = entries;
          if (firstEntry?.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          rootMargin: "100px", // Load posts before reaching the bottom
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (isLoading) return <PostSkeleton />;
  if (isError) return <ErrorComponent message={error?.message || "An error occurred while loading posts"} />;

  const posts = data?.pages.flat() ?? [];
  const hasNoPosts = posts.length === 0;

  if (hasNoPosts) {
    return (
      <div className="text-center p-4 text-gray-500" role="status">
        No posts available
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {posts.map((post, postIndex) => (
          <div key={post.id} ref={postIndex === posts.length - 1 ? lastPostElementRef : undefined}>
            <PostCard post={post} OptionsComponent={PostOptions} />
            {/* <SocialPost post={post} OptionsComponent={PostOptions} /> */}
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="mt-4" role="status">
          <PostSkeleton />
        </div>
      )}
    </div>
  );
}

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className="text-center p-4 text-red-600" role="alert">
      <p>{message}</p>
      <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-red-100 rounded-md hover:bg-red-200">
        Retry
      </button>
    </div>
  );
};
