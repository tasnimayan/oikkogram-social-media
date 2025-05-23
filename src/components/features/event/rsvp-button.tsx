"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface RSVPButtonProps {
  eventId: string;
  onRSVP: (attending: boolean) => void;
  isAttending?: boolean;
}

export function RSVPButton({ eventId, onRSVP, isAttending = false }: RSVPButtonProps) {
  const [showOptions, setShowOptions] = useState(false);

  const handleRSVP = (attending: boolean) => {
    onRSVP(attending);
    setShowOptions(false);
  };

  if (isAttending) {
    return (
      <div className="space-y-2">
        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowOptions(true)}>
          <Check className="mr-2 h-4 w-4" />
          Going
        </Button>
        {showOptions && (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => handleRSVP(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleRSVP(true)}>
        RSVP
      </Button>
    </div>
  );
}
