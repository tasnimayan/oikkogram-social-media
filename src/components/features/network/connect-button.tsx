"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../ui/button";
import { Clock, UserCheck, UserPlus } from "lucide-react";
import { useFetchGql } from "@/lib/api/graphql";
import { useMutation } from "@tanstack/react-query";
import { SEND_CONNECTION_REQ } from "@/lib/api/api-connection";

const ConnectButton = ({ receiverId, connectionStatus }: { receiverId: string; connectionStatus: string | null }) => {
  const [status, setStatus] = useState<string | null>(connectionStatus);
  if (!receiverId) {
    return;
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["CONNECT"],
    mutationFn: () => useFetchGql(SEND_CONNECTION_REQ, { receiver: receiverId }),
    onSuccess: () => {
      setStatus("pending");
      toast.success("Connection request sent!");
    },
    onError: () => {
      toast.error("Could not sent connection request");
    },
  });

  const handleAddFriend = () => {
    mutate();
  };

  if (status === "pending") {
    return (
      <Button variant="outline" className="w-full">
        <Clock className="mr-2 h-4 w-4" />
        Request Sent
      </Button>
    );
  }
  if (status === "accepted") {
    return (
      <Button
        variant="outline"
        className="w-full text-green-600 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-900 dark:hover:bg-green-900/20"
      >
        <UserCheck className="mr-2 h-4 w-4" />
        Connected
      </Button>
    );
  }

  return (
    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAddFriend} disabled={isPending}>
      <UserPlus className="mr-2 h-4 w-4" />
      Connect
    </Button>
  );
};

export default ConnectButton;
