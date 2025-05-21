import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CauseCTA() {
  return (
    <Card className="p-4 space-y-3">
      <h2 className="font-semibold">Don't see a cause you're passionate about?</h2>
      <p className="text-gray-600 text-sm">
        Start your own initiative and rally your neighbors around issues that matter to your community.
      </p>
      <Button variant="default" size="lg" className="w-full" asChild>
        <Link href="/causes/create">Create a New Cause</Link>
      </Button>
    </Card>
  );
}
