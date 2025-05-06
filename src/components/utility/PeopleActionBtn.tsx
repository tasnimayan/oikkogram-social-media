"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { sendFriendRequest, cancelFriendRequest } from "@/lib/api/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface PeopleActionBtnProps {
  friendId: string;
  initialStatus?: null | "pending" | "accepted";
}

const PeopleActionBtn = ({ friendId, initialStatus = null }: PeopleActionBtnProps) => {
  const [status, setStatus] = useState(initialStatus);
  const router = useRouter();

  if (!friendId) return null;

  const handleAddFriend = async () => {
    const variables = { friend_id: friendId };
    try {
      const response = await fetchGraphql(sendFriendRequest, variables);
      if (response.errors) {
        return toast.error("Couldn't send request");
      }
      setStatus("pending");
    } catch (err) {
      console.error("Error Fetching Data:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleCancelRequest = async () => {
    let variables = { friend_id: friendId };
    try {
      const response = await fetchGraphql(cancelFriendRequest, variables);
      if (response.errors) {
        return toast.error("Couldn't cancel request");
      }
      setStatus(null);
    } catch (err) {
      console.error("Error Fetching Data:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleViewProfile = () => {
    router.push(`/profile/${friendId}`);
  };

  return (
    <button
      onClick={status === null ? handleAddFriend : status === "pending" ? handleCancelRequest : handleViewProfile}
      className={`w-28 border rounded p-2 text-sm ${status === null ? "text-white bg-c-primary" : "border-c-primary"}`}
    >
      {status === null ? "Add Friend" : status === "pending" ? "Cancel" : "View Profile"}
    </button>
  );
};

export default PeopleActionBtn;
