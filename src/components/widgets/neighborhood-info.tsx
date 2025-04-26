import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NeighborhoodInfo = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Parkside Community</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/events" className="flex items-center gap-1 text-xs">
            View <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">A friendly neighborhood with 342 active members</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>5 miles radius</span>
        <span>•</span>
        <span>Joined Apr 2023</span>
      </div>
    </Card>
  );
};

export default NeighborhoodInfo;
