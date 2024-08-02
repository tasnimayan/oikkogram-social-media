'use client'
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import fetchGraphql from '@/lib/fetchGraphql';
import { getUserProfile } from '@/lib/queries';
import { PostType } from '@/lib/Interface';
import SocialPost from '@/components/SocialPost';
import PostOptions from '@/components/menu/PostOptions';


const fetchUserProfile = async (userId: string) => {
  const {data} = await fetchGraphql(getUserProfile, {user_id:userId})
  return data.user;
};


const ProfilePage = () => {

  const params = useParams();
  const { userId } = params;

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey:['userProfile', userId],
    queryFn: ()=>fetchUserProfile(userId),
  });


  if (isUserProfileLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="profile-header mb-4">
        <img
          src={userProfile.profile_picture}
          alt={userProfile.name}
          className="w-24 h-24 rounded-full"
        />
        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
        <p>{userProfile.email}</p>
      </div>
      <div className="posts-list">
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        <div className="flex flex-col gap-6">
          {userProfile.posts.map((post:PostType) => {
            return (
              <SocialPost
                key={post.id}
                post={post}
                OptionsComponent={PostOptions}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
