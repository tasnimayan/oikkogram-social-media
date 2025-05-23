"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFetchGql } from "@/lib/api/graphql";
import { SUPPORT_CAUSE, UNSUPPORT_CAUSE } from "@/lib/api/api-cause";
import { cn } from "@/lib/utils";

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
      variant={supporting ? "default" : "outline"}
      className={cn(
        supporting
          ? "bg-rose-600 hover:bg-rose-700 text-white"
          : "border-rose-500 text-rose-600 hover:bg-rose-50 hover:text-rose-700",
        "transition-colors duration-200"
      )}
      onClick={handleSupport}
    >
      <Heart className="h-4 w-4" />
      {supporting ? "Unsupport" : "Support"}
    </Button>
  );
};
