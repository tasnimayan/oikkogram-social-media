// CommentSection.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { LuSendHorizonal } from "react-icons/lu";

const CommentSection = ({ postId }: { postId:number | string }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      // const response = await axios.get(`/api/posts/${postId}/comments`);
      // setComments(response.data);
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const response = await axios.post(`/api/posts/${postId}/comments`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4">
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="mb-2">
            <strong>{comment.user.name}</strong>: {comment.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment} className="text-nowrap bg-blue-500 text-white p-2 rounded mt-2">
          <LuSendHorizonal className="" />
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
