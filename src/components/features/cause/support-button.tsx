"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFetchGql } from "@/lib/api/graphql";
import { SUPPORT_CAUSE, UNSUPPORT_CAUSE } from "@/lib/api/api-cause";

export const SupportButton = ({ cause_id, status = false }: { cause_id: string; status?: boolean }) => {
  const [supporting, setSupporting] = useState(status);

  const MUTATION = supporting ? UNSUPPORT_CAUSE : SUPPORT_CAUSE;

  const mutationSupport = useMutation({
    mutationFn: () => useFetchGql(MUTATION, { cause_id }),
    onError: () => {
      setSupporting(status);
    },
  });

  const handleSupport = () => {
    setSupporting(prev => {
      const newSupporting = !prev;
      mutationSupport.mutate();
      return newSupporting;
    });
  };

  return (
    <Button
      size="sm"
      className={`
        ${supporting ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
      `}
      onClick={handleSupport}
    >
      <Heart className={`h-4 w-4 ${supporting ? "fill-red-500" : "fill-blue-500"}`} />
      {supporting ? "Unsupport" : "Support"}
    </Button>
  );
};
