import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { UserType } from "./user-profile";
import { Briefcase, Calendar, HeartPlus, MapPin, MessageCircle, Pencil, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ImageUploadModal from "./update/image-update-modal";
import { useSession } from "next-auth/react";
import StartChat from "./start-chat";

const ProfileHeader = ({ user }: { user: UserType }) => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 my-4 md:my-8 ">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Avatar and Basic Info */}
        <div className="flex flex-col items-center lg:items-start">
          <ProfilePhoto user={user} />
        </div>

        {/* Right Side - Profile Details */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">{user.first_name + " " + user.last_name}</h1>
              <p className="text-lg text-slate-600 mb-1">@{user.user_name}</p>
            </div>

            {currentUser?.id !== user.id ? (
              <div className="flex gap-3">
                <StartChat chatUserId={user.id} />

                <Button className="rounded-full">
                  <Users className="h-4 w-4" />
                  Follow
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={`/profile/${user.id}/update`}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
            )}
          </div>

          {user.bio && <p className="text-muted-foreground text-lg leading-relaxed mb-2">{user.bio}</p>}

          {/* Info Tags */}
          <div className="flex flex-wrap gap-4 text-muted-foreground/70">
            {user.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{user.address}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined {format(new Date(user.created_at), "dd MMM yyyy")}</span>
            </div>
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-2 my-2 text-muted-foreground/70">
            <div className="flex items-center gap-2">
              <HeartPlus className="h-4 w-4" />
              <span>Interests:</span>
            </div>
            {user.interests?.map(interest => (
              <span key={interest}>{interest},</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePhoto = ({ user }: { user: UserType }) => {
  const { data: session } = useSession();
  const isCurrentUser = session?.user?.id === user.id;
  return (
    <div className="relative size-36">
      <Avatar
        src={user.profile_photo_url || "/placeholder.svg"}
        name={user.first_name || ""}
        className="size-full border-4 border-white shadow-lg"
      />
      {isCurrentUser && <ImageUploadModal userId={user.id} />}
    </div>
  );
};

export default ProfileHeader;
