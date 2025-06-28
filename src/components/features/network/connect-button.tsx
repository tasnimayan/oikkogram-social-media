"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../ui/button";
import { UserCheck, UserPlus } from "lucide-react";
import { useFetchGql } from "@/lib/api/graphql";
import { useMutation } from "@tanstack/react-query";
import { SEND_CONNECTION_REQ, UPDATE_CONNECTION_REQ } from "@/lib/api/api-connection";
import { useQueryClient } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";
import { useSession } from "next-auth/react";

const ConnectButton = ({
  receiverId,
  connectionStatus,
  isSentByMe,
}: {
  receiverId: string;
  connectionStatus: string | null;
  isSentByMe?: boolean;
}) => {
  const [status, setStatus] = useState<string | null>(connectionStatus);
  const [isISent, setIsISent] = useState<boolean>(isSentByMe || false);
  const qc = useQueryClient();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!receiverId) {
    return null;
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["CONNECT"],
    mutationFn: () => useFetchGql(SEND_CONNECTION_REQ, { receiver_id: receiverId }),
    onSuccess: () => {
      setStatus("pending");
      setIsISent(true);
      toast.success("Connection request sent!");
      qc.invalidateQueries({ queryKey: [QK.PEOPLES] });
    },
    onError: () => {
      toast.error("Could not sent connection request");
    },
  });

  const { mutate: updateReq, isPending: isUpdatePending } = useMutation({
    mutationKey: ["CONNECTION", "REJECT"],
    mutationFn: () =>
      useFetchGql(UPDATE_CONNECTION_REQ, { sender_id: receiverId, receiver_id: userId!, status: "accepted" }),
    onError: () => toast.error("Something went wrong!"),
    onSuccess: () => {
      setStatus("accepted");
      qc.invalidateQueries({ queryKey: [QK.PEOPLES] });
    },
  });

  const handleAddFriend = () => {
    mutate();
  };

  console.log(receiverId, status, isISent);
  if (status === "pending") {
    if (isISent) {
      return (
        <Button variant="outline" className="w-full">
          Request Sent
        </Button>
      );
    } else {
      return (
        <Button variant="outline" className="w-full" onClick={() => updateReq()} disabled={isUpdatePending}>
          Accept
        </Button>
      );
    }
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
