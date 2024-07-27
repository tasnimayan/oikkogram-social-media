"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { sendFriendRequest } from "@/lib/queries";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddFriendButton = ({ friendId }: { friendId: string }) => {
  const [status, setStatus] = useState();
  if (!friendId) {
    return;
  }

  let variables = {
    friend_id: friendId,
  };

  const handleAddFriend = async () => {
    try {
      const response = await fetchGraphql(sendFriendRequest, variables);
      if (response.errors) {
        return toast.error(response.errors[0].extensions.code);
      }
      setStatus(response.data.insert_friends_one.status);
    } catch (err) {
      console.error("Error Fetching Data:", err);
    }
  };

  return (
    <button
      onClick={handleAddFriend}
      className="border rounded px-2 py-1 bg-blue-400"
    >
      {status ?? "Add Friend"}
    </button>
  );
};

export default AddFriendButton;
