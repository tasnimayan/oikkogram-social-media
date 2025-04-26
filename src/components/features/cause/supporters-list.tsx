import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/lib/types";
import { getTimeDifference } from "@/lib/utils/index";

interface SupportersListProps {
  supporters: User[];
}

export function SupportersList({ supporters }: SupportersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supporters</CardTitle>
        <CardDescription>{supporters.length} people are supporting this cause</CardDescription>
      </CardHeader>
      <CardContent>
        {supporters.length > 0 ? (
          <div className="space-y-4">
            {supporters.map((supporter) => (
              <div key={supporter.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={supporter.avatar || "/placeholder.svg"} alt={supporter.name} />
                  <AvatarFallback>{supporter.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{supporter.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{supporter.neighborhood}</div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Joined {getTimeDifference(new Date(supporter.joinedDate))}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No supporters yet. Be the first to support this cause!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
