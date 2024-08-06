"use client";
import { useState } from "react";
import Link from "next/link";
import { useSessionContext } from "../AuthWrapper";
import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import AvatarBox from "@/components/AvatarBox";

export const getUserBookmarks = `
  query getBookmarkedPosts($user_id: uuid!) {
    bookmarks(where: {user_id: {_eq: $user_id}}) {
      created_at
      post {
        id
        content
        created_at
        user {
          id
          name
          image
        }
      }
    }
  }
`;

const SavedPage = () => {
  const { user } = useSessionContext();
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  useQuery({
    queryKey: ["bookmarks", user?.id],
    queryFn: async () => {
      const response = await fetchGraphql(getUserBookmarks, {
        user_id: user?.id,
      });
      if (response.errors) throw new Error("Bookmarks fetchin failed!");
      return setBookmarkedPosts(response.data.bookmarks);
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarkedPosts.length === 0 ? (
          <p className="text-center col-span-full">No bookmarks yet.</p>
        ) : (
          bookmarkedPosts.map((bookmark) => {
            const details = {
              id: bookmark.post.user.id,
              name: bookmark.post.user.name,
              image: bookmark.post.user.image,
              time: new Date(bookmark.created_at).toDateString().slice(4),
            };

            return (
              <div
                key={bookmark.post.id}
                className="border rounded-lg p-4 bg-white shadow"
              >
                <div className="flex justify-between">
                  <AvatarBox details={details} />
                </div>
                <h2 className="text-xl font-semibold">{bookmark.post.title}</h2>
                <p className="text-gray-600 mt-2">{bookmark.post.content}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/post/${bookmark.post.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavedPage;
