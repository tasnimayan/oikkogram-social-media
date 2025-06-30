"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import PostCard from "../posts/post-card";
import { GET_POSTS } from "@/lib/api/api-feed";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";
import { useSession } from "next-auth/react";

const ROW_LIMIT = 3;

export default function PostList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QK.POSTS, { ROW_LIMIT, userId }],
    queryFn: async ({ pageParam = 0 }) => {
      const variables = {
        limit: ROW_LIMIT,
        offset: pageParam * ROW_LIMIT,
        user_id: userId || "",
      };
      return useFetchGql(GET_POSTS, variables);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.length === ROW_LIMIT ? pages.length : undefined;
    },
    initialPageParam: 0,
  });

  // For next page of post loading
  const lastPostElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
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
  if (isError) return <ErrorResult />;
  if (!data?.pages[0].data.length) return <EmptyResult message="No posts available" />;

  return (
    <div>
      <div className="flex flex-col gap-6">
        {data?.pages.map(page =>
          page.data.map((post, postIndex) => (
            <div key={post.id} ref={postIndex === page.data.length - 1 ? lastPostElementRef : undefined}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
      {isFetchingNextPage && (
        <div className="mt-4" role="status">
          <PostSkeleton />
        </div>
      )}
    </div>
  );
}
