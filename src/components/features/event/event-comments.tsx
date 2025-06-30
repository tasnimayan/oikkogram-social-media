"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { getTimeDifference } from "@/lib/utils/index";

interface EventCommentsProps {
  eventId: string;
}

export function EventComments({ eventId }: EventCommentsProps) {
  const [comment, setComment] = useState("");

  // In a real app, you would fetch comments from your backend
  const comments = [
    {
      id: "1",
      content: "Looking forward to this event! Is there anything specific I should bring?",
      author: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.png",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "2",
      content: "I attended a similar event last month and it was fantastic. Highly recommend!",
      author: {
        id: "3",
        name: "Aisha Patel",
        avatar: "/placeholder.png",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the comment to your backend
    setComment("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="font-semibold mb-4">Discussion</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex">
            <Textarea
              placeholder="Ask a question or share information about this event..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="min-h-[80px] flex-1 resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button type="submit" disabled={!comment.trim()} className="bg-blue-600 hover:bg-blue-700">
            <Send className="mr-2 h-4 w-4" />
            Post
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.avatar || "/placeholder.png"} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="font-medium text-sm">{comment.author.name}</div>
                <p className="text-sm">{comment.content}</p>
              </div>
              <div className="flex gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <button>Like</button>
                <button>Reply</button>
                <span>{getTimeDifference(comment.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
