"use client";

import type React from "react";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Send } from "lucide-react";
import { causeUpdates } from "@/lib/constants/data";
import { getTimeDifference } from "@/lib/utils/index";

interface CauseUpdatesProps {
  causeId: string;
}

export function CauseUpdates({ causeId }: CauseUpdatesProps) {
  const [newUpdate, setNewUpdate] = useState("");

  // Filter updates for this cause
  const updates = causeUpdates.filter((update) => update.causeId === causeId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the update to your backend
    console.log("New update:", newUpdate);
    setNewUpdate("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Post an Update</h3>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Share progress, news, or thank supporters..."
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            className="min-h-[100px] mb-3"
          />
          <div className="flex justify-between">
            <Button type="button" variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Add Photo
            </Button>
            <Button type="submit" disabled={!newUpdate.trim()} className="bg-blue-600 hover:bg-blue-700">
              <Send className="mr-2 h-4 w-4" />
              Post Update
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {updates.length > 0 ? (
          updates.map((update) => (
            <div key={update.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-start gap-3 mb-3">
                <Avatar src={update.author.avatar} name={update.author.name} />
                <div>
                  <div className="font-medium">{update.author.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{getTimeDifference(update.createdAt)}</div>
                </div>
              </div>

              <p className="mb-4">{update.content}</p>

              {update.image && <img src={update.image || "/placeholder.svg"} alt="Update" className="rounded-lg w-full object-cover max-h-96 mb-4" />}

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <button className="hover:text-gray-700 dark:hover:text-gray-200">Like</button>
                <button className="hover:text-gray-700 dark:hover:text-gray-200">Comment</button>
                <button className="hover:text-gray-700 dark:hover:text-gray-200">Share</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No updates yet. Be the first to post an update!</p>
          </div>
        )}
      </div>
    </div>
  );
}
