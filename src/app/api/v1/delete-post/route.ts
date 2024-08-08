import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const deletePost = async (postId: number) => {
  const twentyFourHours = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const deletePostMutation = `
    mutation DeletePost($id: Int!, $twentyFourHours: timestamp!) {
      delete_posts(where: {id: {_eq: $id}, is_deleted: {_eq: true}, deleted_at: {_lte: $twentyFourHours}}) {
        affected_rows
      }
    }
  `;

  try {
    await axios.post(
      process.env.HASURA_PROJECT_ENDPOINT as string,
      {
        query: deletePostMutation,
        variables: { id: postId, twentyFourHours },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
        },
      }
    );

    console.log(`Post with id ${postId} deleted successfully.`);
    return true;
  } catch (error) {
    console.error(`Error deleting post with id ${postId}:`, error);
    return false;
  }
};

export async function POST(req: NextRequest) {
  const { event } = await req.json();
  const { old, new: newPost } = event.data;

  if (newPost.is_deleted && !old.is_deleted) {
    setTimeout(() => {
      deletePost(newPost.id);
    }, 24 * 60 * 60 * 1000);

    return NextResponse.json({ success: true ,message:"Post scheduled for deletion"});
  } else {
    return NextResponse.json({ success: false, message: "Invalid event" });
  }
}
