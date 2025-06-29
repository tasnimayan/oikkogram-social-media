"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import toast from "react-hot-toast";
import { DELETE_CAUSE } from "@/lib/api/api-cause";

const CauseOptions = ({ causeId }: { causeId: string }) => {
  const qc = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [QK.CAUSES, "TRASH", { causeId }],
    mutationFn: () => useFetchGql(DELETE_CAUSE, { id: causeId }),
    onSuccess: () => {
      toast.success("Cause Deleted");
      qc.invalidateQueries({ queryKey: [QK.CAUSES] });
    },
    onError: () => {
      toast.error("Could not delete cause!");
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/causes/${causeId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CauseOptions;
