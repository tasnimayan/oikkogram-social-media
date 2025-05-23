"use client";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image, Calendar, MapPin, Plus } from "lucide-react";
import { useRef } from "react";

import CreatePostModal from "@/components/forms/post-create-form";
import { useSession } from "next-auth/react";

const CreatePostCard: React.FC = () => {
  const modalRef = useRef<any>(null);

  const toggleModal = () => {
    modalRef.current.open = true;
  };
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <section className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-4">
      <div className="flex gap-4">
        <Avatar src={user?.image} name={user?.name} />

        <div className="flex-1 flex flex-col gap-3">
          <Button
            variant="ghost"
            className="min-h-[60px] w-full rounded-lg text-start justify-start items-start bg-gray-50 text-gray-400 active:bg-gray-200"
            onClick={toggleModal}
          >
            What's on your mind...
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Image className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Photo
                </span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Event
                </span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <MapPin className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Location
                </span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  More
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CreatePostModal modalRef={modalRef} />
    </section>
  );
};

export default CreatePostCard;
