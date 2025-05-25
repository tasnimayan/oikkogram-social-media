"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupportersList } from "@/components/features/cause/supporters-list";
import { CalendarDays, Heart, MapPin, Share2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CauseUpdates } from "@/components/features/cause/cause-updates";
import { CauseVolunteers } from "@/components/features/cause/cause-volunteers";
import { SupportButton } from "@/components/features/cause/support-button";
import { GET_CAUSE_BY_ID } from "@/lib/api/api-cause";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CauseSkeleton } from "@/components/skeletons/cause-skeleton";

interface CauseDetailPageProps {
  params: {
    causeId: string;
  };
}

export default function CauseDetailPage({ params }: CauseDetailPageProps) {
  return (
    <div className="space-y-6">
      <Link href="/causes" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center mb-4">
        ← Back to Causes
      </Link>
      <CauseDetails causeId={params.causeId} />

      <Tabs defaultValue="updates" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
          {/* <TabsTrigger value="donate">Donate</TabsTrigger> */}
          <TabsTrigger value="supporters">Supporters</TabsTrigger>
        </TabsList>

        <TabsContent value="updates" className="mt-0">
          <CauseUpdates causeId={params.causeId} />
        </TabsContent>

        <TabsContent value="volunteer" className="mt-0">
          <CauseVolunteers causeId={params.causeId} />
        </TabsContent>

        {/* <TabsContent value="donate" className="mt-0">
          <DonationForm causeId={params.causeId} />
        </TabsContent> */}

        <TabsContent value="supporters" className="mt-0">
          <SupportersList causeId={params.causeId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const CauseDetails = ({ causeId }: { causeId: string }) => {
  const { data: cause, isLoading } = useQuery({
    queryKey: [QK.CAUSES, { causeId }],
    queryFn: () => useFetchGql(GET_CAUSE_BY_ID, { id: causeId }),
    select: data => data?.data,
    enabled: !!causeId,
  });

  if (isLoading) {
    return <CauseSkeleton />;
  }

  if (!cause) {
    return <div>Not found</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {cause.cover_img_url && (
        <div className="relative h-64 w-full">
          <Image src={cause.cover_img_url || "/placeholder.png"} alt={cause.title} fill className="object-cover" />
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
              <span>Started {new Date(cause.start_date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center mb-6">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={cause.created_by.image || "/placeholder.png"} alt={cause.created_by.name || ""} />
                <AvatarFallback>{cause.created_by.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm">Organized by</div>
                <div className="font-medium">{cause.created_by.name}</div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">{cause.description}</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg min-w-[250px]">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Goal Progress</span>
              <span className="text-sm">{(cause.current_value / (cause.goal_value || 0)) * 100}%</span>
            </div>
            <Progress value={(cause.current_value / (cause.goal_value || 0)) * 100} className="h-2" />
          </div>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{cause.total_supporters?.aggregate?.count || 0} supporters</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              <span>{cause.total_volunteers?.aggregate?.count || 0} volunteers</span>
            </div>
          </div>

          <div className="space-y-3">
            <SupportButton causeId={causeId} status={!!cause.is_supporter} />
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

//  const polygon = [
//   (90.41067030468275, 23.722918158860736),
//   (90.40033127955263, 23.723960952501045),
//   (90.39603795555712, 23.715377710516975),
//   (90.40326651126236, 23.711486989537107),
//   (90.40869888039964, 23.714535399322784),
//   (90.40869888039964, 23.71802493885592),
//   (90.41031982925472, 23.72079243830119),
//   (90.41067030468275, 23.72291815886073)
// )]
