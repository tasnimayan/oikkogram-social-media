import React from "react";
import { HandHelping } from "lucide-react";

const CausesHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <HandHelping className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Local Causes Hub</h1>
      </div>
      <p className="text-muted-foreground">
        Discover and support local initiatives that matter to your community. Together, we can make a difference in our neighborhood.
      </p>
    </div>
  );
};

export default CausesHeader;
