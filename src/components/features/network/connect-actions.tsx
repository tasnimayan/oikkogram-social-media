import { Button } from "@/components/ui/button";
import { DELETE_CONNECTION_REQ } from "@/lib/api/api-connection";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

const ConnectActions = ({
  senderId,
  connectionStatus,
  isSentByMe,
}: {
  senderId: string;
  connectionStatus: string | null;
  isSentByMe?: boolean;
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const qc = useQueryClient();
  const { mutate: rejectRequest, isPending } = useMutation({
    mutationKey: ["CONNECTION", "REJECT"],
    mutationFn: () => useFetchGql(DELETE_CONNECTION_REQ, { sender_id: senderId, receiver_id: userId! }),
    onError: () => toast.error("Something went wrong!"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QK.PEOPLES] });
      qc.invalidateQueries({ queryKey: [QK.CONNECTIONS] });
    },
  });

  const { mutate: cancelRequest, isPending: isCancelPending } = useMutation({
    mutationKey: ["CONNECTION", "REJECT"],
    mutationFn: () => useFetchGql(DELETE_CONNECTION_REQ, { sender_id: userId!, receiver_id: senderId }),
    onError: () => toast.error("Something went wrong!"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QK.PEOPLES] });
      qc.invalidateQueries({ queryKey: [QK.CONNECTIONS] });
    },
  });

  const handleRejectRequest = () => {
    rejectRequest();
  };

  const handleDeleteRequest = () => {
    cancelRequest();
  };

  if (connectionStatus === "accepted")
    return (
      <Button variant="outline" className="w-full" asChild>
        <Link href={`/profile/${senderId}`}>View Profile</Link>
      </Button>
    );

  if (connectionStatus === "pending") {
    if (isSentByMe) {
      return (
        <Button variant="outline" className="w-full" onClick={handleDeleteRequest} disabled={isCancelPending}>
          Cancel
        </Button>
      );
    } else {
      return (
        <Button variant="destructive-outline" className="w-full" onClick={handleRejectRequest} disabled={isPending}>
          Reject
        </Button>
      );
    }
  }

  return (
    <Button variant="destructive-secondary" className="w-full">
      <X className="h-4 w-4" /> Remove
    </Button>
  );
};

export default ConnectActions;
