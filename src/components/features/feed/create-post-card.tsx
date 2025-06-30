"use client";

import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image, Calendar, MapPin, Plus } from "lucide-react";
import { Dialog, DialogContent } from "../../ui/dialog";

import PostForm from "@/components/features/feed/post-form";
import { useSession } from "next-auth/react";
import { useModalState } from "@/lib/hooks/use-modal-state";

const CreatePostCard: React.FC = () => {
  const { open, changeOpen } = useModalState();

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <section className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-4">
      <div className="flex gap-4">
        <Avatar src={user?.image} name={user?.name} />

        <div className="flex-1 flex flex-col gap-3">
          <Button
            variant="ghost"
            className="min-h-[60px] w-ful rounded-lg text-start justify-start items-start bg-gray-50 text-gray-400 active:bg-gray-200"
            onClick={() => changeOpen(true)}
          >
            What's on your mind...
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Image className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Photo</span>
              </Button>

              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Event</span>
              </Button>

              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Location</span>
              </Button>

              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">More</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogContent className="flex flex-col items-center max-h-4/5 max-w-2xl">
          <h4 className="text-center text-2xl font-semibold">Create Post</h4>
          <hr className="w-full" />
          <PostForm />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreatePostCard;
