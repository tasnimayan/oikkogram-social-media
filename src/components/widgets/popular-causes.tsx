import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Card } from "../ui/card";

const causes = [
  {
    id: "1",
    title: "School Playground Renovation",
    supporters: 124,
    goal: 150,
    progress: 82,
  },
  {
    id: "2",
    title: "Community Garden Expansion",
    supporters: 98,
    goal: 100,
    progress: 98,
  },
  {
    id: "3",
    title: "Elderly Neighbor Support Program",
    supporters: 45,
    goal: 75,
    progress: 60,
  },
];

const PopularCauses: React.FC = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Popular Causes</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/causes" className="flex items-center gap-1 text-xs">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {causes.map((cause) => (
          <Link href={`/causes/${cause.id}`} key={cause.id}>
            <div className="hover:bg-muted/50 transition-colors p-3 border rounded-md">
              <h4 className="font-medium text-sm">{cause.title}</h4>
              <div className="mt-2">
                {/* <Progress value={cause.progress} className="h-1.5" /> */}
                Progress Bar Here
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">{cause.supporters}</span>/{cause.goal} supporters
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-1.5">
                  <Heart className="h-3 w-3 mr-1" />
                  <span className="text-xs">Support</span>
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full mt-3">
        Start a Cause
      </Button>
    </Card>
  );
};

export default PopularCauses;
