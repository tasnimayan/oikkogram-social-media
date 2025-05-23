import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";

const groups = [
  {
    id: "1",
    name: "Community Safety Watch",
    members: 145,
  },
  {
    id: "2",
    name: "Local Parents Group",
    members: 98,
  },
  {
    id: "3",
    name: "Downtown Business Association",
    members: 64,
  },
];

const JoinGroupCard: React.FC = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Groups Near You</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/groups" className="flex items-center gap-1 text-xs">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {groups.map((group) => (
          <div key={group.id} className="p-3 border rounded-md flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm">{group.name}</h4>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Users className="h-3 w-3" />
                {group.members} members
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-8">
              Join
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full mt-3">
        Create Group
      </Button>
    </Card>
  );
};

export default JoinGroupCard;
