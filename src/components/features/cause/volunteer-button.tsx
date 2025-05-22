"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VolunteerForm } from "./volunteer-form";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface VolunteerButtonProps {
  causeId: string;
}

export default function VolunteerButton({ causeId }: VolunteerButtonProps) {
  const [open, setOpen] = useState(false);

  const [isVolunteering, setIsVolunteering] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={isVolunteering ? "default" : "outline"}
            className={cn(
              isVolunteering
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700",
              "transition-colors duration-200"
            )}
          >
            <Calendar className="h-4 w-4" />
            Volunteer
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px]">
          <VolunteerForm causeId={causeId} />
        </DialogContent>
      </Dialog>
    </>
  );
}
