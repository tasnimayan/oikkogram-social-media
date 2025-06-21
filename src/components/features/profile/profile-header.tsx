import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { UserType } from "./user-profile";
import { Briefcase, Calendar, Camera, MapPin, MessageCircle, Pencil, Users } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ImageUploadModal from "./image-update-modal";

const ProfileHeader = ({ user }: { user: UserType }) => {
  return (
    <div>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Avatar and Basic Info */}
          <div className="flex flex-col items-center lg:items-start">
            <ProfilePhoto user={user} />
          </div>

          {/* Right Side - Profile Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.first_name + " " + user.last_name}</h1>
                <p className="text-lg text-slate-600 mb-1">@{user.user_name}</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Users className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href={`/profile/${user.id}/update`}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>

            {user.bio && <p className="text-slate-700 text-lg leading-relaxed mb-6">{user.bio}</p>}

            {/* Info Tags */}
            <div className="flex flex-wrap gap-4 text-slate-600 mb-6">
              {user.occupation && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{user.occupation}</span>
                </div>
              )}
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
            <div className="flex flex-wrap gap-2">
              {user.interests?.map(interest => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-full"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePhoto = ({ user, onChangePhoto }: { user: UserType; onChangePhoto?: (file: File) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onChangePhoto) {
      onChangePhoto(file);
    }
    // Optionally reset input value so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative w-32 h-32">
      <Avatar
        src={user.profile_photo_url || "/placeholder.svg"}
        name={user.first_name || ""}
        className="w-32 h-32 border-4 border-white shadow-lg"
      />
      <button
        type="button"
        aria-label="Change profile photo"
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        onClick={handleIconClick}
      >
        <Camera size={20} />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <ImageUploadModal
        isOpen={true}
        onRequestClose={() => {}}
        previewUrl={user.profile_photo_url || ""}
        handleUpload={() => {}}
      />
    </div>
  );
};

export default ProfileHeader;
