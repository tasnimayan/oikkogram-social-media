import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VolunteerForm } from "@/components/features/cause/volunteer-form";
import { DonationForm } from "@/components/features/cause/donation-form";
import { SupportersList } from "@/components/features/cause/supporters-list";
import { CalendarDays, Heart, MapPin, Share2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { causes } from "@/lib/constants/data";
import { CauseUpdates } from "@/components/features/cause/cause-updates";

interface CauseDetailPageProps {
  params: {
    id: string;
  };
}

export default function CauseDetailPage({ params }: CauseDetailPageProps) {
  // In a real app, you would fetch the cause data based on the ID
  const cause = causes.find(c => c.id === params.id) || causes[0];

  return (
    <div className="space-y-6">
      <Link href="/causes" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center mb-4">
        ← Back to Causes
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {cause.image && (
          <div className="relative h-64 w-full">
            <Image src={cause.image || "/placeholder.png"} alt={cause.title} fill className="object-cover" />
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{cause.title}</h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{cause.location}</span>
                <span className="mx-2">•</span>
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>Started {new Date(cause.startDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center mb-6">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={cause.organizer.avatar || "/placeholder.svg"} alt={cause.organizer.name} />
                  <AvatarFallback>{cause.organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm">Organized by</div>
                  <div className="font-medium">{cause.organizer.name}</div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{cause.description}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg min-w-[250px]">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Goal Progress</span>
                  <span className="text-sm">{cause.progress}%</span>
                </div>
                <Progress value={cause.progress} className="h-2" />
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{cause.supporters.length} supporters</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{cause.volunteers} volunteers</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Support This Cause</Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="updates" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
          <TabsTrigger value="donate">Donate</TabsTrigger>
          <TabsTrigger value="supporters">Supporters</TabsTrigger>
        </TabsList>

        <TabsContent value="updates" className="mt-0">
          <CauseUpdates causeId={cause.id} />
        </TabsContent>

        <TabsContent value="volunteer" className="mt-0">
          <VolunteerForm causeId={cause.id} />
        </TabsContent>

        <TabsContent value="donate" className="mt-0">
          <DonationForm causeId={cause.id} />
        </TabsContent>

        <TabsContent value="supporters" className="mt-0">
          <SupportersList supporters={cause.supporters} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
